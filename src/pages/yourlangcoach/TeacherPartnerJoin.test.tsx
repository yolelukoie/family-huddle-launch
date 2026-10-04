import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/integrations/supabase/ylc-client", () => ({ ylcSupabase: {} }));
vi.mock("sonner", () => ({ toast: { info: vi.fn(), error: vi.fn(), success: vi.fn() } }));

const submit = vi.fn();
vi.mock("@/lib/yourlangcoach/teacherPartner", async (orig) => ({
  ...(await orig<typeof import("@/lib/yourlangcoach/teacherPartner")>()),
  submitTeacherSignup: (...a: unknown[]) => submit(...a),
}));

import TeacherPartnerJoin from "./TeacherPartnerJoin";
import { SignupNetworkError } from "@/lib/yourlangcoach/teacherPartner";

describe("TeacherPartnerJoin network failure", () => {
  it("stops the spinner and shows the message with a prefilled mailto button", async () => {
    window.scrollTo = vi.fn();
    submit.mockRejectedValueOnce(new SignupNetworkError());
    render(
      <MemoryRouter>
        <TeacherPartnerJoin />
      </MemoryRouter>,
    );
    fireEvent.change(document.getElementById("name")!, { target: { value: "Anna Ivanova" } });
    fireEvent.change(document.getElementById("email")!, { target: { value: "anna@example.com" } });
    fireEvent.change(document.getElementById("languages")!, { target: { value: "English" } });
    fireEvent.submit(document.querySelector("form")!);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("another network");
    const link = alert.querySelector("a")!;
    const url = new URL(link.getAttribute("href")!);
    expect(url.pathname).toBe("support@familyhuddletasks.com");
    expect(url.searchParams.get("body")).toContain("anna@example.com");
    await waitFor(() => expect(screen.queryByText(/Creating your link/)).toBeNull());
    expect(alert).toHaveTextContent("support@familyhuddletasks.com");
  });

  it("shows a slow-connection hint next to the spinner while a retry is in progress", async () => {
    window.scrollTo = vi.fn();
    let finish!: (v: unknown) => void;
    submit.mockImplementationOnce((_values: unknown, options?: { onRetry?: () => void }) => {
      expect(options?.onRetry).toBeTypeOf("function");
      return new Promise((resolve) => {
        finish = resolve;
        options!.onRetry!();
      });
    });
    render(
      <MemoryRouter>
        <TeacherPartnerJoin />
      </MemoryRouter>,
    );
    fireEvent.change(document.getElementById("name")!, { target: { value: "Anna Ivanova" } });
    fireEvent.change(document.getElementById("email")!, { target: { value: "anna@example.com" } });
    fireEvent.change(document.getElementById("languages")!, { target: { value: "English" } });
    fireEvent.submit(document.querySelector("form")!);

    expect(await screen.findByRole("status")).toHaveTextContent("The connection is slow, trying again…");
    finish({ referralCode: "ABC123", alreadyRegistered: false });
    await waitFor(() => expect(document.querySelector("form")).toBeNull());
  });
});
