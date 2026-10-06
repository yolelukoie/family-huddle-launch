// Closed public signup on the join page (plan analyst-tpp-signup-switch-2026-10-06, item L1).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/integrations/supabase/ylc-client", () => ({ ylcSupabase: {} }));
const toast = vi.hoisted(() => ({ info: vi.fn(), error: vi.fn(), success: vi.fn() }));
vi.mock("sonner", () => ({ toast }));

const submit = vi.fn();
const signupOpen = vi.fn();
vi.mock("@/lib/yourlangcoach/teacherPartner", async (orig) => ({
  ...(await orig<typeof import("@/lib/yourlangcoach/teacherPartner")>()),
  submitTeacherSignup: (...a: unknown[]) => submit(...a),
  fetchSignupOpen: () => signupOpen(),
}));

import TeacherPartnerJoin from "./TeacherPartnerJoin";
import { SignupClosedError } from "@/lib/yourlangcoach/teacherPartner";

const renderPage = (lang: "en" | "he" | "ru") => {
  window.localStorage.setItem("ylc-lang", lang);
  return render(
    <MemoryRouter>
      <TeacherPartnerJoin />
    </MemoryRouter>,
  );
};
const fill = (name: string, email: string, languages: string) => {
  fireEvent.change(document.getElementById("name")!, { target: { value: name } });
  fireEvent.change(document.getElementById("email")!, { target: { value: email } });
  fireEvent.change(document.getElementById("languages")!, { target: { value: languages } });
};

beforeEach(() => {
  window.scrollTo = vi.fn();
  submit.mockReset();
  signupOpen.mockReset();
  Object.values(toast).forEach((fn) => fn.mockReset());
});
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("join page: the public signup is closed", () => {
  it("shows the closed state instead of the form when the server says closed", async () => {
    signupOpen.mockResolvedValue(false);
    renderPage("en");

    const box = await screen.findByRole("status");
    expect(document.querySelector("form")).toBeNull();
    expect(box).toHaveTextContent("New Teacher Partners join by invitation");
    expect(box).toHaveTextContent("Signup on this page is closed for now.");
    expect(box).toHaveTextContent("support@familyhuddletasks.com");
    const url = new URL(box.querySelector("a")!.getAttribute("href")!);
    expect(url.pathname).toBe("support@familyhuddletasks.com");
    expect(url.searchParams.get("subject")).toBe("I'd like to join the Teacher Partner Program");
    expect(url.searchParams.get("body")).toContain("I'd like to join the Teacher Partner Program. My details:");
    expect(toast.error).not.toHaveBeenCalled();
    expect(submit).not.toHaveBeenCalled();
  });

  it("keeps the form when the server says open", async () => {
    signupOpen.mockResolvedValue(true);
    renderPage("en");
    await act(async () => {});
    expect(signupOpen).toHaveBeenCalledTimes(1);
    expect(document.querySelector("form")).not.toBeNull();
    expect(screen.queryByText("New Teacher Partners join by invitation")).toBeNull();
  });

  it("shows the form at once and keeps it while the server has not answered", async () => {
    signupOpen.mockReturnValue(new Promise<boolean>(() => {}));
    renderPage("en");
    expect(document.querySelector("form")).not.toBeNull();
    await act(async () => {});
    expect(document.querySelector("form")).not.toBeNull();
  });

  it("a submit refused as closed shows the closed state with the typed details in the mail link, and no error toast", async () => {
    signupOpen.mockResolvedValue(true);
    submit.mockRejectedValueOnce(new SignupClosedError());
    renderPage("en");
    fill("Anna Ivanova", "anna@example.com", "Hebrew");
    fireEvent.submit(document.querySelector("form")!);

    const box = await screen.findByRole("status");
    expect(document.querySelector("form")).toBeNull();
    expect(box).toHaveTextContent("New Teacher Partners join by invitation");
    const body = new URL(box.querySelector("a")!.getAttribute("href")!).searchParams.get("body")!;
    expect(body).toContain("Anna Ivanova");
    expect(body).toContain("anna@example.com");
    expect(body).toContain("Hebrew");
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.info).not.toHaveBeenCalled();
  });

  it("is localized in Russian and Hebrew", async () => {
    signupOpen.mockResolvedValue(false);
    renderPage("ru");
    expect(await screen.findByRole("status")).toHaveTextContent("Новые партнёры-преподаватели присоединяются по приглашению");
    cleanup();

    renderPage("he");
    const box = await screen.findByRole("status");
    expect(box).toHaveTextContent("מורים שותפים חדשים מצטרפים בהזמנה");
    expect(box.closest("[dir]")!.getAttribute("dir")).toBe("rtl");
  });
});
