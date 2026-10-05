import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/integrations/supabase/ylc-client", () => ({ ylcSupabase: {} }));
vi.mock("sonner", () => ({ toast: { info: vi.fn(), error: vi.fn(), success: vi.fn() } }));

const submit = vi.fn();
vi.mock("@/lib/yourlangcoach/teacherPartner", async (orig) => ({
  ...(await orig<typeof import("@/lib/yourlangcoach/teacherPartner")>()),
  submitTeacherSignup: (...a: unknown[]) => submit(...a),
}));

import TeacherPartnerJoin from "./TeacherPartnerJoin";

beforeEach(() => {
  window.scrollTo = vi.fn();
  submit.mockReset();
  submit.mockResolvedValue({ referralCode: "ABC123", alreadyRegistered: false, partnerCode: "PRO-1" });
});
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("join page passes its language to the signup", () => {
  it.each(["en", "ru", "he"] as const)("page language %s", async (lang) => {
    window.localStorage.setItem("ylc-lang", lang);
    render(
      <MemoryRouter>
        <TeacherPartnerJoin />
      </MemoryRouter>,
    );
    fireEvent.change(document.getElementById("name")!, { target: { value: "Anna Ivanova" } });
    fireEvent.change(document.getElementById("email")!, { target: { value: "anna@example.com" } });
    fireEvent.change(document.getElementById("languages")!, { target: { value: "English" } });
    fireEvent.submit(document.querySelector("form")!);
    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
    expect(submit.mock.calls[0][1].lang).toBe(lang);
    expect(submit.mock.calls[0][1].onRetry).toBeTypeOf("function");
  });
});
