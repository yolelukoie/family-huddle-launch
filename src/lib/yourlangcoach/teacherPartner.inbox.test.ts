import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
const invoke = vi.fn();
vi.mock("@/integrations/supabase/ylc-client", () => ({
  ylcSupabase: { rpc: (...a: unknown[]) => rpc(...a), functions: { invoke: (...a: unknown[]) => invoke(...a) } },
}));

import { submitTeacherSignup } from "./teacherPartner";

const values = { name: "Anna Ivanova", email: " Anna@Example.com ", languages: "English" };
const ok = (r: object) => ({ abortSignal: () => Promise.resolve({ data: [r], error: null, status: 200 }) });
const netFail = () => ({
  abortSignal: () => Promise.resolve({ data: null, error: { message: "TypeError: Failed to fetch", code: "" }, status: 0 }),
});

beforeEach(() => {
  vi.useFakeTimers();
  rpc.mockReset();
  invoke.mockReset();
  invoke.mockResolvedValue({ data: { ok: true }, error: null });
});
afterEach(() => vi.useRealTimers());

describe("submitTeacherSignup: already registered, codes only by email", () => {
  it("returns no codes and still asks the server to email them", async () => {
    rpc.mockReturnValueOnce(ok({ referral_code: null, already_registered: true, partner_code: null }));
    const result = await submitTeacherSignup(values);
    expect(result).toEqual({ referralCode: null, alreadyRegistered: true });
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(invoke.mock.calls[0][0]).toBe("send-teacher-welcome");
    expect(invoke.mock.calls[0][1].body).toEqual({ email: "Anna@Example.com" });
  });

  it("does the same when the answer comes on a retry", async () => {
    rpc.mockReturnValueOnce(netFail()).mockReturnValueOnce(ok({ referral_code: null, already_registered: true, partner_code: null }));
    const promise = submitTeacherSignup(values);
    await vi.runAllTimersAsync();
    expect(await promise).toEqual({ referralCode: null, alreadyRegistered: true });
    expect(invoke).toHaveBeenCalledTimes(1);
  });

  it("codes returned on a retry (the server's 10-minute window) still give the normal success", async () => {
    rpc.mockReturnValueOnce(netFail()).mockReturnValueOnce(ok({ referral_code: "ANNA7QK", already_registered: true, partner_code: "PRO-1" }));
    const promise = submitTeacherSignup(values);
    await vi.runAllTimersAsync();
    expect(await promise).toEqual({ referralCode: "ANNA7QK", alreadyRegistered: false, partnerCode: "PRO-1" });
    expect(invoke).toHaveBeenCalledTimes(1);
  });

  it("still fails when the server returns neither a code nor already_registered", async () => {
    rpc.mockReturnValueOnce(ok({ referral_code: null, already_registered: false, partner_code: null }));
    await expect(submitTeacherSignup(values)).rejects.toThrow("Signup did not return a referral code");
    expect(invoke).not.toHaveBeenCalled();
  });
});
