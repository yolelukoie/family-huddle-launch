// The signup switch is OPEN in production and must stay invisible
// (plan analyst-tpp-signup-switch-2026-10-06, item L1, key point).
// Here the real fetchSignupOpen and the real submitTeacherSignup run against a mocked
// Supabase client: the page must behave exactly as before whatever teacher_signup_open() does.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const rpc = vi.fn();
const invoke = vi.fn();
vi.mock("@/integrations/supabase/ylc-client", () => ({
  ylcSupabase: { rpc: (...a: unknown[]) => rpc(...a), functions: { invoke: (...a: unknown[]) => invoke(...a) } },
}));
const toast = vi.hoisted(() => ({ info: vi.fn(), error: vi.fn(), success: vi.fn() }));
vi.mock("sonner", () => ({ toast }));

import TeacherPartnerJoin from "./TeacherPartnerJoin";

type StatusCall = () => unknown;
let status: StatusCall;
const createCalls = vi.fn();

const signupAnswer = {
  data: [{ referral_code: "ABC123", already_registered: false, partner_code: null }],
  error: null,
  status: 200,
};

beforeEach(() => {
  window.scrollTo = vi.fn();
  rpc.mockReset();
  invoke.mockReset();
  createCalls.mockReset();
  invoke.mockResolvedValue({ data: { sent: true }, error: null });
  Object.values(toast).forEach((fn) => fn.mockReset());
  rpc.mockImplementation((name: string) => {
    if (name === "teacher_signup_open") return status();
    createCalls(name);
    return { abortSignal: () => Promise.resolve(signupAnswer) };
  });
});
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const renderPage = () =>
  render(
    <MemoryRouter>
      <TeacherPartnerJoin />
    </MemoryRouter>,
  );
const fillAndSubmit = () => {
  fireEvent.change(document.getElementById("name")!, { target: { value: "Anna Ivanova" } });
  fireEvent.change(document.getElementById("email")!, { target: { value: "anna@example.com" } });
  fireEvent.change(document.getElementById("languages")!, { target: { value: "English" } });
  fireEvent.submit(document.querySelector("form")!);
};

// Every way the status call can answer without saying "closed".
const notClosed: Record<string, StatusCall> = {
  "answers true": () => Promise.resolve({ data: true, error: null }),
  "answers null": () => Promise.resolve({ data: null, error: null }),
  "answers with an error (function does not exist yet)": () =>
    Promise.resolve({ data: null, error: { code: "PGRST202", message: "Could not find the function" } }),
  "rejects (network down)": () => Promise.reject(new TypeError("Failed to fetch")),
  "throws synchronously": () => {
    throw new TypeError("rpc is not a function");
  },
  "never answers (slow)": () => new Promise(() => {}),
};

describe("L1: the join page with the switch open or unreachable behaves as before", () => {
  for (const [label, impl] of Object.entries(notClosed)) {
    describe(`when teacher_signup_open ${label}`, () => {
      beforeEach(() => {
        status = impl;
      });

      it("shows the form at once and keeps it, with no closed state", async () => {
        renderPage();
        expect(document.querySelector("form")).not.toBeNull();
        await act(async () => {});
        expect(document.querySelector("form")).not.toBeNull();
        expect(screen.queryByText("New Teacher Partners join by invitation")).toBeNull();
        expect(toast.error).not.toHaveBeenCalled();
      });

      it("signup works end to end: the RPC is called and the success screen shows the code", async () => {
        renderPage();
        fillAndSubmit();
        await waitFor(() => expect(document.querySelector("form")).toBeNull());
        expect(createCalls).toHaveBeenCalledTimes(1);
        expect(createCalls).toHaveBeenCalledWith("create_teacher_partner");
        expect(document.body.textContent).toContain("ABC123");
        expect(screen.queryByText("New Teacher Partners join by invitation")).toBeNull();
        expect(toast.error).not.toHaveBeenCalled();
      });
    });
  }

  it("a closed answer that arrives after a successful signup does not replace the success screen", async () => {
    let answer!: (v: unknown) => void;
    status = () => new Promise((resolve) => (answer = resolve));
    renderPage();
    fillAndSubmit();
    await waitFor(() => expect(document.querySelector("form")).toBeNull());
    expect(document.body.textContent).toContain("ABC123");

    await act(async () => answer({ data: false, error: null }));
    expect(document.body.textContent).toContain("ABC123");
    expect(screen.queryByText("New Teacher Partners join by invitation")).toBeNull();
  });

  it("a closed answer that arrives after the page is left does not throw or warn", async () => {
    let answer!: (v: unknown) => void;
    status = () => new Promise((resolve) => (answer = resolve));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const view = renderPage();
    view.unmount();
    await act(async () => answer({ data: false, error: null }));
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("the status call is made once per visit and asks only for teacher_signup_open", async () => {
    status = () => Promise.resolve({ data: true, error: null });
    renderPage();
    await act(async () => {});
    expect(rpc.mock.calls.filter((c) => c[0] === "teacher_signup_open")).toHaveLength(1);
    expect(rpc.mock.calls.find((c) => c[0] === "teacher_signup_open")).toEqual(["teacher_signup_open"]);
  });

  it("with the switch closed, the same stack shows the closed state and sends no signup", async () => {
    status = () => Promise.resolve({ data: false, error: null });
    renderPage();
    expect(await screen.findByRole("status")).toHaveTextContent("New Teacher Partners join by invitation");
    expect(document.querySelector("form")).toBeNull();
    expect(createCalls).not.toHaveBeenCalled();
  });
});
