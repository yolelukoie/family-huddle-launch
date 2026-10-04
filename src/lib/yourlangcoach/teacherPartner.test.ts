import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
const invoke = vi.fn();

vi.mock("@/integrations/supabase/ylc-client", () => ({
  ylcSupabase: { rpc: (...a: unknown[]) => rpc(...a), functions: { invoke: (...a: unknown[]) => invoke(...a) } },
}));

import {
  RPC_TIMEOUT_MS,
  SignupNetworkError,
  buildSupportMailto,
  submitTeacherSignup,
} from "./teacherPartner";

const values = { name: "Anna Ivanova", email: "anna@example.com", languages: "English" };
const row = { referral_code: "ABC123", already_registered: false, partner_code: "P-1" };

// rpc(...) returns a builder whose abortSignal() yields the awaited result.
const ok = (r: object) => ({ abortSignal: () => Promise.resolve({ data: [r], error: null, status: 200 }) });
const netFail = () => ({
  abortSignal: () =>
    Promise.resolve({ data: null, error: { message: "TypeError: Failed to fetch", code: "" }, status: 0 }),
});
const hang = () => ({
  abortSignal: (signal: AbortSignal) =>
    new Promise((resolve) => {
      signal.addEventListener("abort", () =>
        resolve({ data: null, error: { name: "AbortError", message: "AbortError: aborted", code: "" }, status: 0 }),
      );
    }),
});

beforeEach(() => {
  vi.useFakeTimers();
  rpc.mockReset();
  invoke.mockReset();
  invoke.mockResolvedValue({ data: null, error: null });
});
afterEach(() => vi.useRealTimers());

describe("submitTeacherSignup", () => {
  it("succeeds on the first attempt and keeps already_registered", async () => {
    rpc.mockReturnValueOnce(ok({ ...row, already_registered: true }));
    const result = await submitTeacherSignup(values);
    expect(result).toEqual({ referralCode: "ABC123", alreadyRegistered: true, partnerCode: "P-1" });
    expect(rpc).toHaveBeenCalledTimes(1);
  });

  it("retries after a network failure and treats the created row as a normal success", async () => {
    rpc.mockReturnValueOnce(netFail()).mockReturnValueOnce(ok({ ...row, already_registered: true }));
    const promise = submitTeacherSignup(values);
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(rpc).toHaveBeenCalledTimes(2);
    expect(result.alreadyRegistered).toBe(false);
    expect(result.referralCode).toBe("ABC123");
  });

  it("times out a hanging request after 15 s and retries", async () => {
    rpc.mockReturnValueOnce(hang()).mockReturnValueOnce(ok(row));
    const promise = submitTeacherSignup(values);
    await vi.advanceTimersByTimeAsync(RPC_TIMEOUT_MS - 1);
    expect(rpc).toHaveBeenCalledTimes(1);
    await vi.runAllTimersAsync();
    expect((await promise).referralCode).toBe("ABC123");
    expect(rpc).toHaveBeenCalledTimes(2);
  });

  it("gives up after 3 attempts with SignupNetworkError", async () => {
    rpc.mockImplementation(() => hang());
    const promise = submitTeacherSignup(values);
    const assertion = expect(promise).rejects.toBeInstanceOf(SignupNetworkError);
    await vi.runAllTimersAsync();
    await assertion;
    expect(rpc).toHaveBeenCalledTimes(3);
  });

  it("does not retry a real server error", async () => {
    const serverError = { message: "boom", code: "P0001" };
    rpc.mockReturnValueOnce({ abortSignal: () => Promise.resolve({ data: null, error: serverError, status: 400 }) });
    await expect(submitTeacherSignup(values)).rejects.toBe(serverError);
    expect(rpc).toHaveBeenCalledTimes(1);
  });

  it("does not retry a 4xx without a code (e.g. 401 invalid key)", async () => {
    const serverError = { message: "Invalid API key" };
    rpc.mockReturnValueOnce({ abortSignal: () => Promise.resolve({ data: null, error: serverError, status: 401 }) });
    await expect(submitTeacherSignup(values)).rejects.toBe(serverError);
    expect(rpc).toHaveBeenCalledTimes(1);
  });

  it("does not block or fail on a hanging welcome email", async () => {
    rpc.mockReturnValueOnce(ok(row));
    invoke.mockReturnValueOnce(new Promise(() => {}));
    await expect(submitTeacherSignup(values)).resolves.toMatchObject({ referralCode: "ABC123" });
  });

  it("does not fail when the welcome email rejects or throws", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    rpc.mockReturnValueOnce(ok(row));
    invoke.mockRejectedValueOnce(new Error("nope"));
    await expect(submitTeacherSignup(values)).resolves.toMatchObject({ referralCode: "ABC123" });
    rpc.mockReturnValueOnce(ok(row));
    invoke.mockImplementationOnce(() => {
      throw new Error("sync");
    });
    await expect(submitTeacherSignup(values)).resolves.toMatchObject({ referralCode: "ABC123" });
    warn.mockRestore();
  });
});

describe("buildSupportMailto", () => {
  it("prefills subject and body from the form values", () => {
    const href = buildSupportMailto(
      { name: " Anna Ivanova ", email: "anna@example.com", languages: "English", teachingFormat: "Online", studentCount: "6–15" },
      "Signup",
      "Please register me.",
      { name: "Name", email: "Email", languages: "Languages", format: "Format", students: "Students" },
    );
    const url = new URL(href);
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe("support@familyhuddletasks.com");
    expect(url.searchParams.get("subject")).toBe("Signup");
    const body = url.searchParams.get("body")!;
    expect(body).toContain("Please register me.");
    expect(body).toContain("Name: Anna Ivanova");
    expect(body).toContain("Email: anna@example.com");
    expect(body).toContain("Languages: English");
    expect(body).toContain("Format: Online");
    expect(body).toContain("Students: 6–15");
  });
});
