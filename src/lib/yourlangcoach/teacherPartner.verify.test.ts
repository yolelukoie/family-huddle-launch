// Verifier-added coverage for the TPP signup resilience change.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
const invoke = vi.fn();

vi.mock("@/integrations/supabase/ylc-client", () => ({
  ylcSupabase: { rpc: (...a: unknown[]) => rpc(...a), functions: { invoke: (...a: unknown[]) => invoke(...a) } },
}));

import {
  RPC_MAX_RETRIES,
  RPC_RETRY_BACKOFF_MS,
  RPC_TIMEOUT_MS,
  SignupNetworkError,
  WELCOME_EMAIL_TIMEOUT_MS,
  buildSupportMailto,
  submitTeacherSignup,
} from "./teacherPartner";
import { SUPPORT_EMAIL } from "./content";

const values = { name: "Анна Иванова", email: " Anna@Example.com ", languages: "Английский" };
const row = { referral_code: "ABC123", already_registered: false, partner_code: "PRO-1" };

const settle = (result: object) => ({ abortSignal: () => Promise.resolve(result) });
const ok = (r: object) => settle({ data: [r], error: null, status: 200 });
// What postgrest-js returns for a failed/aborted fetch: code "" and status 0.
const netFail = () => settle({ data: null, error: { message: "TypeError: Failed to fetch", code: "" }, status: 0 });
const signals: AbortSignal[] = [];
const hang = () => ({
  abortSignal: (signal: AbortSignal) => {
    signals.push(signal);
    return new Promise((resolve) => {
      signal.addEventListener("abort", () =>
        resolve({ data: null, error: { message: "AbortError: signal is aborted", code: "" }, status: 0 }),
      );
    });
  },
});

beforeEach(() => {
  vi.useFakeTimers();
  rpc.mockReset();
  invoke.mockReset();
  invoke.mockResolvedValue({ data: null, error: null });
  signals.length = 0;
});
afterEach(() => vi.useRealTimers());

describe("submitTeacherSignup — bounded time", () => {
  it("never waits longer than 3 timeouts + backoffs when every attempt stalls", async () => {
    rpc.mockImplementation(() => hang());
    const promise = submitTeacherSignup(values);
    const assertion = expect(promise).rejects.toBeInstanceOf(SignupNetworkError);
    const worstCase =
      RPC_TIMEOUT_MS * (RPC_MAX_RETRIES + 1) + RPC_RETRY_BACKOFF_MS.slice(0, RPC_MAX_RETRIES).reduce((a, b) => a + b, 0);
    expect(worstCase).toBe(48_000);
    await vi.advanceTimersByTimeAsync(worstCase);
    await assertion;
    expect(rpc).toHaveBeenCalledTimes(RPC_MAX_RETRIES + 1);
    // every attempt got its own signal and every one was aborted
    expect(signals).toHaveLength(RPC_MAX_RETRIES + 1);
    expect(new Set(signals).size).toBe(RPC_MAX_RETRIES + 1);
    expect(signals.every((s) => s.aborted)).toBe(true);
    expect(invoke).not.toHaveBeenCalled();
  });

  // Regression (verifier, 2026-10-04): supabase-js awaits auth.getSession()
  // BEFORE calling fetch; with an expired stored YLC session and a stalled
  // /auth/v1/token the abort has nothing to cancel. Fixed by racing each
  // attempt against a hard timer.
  it("settles even when the client ignores the abort signal", async () => {
    rpc.mockImplementation(() => ({ abortSignal: () => new Promise(() => {}) }));
    let settled = false;
    submitTeacherSignup(values).then(
      () => (settled = true),
      () => (settled = true),
    );
    await vi.advanceTimersByTimeAsync(120_000);
    expect(settled).toBe(true);
  });

  it("rejects with SignupNetworkError after 3 attempts when the client ignores the abort signal", async () => {
    rpc.mockImplementation(() => ({ abortSignal: () => new Promise(() => {}) }));
    const assertion = expect(submitTeacherSignup(values)).rejects.toBeInstanceOf(SignupNetworkError);
    await vi.advanceTimersByTimeAsync(48_000);
    await assertion;
    expect(rpc).toHaveBeenCalledTimes(3);
  });

  it("calls onRetry before each retry, not for the first attempt", async () => {
    rpc.mockReturnValueOnce(netFail()).mockReturnValueOnce(netFail()).mockReturnValueOnce(ok(row));
    const onRetry = vi.fn();
    const promise = submitTeacherSignup(values, { onRetry });
    expect(onRetry).not.toHaveBeenCalled();
    await vi.runAllTimersAsync();
    await promise;
    expect(onRetry).toHaveBeenCalledTimes(2);
  });
});

describe("submitTeacherSignup — retries and duplicates", () => {
  it("sends identical args on every attempt (same email -> server dedups)", async () => {
    rpc.mockReturnValueOnce(netFail()).mockReturnValueOnce(netFail()).mockReturnValueOnce(ok(row));
    const promise = submitTeacherSignup(values);
    await vi.runAllTimersAsync();
    await promise;
    expect(rpc).toHaveBeenCalledTimes(3);
    const [first, second, third] = rpc.mock.calls;
    expect(first[0]).toBe("create_teacher_partner");
    expect(second).toEqual(first);
    expect(third).toEqual(first);
    expect(first[1]).toEqual({
      _first_name: "Анна",
      _last_name: "Иванова",
      _email: "Anna@Example.com",
      _languages: "Английский",
      _teaching_format: null,
      _student_count: null,
    });
  });

  it("sends exactly one welcome email after retries, with only the email in the body", async () => {
    rpc.mockReturnValueOnce(netFail()).mockReturnValueOnce(netFail()).mockReturnValueOnce(ok(row));
    const promise = submitTeacherSignup(values);
    await vi.runAllTimersAsync();
    await promise;
    expect(invoke).toHaveBeenCalledTimes(1);
    const [name, options] = invoke.mock.calls[0];
    expect(name).toBe("send-teacher-welcome");
    expect(options.body).toEqual({ email: "Anna@Example.com" });
    expect(options.signal).toBeInstanceOf(AbortSignal);
  });

  it("sends no welcome email when signup fails", async () => {
    rpc.mockImplementation(() => netFail());
    const promise = submitTeacherSignup(values);
    const assertion = expect(promise).rejects.toBeInstanceOf(SignupNetworkError);
    await vi.runAllTimersAsync();
    await assertion;
    expect(invoke).not.toHaveBeenCalled();
  });

  it("aborts a stalled welcome email after 10 s", async () => {
    rpc.mockReturnValueOnce(ok(row));
    invoke.mockReturnValueOnce(new Promise(() => {}));
    await submitTeacherSignup(values);
    const signal = invoke.mock.calls[0][1].signal as AbortSignal;
    await vi.advanceTimersByTimeAsync(WELCOME_EMAIL_TIMEOUT_MS - 1);
    expect(signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(signal.aborted).toBe(true);
  });

  it("a genuinely already-registered teacher still gets link and partner code", async () => {
    rpc.mockReturnValueOnce(ok({ referral_code: "OLD777", already_registered: true, partner_code: "PRO-OLD" }));
    await expect(submitTeacherSignup(values)).resolves.toEqual({
      referralCode: "OLD777",
      alreadyRegistered: true,
      partnerCode: "PRO-OLD",
    });
  });

  it("retries 5xx gateway errors and a 200 with a non-JSON body (captive portal)", async () => {
    rpc
      .mockReturnValueOnce(settle({ data: null, error: { message: "bad gateway" }, status: 502 }))
      .mockReturnValueOnce(settle({ data: null, error: { message: "SyntaxError: Unexpected token <", code: "" }, status: 0 }))
      .mockReturnValueOnce(ok(row));
    const promise = submitTeacherSignup(values);
    await vi.runAllTimersAsync();
    await expect(promise).resolves.toMatchObject({ referralCode: "ABC123" });
    expect(rpc).toHaveBeenCalledTimes(3);
  });

  it("treats a thrown fetch error as a network error", async () => {
    rpc.mockImplementation(() => ({ abortSignal: () => Promise.reject(new TypeError("Failed to fetch")) }));
    const promise = submitTeacherSignup(values);
    const assertion = expect(promise).rejects.toBeInstanceOf(SignupNetworkError);
    await vi.runAllTimersAsync();
    await assertion;
    expect(rpc).toHaveBeenCalledTimes(3);
  });
});

describe("submitTeacherSignup — real server answers keep the old behaviour", () => {
  it.each([
    ["validation raise", { code: "P0001", message: "Missing required fields" }, 400],
    ["unique violation", { code: "23505", message: "duplicate key value" }, 409],
    ["function missing", { code: "PGRST202", message: "Could not find the function" }, 404],
  ])("%s is thrown unchanged and not retried", async (_label, error, status) => {
    rpc.mockReturnValueOnce(settle({ data: null, error, status }));
    await expect(submitTeacherSignup(values)).rejects.toBe(error);
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(invoke).not.toHaveBeenCalled();
  });

  it.each([
    ["invalid API key", 401],
    ["forbidden", 403],
    ["rate limited", 429],
  ])("a 4xx without a code (%s) is thrown unchanged and not retried", async (_label, status) => {
    const error = { message: "No API key found in request" };
    rpc.mockReturnValueOnce(settle({ data: null, error, status }));
    await expect(submitTeacherSignup(values)).rejects.toBe(error);
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(invoke).not.toHaveBeenCalled();
  });

  it("an empty 200 still reports the missing referral code", async () => {
    rpc.mockReturnValueOnce(settle({ data: [], error: null, status: 200 }));
    await expect(submitTeacherSignup(values)).rejects.toThrow("Signup did not return a referral code");
    expect(rpc).toHaveBeenCalledTimes(1);
  });
});

describe("buildSupportMailto — encoding and data minimisation", () => {
  const labels = { name: "Имя", email: "Email", languages: "Языки", format: "Формат", students: "Ученики" };

  const parse = (href: string) => {
    const [head, query] = href.split("?");
    const params = new URLSearchParams(query.replace(/\+/g, "%2B"));
    return { head, subject: params.get("subject")!, body: params.get("body")!, keys: [...params.keys()] };
  };

  it("is pure ASCII and round-trips Cyrillic and Hebrew exactly", () => {
    const href = buildSupportMailto(
      { name: "Анна Иванова", email: "anna@example.com", languages: "עברית, אנגלית", teachingFormat: "Online", studentCount: "6–15" },
      "Регистрация в программе",
      "שלום! לא הצלחתי להשלים את ההרשמה.",
      labels,
    );
    expect(href).toMatch(/^[\x21-\x7e]+$/);
    const { head, subject, body, keys } = parse(href);
    expect(head).toBe(`mailto:${SUPPORT_EMAIL}`);
    expect(keys).toEqual(["subject", "body"]);
    expect(subject).toBe("Регистрация в программе");
    expect(href).toContain("%0D%0A");
    expect(href).not.toMatch(/(?<!%0D)%0A/);
    expect(body.split("\r\n")).toEqual([
      "שלום! לא הצלחתי להשלים את ההרשמה.",
      "",
      "Имя: Анна Иванова",
      "Email: anna@example.com",
      "Языки: עברית, אנגלית",
      "Формат: Online",
      "Ученики: 6–15",
    ]);
  });

  it("cannot be broken out of by &, ?, #, +, % or cc= in a field", () => {
    const nasty = "A&cc=evil@example.com?bcc=x#frag +100% \"q\"";
    const href = buildSupportMailto({ name: nasty, email: "a@b.co", languages: "x" }, "S&cc=evil@example.com", "I", labels);
    const { subject, body, keys } = parse(href);
    expect(keys).toEqual(["subject", "body"]);
    expect(subject).toBe("S&cc=evil@example.com");
    expect(body).toContain(`Имя: ${nasty}`);
    expect(href.split("?")).toHaveLength(2);
    expect(href).not.toContain("#");
  });

  it("contains nothing beyond the five form fields and tolerates empty values", () => {
    const href = buildSupportMailto({}, "S", "I", labels);
    expect(parse(href).body).toBe("I\r\n\r\nИмя: \r\nEmail: \r\nЯзыки: \r\nФормат: \r\nУченики: ");
  });
});

describe("constants match the agreed behaviour", () => {
  it("15 s rpc timeout, 2 retries, 10 s welcome-email timeout", () => {
    expect(RPC_TIMEOUT_MS).toBe(15_000);
    expect(RPC_MAX_RETRIES).toBe(2);
    expect(WELCOME_EMAIL_TIMEOUT_MS).toBe(10_000);
  });
});
