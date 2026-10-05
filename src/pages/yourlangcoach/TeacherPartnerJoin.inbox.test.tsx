import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/integrations/supabase/ylc-client", () => ({ ylcSupabase: {} }));
const toast = vi.hoisted(() => ({ info: vi.fn(), error: vi.fn(), success: vi.fn() }));
vi.mock("sonner", () => ({ toast }));

const submit = vi.fn();
vi.mock("@/lib/yourlangcoach/teacherPartner", async (orig) => ({
  ...(await orig<typeof import("@/lib/yourlangcoach/teacherPartner")>()),
  submitTeacherSignup: (...a: unknown[]) => submit(...a),
}));

import TeacherPartnerJoin from "./TeacherPartnerJoin";

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
const submitForm = () => fireEvent.submit(document.querySelector("form")!);

beforeEach(() => {
  window.scrollTo = vi.fn();
  submit.mockReset();
  Object.values(toast).forEach((fn) => fn.mockReset());
});
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("already registered: codes only by email", () => {
  it("shows the inbox state with the typed address and no codes", async () => {
    submit.mockResolvedValueOnce({ referralCode: null, alreadyRegistered: true });
    renderPage("en");
    fill("Anna Ivanova", " anna@example.com ", "English");
    submitForm();

    const box = await screen.findByRole("status");
    expect(document.querySelector("form")).toBeNull();
    expect(box).toHaveTextContent("You're already a Teacher Partner");
    expect(box).toHaveTextContent("anna@example.com");
    expect(box).toHaveTextContent("at most three a day");
    expect(document.body.textContent).not.toContain("PRO-");
    expect(document.body.textContent).not.toContain("/yourlangcoach/t/?c=");
    expect(toast.info).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();

    const href = box.querySelector("a")!.getAttribute("href")!;
    const url = new URL(href);
    expect(url.pathname).toBe("support@familyhuddletasks.com");
    expect(url.searchParams.get("subject")).toBe("I can't find my Teacher Partner email");
    expect(url.searchParams.get("body")).toContain("anna@example.com");
    expect(box).toHaveTextContent("support@familyhuddletasks.com");
  });

  it("'Use another email' returns to the form with the values kept", async () => {
    submit.mockResolvedValueOnce({ referralCode: null, alreadyRegistered: true });
    renderPage("en");
    fill("Anna Ivanova", "anna@example.com", "English");
    submitForm();
    await screen.findByRole("status");
    fireEvent.click(screen.getByText("Use another email"));
    await waitFor(() => expect(document.querySelector("form")).not.toBeNull());
    expect((document.getElementById("email") as HTMLInputElement).value).toBe("anna@example.com");
    expect((document.getElementById("name") as HTMLInputElement).value).toBe("Anna Ivanova");
  });

  it("is localized in Russian and Hebrew, with the address kept left-to-right", async () => {
    submit.mockResolvedValueOnce({ referralCode: null, alreadyRegistered: true });
    renderPage("ru");
    fill("Анна Иванова", "anna@example.com", "Английский");
    submitForm();
    let box = await screen.findByRole("status");
    expect(box).toHaveTextContent("Вы уже партнёр-преподаватель");
    expect(box).toHaveTextContent("Указать другой адрес");
    cleanup();

    submit.mockResolvedValueOnce({ referralCode: null, alreadyRegistered: true });
    renderPage("he");
    fill("אנה כהן", "anna@example.com", "עברית");
    submitForm();
    box = await screen.findByRole("status");
    expect(box).toHaveTextContent("את/ה כבר מורה שותף");
    const address = Array.from(box.querySelectorAll("span")).find((el) => el.textContent === "anna@example.com")!;
    expect(address.getAttribute("dir")).toBe("ltr");
  });

  it("a result with codes still shows the normal success screen", async () => {
    submit.mockResolvedValueOnce({ referralCode: "ANNA7QK", alreadyRegistered: false, partnerCode: "PRO-1" });
    renderPage("en");
    fill("Anna Ivanova", "anna@example.com", "English");
    submitForm();
    await waitFor(() => expect(document.querySelector("form")).toBeNull());
    expect(screen.queryByText("You're already a Teacher Partner")).toBeNull();
    expect(document.body.textContent).toContain("PRO-1");
  });
});
