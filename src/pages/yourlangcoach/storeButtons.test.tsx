// Store buttons of the join page and the student page (plan analyst-teacher-code-prefill-2026-10-04, item S1).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const rpc = vi.fn(() => Promise.resolve({ data: null, error: null }));
vi.mock("@/integrations/supabase/ylc-client", () => ({ ylcSupabase: { rpc: (...a: unknown[]) => rpc(...(a as [])) } }));
const toast = vi.hoisted(() => ({ info: vi.fn(), error: vi.fn(), success: vi.fn() }));
vi.mock("sonner", () => ({ toast }));
const submit = vi.fn();
vi.mock("@/lib/yourlangcoach/teacherPartner", async (orig) => ({
  ...(await orig<typeof import("@/lib/yourlangcoach/teacherPartner")>()),
  submitTeacherSignup: (...a: unknown[]) => submit(...a),
}));

import TeacherPartnerJoin from "./TeacherPartnerJoin";
import TeacherStudentReferral from "./TeacherStudentReferral";
import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";

const UA = {
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  android: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
  windows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};
const writeText = vi.fn();
const location = { href: "" };
const originalLocation = window.location;

const setDevice = (userAgent: string) => {
  Object.defineProperty(window.navigator, "userAgent", { configurable: true, get: () => userAgent });
};

beforeEach(() => {
  window.scrollTo = vi.fn();
  window.localStorage.clear();
  window.localStorage.setItem("ylc-lang", "en");
  writeText.mockReset();
  writeText.mockResolvedValue(undefined);
  Object.defineProperty(window.navigator, "clipboard", { configurable: true, value: { writeText } });
  location.href = "";
  Object.defineProperty(window, "location", { configurable: true, value: location });
  submit.mockReset();
  submit.mockResolvedValue({ referralCode: "ANNA3XK", alreadyRegistered: false, partnerCode: "PRO-ABCDEFGHJK" });
  Object.values(toast).forEach((fn) => fn.mockReset());
});
afterEach(() => {
  cleanup();
  Object.defineProperty(window, "location", { configurable: true, value: originalLocation });
  Reflect.deleteProperty(window.navigator, "userAgent");
  Reflect.deleteProperty(window.navigator, "clipboard");
});

const openSuccessScreen = async () => {
  render(
    <MemoryRouter>
      <TeacherPartnerJoin />
    </MemoryRouter>,
  );
  fireEvent.change(document.getElementById("name")!, { target: { value: "Anna Ivanova" } });
  fireEvent.change(document.getElementById("email")!, { target: { value: "anna@example.com" } });
  fireEvent.change(document.getElementById("languages")!, { target: { value: "English" } });
  fireEvent.submit(document.querySelector("form")!);
  await waitFor(() => expect(document.querySelector("form")).toBeNull());
};

describe("S1: join page store buttons", () => {
  it("Android phone, App Store button: copies the plain code, never the marker", async () => {
    setDevice(UA.android);
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Open in App Store/ }));
    await waitFor(() => expect(location.href).toBe(IPHONE_URL));
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("PRO-ABCDEFGHJK");
    expect(toast.success).toHaveBeenCalledWith("Code copied");
  });

  it("desktop, App Store button: copies the plain code", async () => {
    setDevice(UA.windows);
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Open in App Store/ }));
    await waitFor(() => expect(location.href).toBe(IPHONE_URL));
    expect(writeText).toHaveBeenCalledWith("PRO-ABCDEFGHJK");
  });

  it("iPhone, App Store button: copies the marker for the app's first-launch pickup", async () => {
    setDevice(UA.iphone);
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Open in App Store/ }));
    await waitFor(() => expect(location.href).toBe(IPHONE_URL));
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("YLC-T:PRO-ABCDEFGHJK");
  });

  it("App Store button: a refused clipboard shows the error toast and still navigates", async () => {
    setDevice(UA.android);
    writeText.mockRejectedValue(new Error("denied"));
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Open in App Store/ }));
    await waitFor(() => expect(location.href).toBe(IPHONE_URL));
    expect(toast.error).toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("Google Play button: referrer link with the personal code, and the plain code on the clipboard", async () => {
    setDevice(UA.android);
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Open in Google Play/ }));
    // same tick as the click: no await before this assertion
    expect(location.href).toBe(`${ANDROID_URL}&referrer=teacher%3DPRO-ABCDEFGHJK`);
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("PRO-ABCDEFGHJK");
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Code copied"));
  });

  it("Google Play button on an iPhone user agent still copies the plain code, not the marker", async () => {
    setDevice(UA.iphone);
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Open in Google Play/ }));
    expect(writeText).toHaveBeenCalledWith("PRO-ABCDEFGHJK");
  });

  it("Google Play button still navigates, without an error toast, when the clipboard rejects", async () => {
    setDevice(UA.android);
    writeText.mockRejectedValue(new Error("denied"));
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Open in Google Play/ }));
    expect(location.href).toBe(`${ANDROID_URL}&referrer=teacher%3DPRO-ABCDEFGHJK`);
    await new Promise((r) => setTimeout(r, 0));
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("Google Play button still navigates, without an error toast, when navigator.clipboard is undefined", async () => {
    setDevice(UA.android);
    await openSuccessScreen();
    Reflect.deleteProperty(window.navigator, "clipboard");
    fireEvent.click(screen.getByRole("button", { name: /Open in Google Play/ }));
    expect(location.href).toBe(`${ANDROID_URL}&referrer=teacher%3DPRO-ABCDEFGHJK`);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("the Copy code button still copies the plain code", async () => {
    setDevice(UA.iphone);
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Copy code/ }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("PRO-ABCDEFGHJK"));
  });

  it("no personal code: no clipboard write on either store button", async () => {
    setDevice(UA.android);
    submit.mockResolvedValue({ referralCode: "ANNA3XK", alreadyRegistered: false });
    await openSuccessScreen();
    fireEvent.click(screen.getByRole("button", { name: /Open in Google Play/ }));
    expect(location.href).toBe(ANDROID_URL);
    fireEvent.click(screen.getByRole("button", { name: /Open in App Store/ }));
    await waitFor(() => expect(location.href).toBe(IPHONE_URL));
    expect(writeText).not.toHaveBeenCalled();
  });
});

describe("S1: student page App Store link", () => {
  const renderStudent = () =>
    render(
      <MemoryRouter initialEntries={["/yourlangcoach/t/anna3xk"]}>
        <Routes>
          <Route path="/yourlangcoach/t/:code" element={<TeacherStudentReferral />} />
        </Routes>
      </MemoryRouter>,
    );

  it("iPhone: writes the marker", () => {
    setDevice(UA.iphone);
    renderStudent();
    fireEvent.click(screen.getByRole("link", { name: /Download on the App Store/ }));
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("YLC-T:ANNA3XK");
  });

  it("iPhone: a rejecting clipboard does not throw out of the click", () => {
    setDevice(UA.iphone);
    writeText.mockRejectedValue(new Error("denied"));
    renderStudent();
    expect(() => fireEvent.click(screen.getByRole("link", { name: /Download on the App Store/ }))).not.toThrow();
  });

  it("Android: writes nothing, and Copy code still copies the plain code", async () => {
    setDevice(UA.android);
    renderStudent();
    fireEvent.click(screen.getByRole("link", { name: /Download on the App Store/ }));
    expect(writeText).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Copy code/ }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("ANNA3XK"));
    expect(screen.getByRole("link", { name: /Get it on Google Play/ }).getAttribute("href")).toBe(
      `${ANDROID_URL}&referrer=teacher%3DANNA3XK`,
    );
  });

  it("desktop: writes nothing on the App Store click", () => {
    setDevice(UA.windows);
    renderStudent();
    fireEvent.click(screen.getByRole("link", { name: /Download on the App Store/ }));
    expect(writeText).not.toHaveBeenCalled();
  });
});
