// Verifier-added coverage for the TPP join form failure/success states.
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
import { SignupNetworkError } from "@/lib/yourlangcoach/teacherPartner";

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
const submitButton = () => document.querySelector<HTMLButtonElement>("form button[type=submit]")!;

const mailBody = (alert: HTMLElement) => {
  const href = alert.querySelector("a")!.getAttribute("href")!;
  expect(href).toMatch(/^[\x21-\x7e]+$/);
  const url = new URL(href);
  expect(url.pathname).toBe("support@familyhuddletasks.com");
  return { subject: url.searchParams.get("subject")!, body: url.searchParams.get("body")!, href };
};

beforeEach(() => {
  window.scrollTo = vi.fn();
  submit.mockReset();
  Object.values(toast).forEach((fn) => fn.mockReset());
});
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("network failure alert is localized", () => {
  it("Russian: alert, button and Cyrillic mailto", async () => {
    submit.mockRejectedValueOnce(new SignupNetworkError());
    renderPage("ru");
    fill("Анна Иванова", "anna@example.com", "Английский, иврит");
    fireEvent.change(document.getElementById("teachingFormat")!, { target: { value: "Online" } });
    fireEvent.change(document.getElementById("studentCount")!, { target: { value: "6–15" } });
    submitForm();

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Не удаётся связаться с сервером");
    expect(alert).toHaveTextContent("Написать нам");
    const { subject, body, href } = mailBody(alert);
    expect(alert).toHaveTextContent("support@familyhuddletasks.com");
    expect(subject).toBe("Регистрация в программе партнёров-преподавателей");
    expect(href).toContain("%0D%0A");
    expect(href.length).toBeLessThan(2000);
    expect(body.split("\r\n").slice(2)).toEqual([
      "Имя: Анна Иванова",
      "Эл. почта: anna@example.com",
      "Какие языки я преподаю: Английский, иврит",
      "Формат преподавания: Online",
      "Количество учеников: 6–15",
    ]);
    await waitFor(() => expect(submitButton()).not.toBeDisabled());
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("Hebrew: alert, button and Hebrew mailto", async () => {
    submit.mockRejectedValueOnce(new SignupNetworkError());
    renderPage("he");
    fill("דנה לוי", "dana@example.com", "עברית, אנגלית");
    submitForm();

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("אי אפשר להתחבר לשרת");
    expect(alert).toHaveTextContent("כתבו לנו");
    const { subject, body } = mailBody(alert);
    expect(subject).toBe("הרשמה לתוכנית שותפות למורים");
    expect(body).toContain("לתוכנית שותפות למורים");
    expect(alert).toHaveTextContent("support@familyhuddletasks.com");
    expect(body).toContain("שם: דנה לוי");
    expect(body).toContain("אימייל: dana@example.com");
    expect(body).toContain("שפות שאני מלמד/ת: עברית, אנגלית");
    expect(body.split("\r\n")).toHaveLength(7);
  });
});

describe("other paths are unchanged", () => {
  it("validation errors show the old messages and never call the server", async () => {
    renderPage("en");
    fill("A", "not-an-email", "");
    submitForm();
    expect(await screen.findByText("Please enter your name")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    expect(screen.getByText("Please tell us which language(s) you teach")).toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("a real server error shows the old toast, no network alert, spinner stops", async () => {
    submit.mockRejectedValueOnce(new Error("Signup did not return a referral code"));
    renderPage("en");
    fill("Anna Ivanova", "anna@example.com", "English");
    submitForm();
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("We couldn't complete your signup. Signup did not return a referral code"),
    );
    expect(screen.queryByRole("alert")).toBeNull();
    await waitFor(() => expect(submitButton()).not.toBeDisabled());
  });

  it("a PostgREST error object (not an Error) shows the plain signup error toast", async () => {
    submit.mockRejectedValueOnce({ code: "P0001", message: "Missing required fields" });
    renderPage("en");
    fill("Anna Ivanova", "anna@example.com", "English");
    submitForm();
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("We couldn't complete your signup."));
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("an already-registered teacher gets the success screen with their link and the info toast", async () => {
    submit.mockResolvedValueOnce({ referralCode: "OLD777", alreadyRegistered: true, partnerCode: "PRO-OLD" });
    renderPage("en");
    fill("Anna Ivanova", "anna@example.com", "English");
    submitForm();
    await waitFor(() => expect(document.querySelector("form")).toBeNull());
    expect(toast.info).toHaveBeenCalledWith("You're already a Teacher Partner — here is your link again.");
    expect(document.body.textContent).toContain("OLD777");
    expect(document.body.textContent).toContain("PRO-OLD");
  });

  it("retrying after a network failure hides the alert and reaches the success screen", async () => {
    submit.mockRejectedValueOnce(new SignupNetworkError());
    renderPage("en");
    fill("Anna Ivanova", "anna@example.com", "English");
    submitForm();
    await screen.findByRole("alert");

    let resolve!: (v: unknown) => void;
    submit.mockReturnValueOnce(new Promise((r) => (resolve = r)));
    await waitFor(() => expect(submitButton()).not.toBeDisabled());
    submitForm();
    await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
    expect(submitButton()).toBeDisabled();
    resolve({ referralCode: "ABC123", alreadyRegistered: false, partnerCode: "PRO-1" });
    await waitFor(() => expect(document.querySelector("form")).toBeNull());
    expect(toast.info).not.toHaveBeenCalled();
    expect(submit).toHaveBeenCalledTimes(2);
  });
});
