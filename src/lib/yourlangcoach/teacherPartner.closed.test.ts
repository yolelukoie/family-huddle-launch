// Closed public signup (plan analyst-tpp-signup-switch-2026-10-06, item L1).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
const invoke = vi.fn();
vi.mock("@/integrations/supabase/ylc-client", () => ({
  ylcSupabase: { rpc: (...a: unknown[]) => rpc(...a), functions: { invoke: (...a: unknown[]) => invoke(...a) } },
}));

import { SIGNUP_CLOSED_HINT, SignupClosedError, fetchSignupOpen, submitTeacherSignup } from "./teacherPartner";

const values = { name: "Anna Ivanova", email: "anna@example.com", languages: "English" };
// The answer PostgREST gives for `raise exception ... using hint = 'teacher_signup_closed'` (SQLSTATE P0001, HTTP 400).
const closedError = {
  code: "P0001",
  details: null,
  hint: "teacher_signup_closed",
  message: "Teacher Partner signup is closed. Write to support@familyhuddletasks.com.",
};
const answer = (r: { data: unknown; error: unknown; status: number }) => ({ abortSignal: () => Promise.resolve(r) });
const closed = () => answer({ data: null, error: closedError, status: 400 });
const netFail = () => answer({ data: null, error: { message: "TypeError: Failed to fetch", code: "" }, status: 0 });

beforeEach(() => {
  vi.useFakeTimers();
  rpc.mockReset();
  invoke.mockReset();
  invoke.mockResolvedValue({ data: { sent: true }, error: null });
});
afterEach(() => vi.useRealTimers());

describe("submitTeacherSignup: the owner has closed the public signup", () => {
  it("the hint in the SQL and on the site is the same text", () => {
    expect(SIGNUP_CLOSED_HINT).toBe("teacher_signup_closed");
  });

  it("rejects with SignupClosedError at once: no retry, no welcome email", async () => {
    rpc.mockReturnValueOnce(closed());
    await expect(submitTeacherSignup(values)).rejects.toBeInstanceOf(SignupClosedError);
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(invoke).not.toHaveBeenCalled();
  });

  it("does the same when the closed answer comes on a retry", async () => {
    rpc.mockReturnValueOnce(netFail()).mockReturnValueOnce(closed());
    const assertion = expect(submitTeacherSignup(values)).rejects.toBeInstanceOf(SignupClosedError);
    await vi.runAllTimersAsync();
    await assertion;
    expect(rpc).toHaveBeenCalledTimes(2);
    expect(invoke).not.toHaveBeenCalled();
  });

  it("another server refusal is still passed on as it is", async () => {
    const other = { code: "P0001", details: null, hint: null, message: "Missing required fields" };
    rpc.mockReturnValueOnce(answer({ data: null, error: other, status: 400 }));
    await expect(submitTeacherSignup(values)).rejects.toBe(other);
    expect(rpc).toHaveBeenCalledTimes(1);
  });
});

describe("fetchSignupOpen", () => {
  it("asks the server with the RPC teacher_signup_open and no arguments", async () => {
    rpc.mockResolvedValueOnce({ data: true, error: null });
    await fetchSignupOpen();
    expect(rpc.mock.calls[0]).toEqual(["teacher_signup_open"]);
  });

  it("is false only when the server answers false", async () => {
    rpc.mockResolvedValueOnce({ data: false, error: null });
    expect(await fetchSignupOpen()).toBe(false);
  });

  it("is true for true, null, an error answer, a rejected call and a call that throws", async () => {
    rpc.mockResolvedValueOnce({ data: true, error: null });
    expect(await fetchSignupOpen()).toBe(true);
    rpc.mockResolvedValueOnce({ data: null, error: null });
    expect(await fetchSignupOpen()).toBe(true);
    rpc.mockResolvedValueOnce({ data: null, error: { code: "PGRST202", message: "Could not find the function" } });
    expect(await fetchSignupOpen()).toBe(true);
    rpc.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    expect(await fetchSignupOpen()).toBe(true);
    rpc.mockImplementationOnce(() => {
      throw new TypeError("rpc is not a function");
    });
    expect(await fetchSignupOpen()).toBe(true);
  });
});
