import { beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
const invoke = vi.fn();
vi.mock("@/integrations/supabase/ylc-client", () => ({
  ylcSupabase: { rpc: (...a: unknown[]) => rpc(...a), functions: { invoke: (...a: unknown[]) => invoke(...a) } },
}));

import { submitTeacherSignup } from "./teacherPartner";

const values = { name: "Anna Ivanova", email: "anna@example.com", languages: "English" };
const ok = (r: object) => ({ abortSignal: () => Promise.resolve({ data: [r], error: null, status: 200 }) });
const row = { referral_code: "ABC123", already_registered: false, partner_code: "P-1" };

beforeEach(() => {
  rpc.mockReset();
  invoke.mockReset();
  invoke.mockResolvedValue({ data: { sent: true }, error: null });
});

describe("submitTeacherSignup: language of the welcome email", () => {
  it("passes the page language to the welcome function", async () => {
    rpc.mockReturnValueOnce(ok(row));
    await submitTeacherSignup(values, { lang: "ru" });
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(invoke.mock.calls[0][0]).toBe("send-teacher-welcome");
    expect(invoke.mock.calls[0][1].body).toEqual({ email: "anna@example.com", lang: "ru" });
  });

  it("sends only the email when no language is given", async () => {
    rpc.mockReturnValueOnce(ok(row));
    await submitTeacherSignup(values);
    expect(invoke.mock.calls[0][1].body).toEqual({ email: "anna@example.com" });
  });

  it("does not send the language to the signup RPC", async () => {
    rpc.mockReturnValueOnce(ok(row));
    await submitTeacherSignup(values, { lang: "he" });
    expect(Object.keys(rpc.mock.calls[0][1])).not.toContain("lang");
    expect(invoke.mock.calls[0][1].body).toEqual({ email: "anna@example.com", lang: "he" });
  });
});
