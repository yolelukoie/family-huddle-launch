import { z } from "zod";
import { ylcSupabase } from "@/integrations/supabase/ylc-client";
import { SUPPORT_EMAIL } from "@/lib/yourlangcoach/content";

export const TEACHER_LINK_BASE = "https://familyhuddletasks.com/yourlangcoach/t";

export const teacherSignupSchema = z.object({
  name: z.string().trim().min(2, { message: "Please enter your name" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  languages: z
    .string()
    .trim()
    .min(2, { message: "Please tell us which language(s) you teach" })
    .max(200),
  teachingFormat: z.string().max(50).optional(),
  studentCount: z.string().max(20).optional(),
});

export type TeacherSignupValues = z.infer<typeof teacherSignupSchema>;

export const TEACHING_FORMATS = ["Private", "Language school", "Online", "Other"];
export const STUDENT_COUNTS = ["1–5", "6–15", "16–30", "30+"];

// Share links use the static /yourlangcoach/t/ entry page (HTTP 200 + social
// preview tags for crawlers); it forwards humans to the /t/:code app route.
export const referralUrl = (code: string) => `${TEACHER_LINK_BASE}/?c=${encodeURIComponent(code)}`;

export type SignupResult = {
  /** null: the address was already registered, so the server returned no codes. They go out only by email. */
  referralCode: string | null;
  alreadyRegistered: boolean;
  partnerCode?: string;
};

export const RPC_TIMEOUT_MS = 15_000;
export const RPC_MAX_RETRIES = 2;
export const RPC_RETRY_BACKOFF_MS = [1_000, 2_000];
export const WELCOME_EMAIL_TIMEOUT_MS = 10_000;

/** Thrown when the server could not be reached (timeout / network) after all retries. */
export class SignupNetworkError extends Error {
  constructor(message = "Could not reach the server") {
    super(message);
    this.name = "SignupNetworkError";
  }
}

/**
 * The hint the signup RPC sends when the owner has closed the public signup
 * (public.teacher_program_settings.signup_open = false). The same text is in the SQL.
 */
export const SIGNUP_CLOSED_HINT = "teacher_signup_closed";

/** Thrown when the server refuses because the public signup is closed. Never retried. */
export class SignupClosedError extends Error {
  constructor() {
    super("Teacher Partner signup is closed");
    this.name = "SignupClosedError";
  }
}

/**
 * Is the public signup open? Only an explicit `false` from the server counts as closed.
 * An error, a network failure, or a database without the function counts as open: the
 * form stays, and the signup RPC itself still refuses while the signup is closed.
 */
export async function fetchSignupOpen(): Promise<boolean> {
  try {
    const { data, error } = await ylcSupabase.rpc("teacher_signup_open");
    return error ? true : data !== false;
  } catch {
    return true;
  }
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// A PostgREST/business error carries a non-empty `code` (e.g. "23505") and a 4xx
// status; those are real answers from the server and must not be retried.
// Everything else (abort, fetch failure, 5xx gateway errors) is transient.
function isTransientError(error: unknown, status?: number): boolean {
  if (status !== undefined && status >= 500) return true;
  if (status !== undefined && status >= 400) return false;
  const e = error as { code?: string; name?: string; message?: string } | null;
  if (!e) return false;
  if (e.code) return false;
  return true;
}

type RpcRow = { referral_code?: string; already_registered?: boolean; partner_code?: string | number | null };

async function callCreateTeacherPartner(args: Record<string, unknown>): Promise<RpcRow | undefined> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  // Hard deadline: supabase-js may await a token refresh before fetch even
  // starts, where the abort signal has nothing to cancel. The race guarantees
  // the attempt settles regardless.
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new SignupNetworkError("Request timed out"));
    }, RPC_TIMEOUT_MS);
  });

  const attempt = (async (): Promise<RpcRow | undefined> => {
    let result;
    try {
      result = await ylcSupabase.rpc("create_teacher_partner", args as never).abortSignal(controller.signal);
    } catch (err) {
      // fetch itself threw (offline, abort, DNS)
      if (isTransientError(err)) throw new SignupNetworkError(err instanceof Error ? err.message : undefined);
      throw err;
    }
    const { data, error, status } = result;
    if (error) {
      if ((error as { hint?: unknown }).hint === SIGNUP_CLOSED_HINT) throw new SignupClosedError();
      // Keep the HTTP status: a 4xx is a real server answer and is never retried.
      if (isTransientError(error, status)) throw new SignupNetworkError(error.message);
      throw error;
    }
    return (Array.isArray(data) ? data[0] : data) as RpcRow | undefined;
  })();
  attempt.catch(() => {}); // the deadline may win the race; avoid an unhandled rejection

  try {
    return await Promise.race([attempt, deadline]);
  } finally {
    clearTimeout(timer);
  }
}

export async function submitTeacherSignup(
  values: TeacherSignupValues,
  options: { onRetry?: () => void; lang?: string } = {},
): Promise<SignupResult> {
  const parts = values.name.trim().split(/\s+/);
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  const args = {
    _first_name: firstName,
    _last_name: lastName || null,
    _email: values.email.trim(),
    _languages: values.languages.trim(),
    _teaching_format: values.teachingFormat || null,
    _student_count: values.studentCount || null,
  };

  // The RPC is idempotent by email, so retrying is safe. A failed/timed-out
  // attempt may still have created the row server-side.
  let row: RpcRow | undefined;
  let retried = false;
  for (let attempt = 0; ; attempt++) {
    try {
      row = await callCreateTeacherPartner(args);
      break;
    } catch (err) {
      if (!(err instanceof SignupNetworkError) || attempt >= RPC_MAX_RETRIES) throw err;
      retried = true;
      options.onRetry?.();
      await sleep(RPC_RETRY_BACKOFF_MS[attempt] ?? 2_000);
    }
  }

  // An address that is already registered gets no codes back from the server
  // (except during the first 10 minutes, which covers our own retries): the
  // codes are delivered only by email.
  const codesByEmail = !row?.referral_code && row?.already_registered === true;
  if (!row?.referral_code && !codesByEmail) throw new Error("Signup did not return a referral code");

  // Fire-and-forget: email the teacher their links & codes (Resend-backed
  // edge function in the YLC Supabase project). Never blocks or fails signup.
  sendWelcomeEmail(values.email.trim(), options.lang);

  if (codesByEmail) return { referralCode: null, alreadyRegistered: true };

  return {
    referralCode: row.referral_code as string,
    // After a retry, "already registered" most likely means our own earlier
    // attempt created the row, so present it as a normal success.
    alreadyRegistered: retried ? false : Boolean(row.already_registered),
    partnerCode: row.partner_code ? String(row.partner_code) : undefined,
  };
}

// `lang` is the page language. The function writes the email in Russian for
// "ru" and in English for everything else.
function sendWelcomeEmail(email: string, lang?: string): void {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), WELCOME_EMAIL_TIMEOUT_MS);
    Promise.resolve(
      ylcSupabase.functions.invoke("send-teacher-welcome", {
        body: lang ? { email, lang } : { email },
        signal: controller.signal,
      }),
    )
      .catch((err) => console.warn("welcome email failed:", err))
      .finally(() => clearTimeout(timer));
  } catch (err) {
    console.warn("welcome email failed:", err);
  }
}

/** mailto: link that lets the teacher ask support to register them by hand. */
export function buildSupportMailto(
  values: Partial<TeacherSignupValues>,
  subject: string,
  intro: string,
  labels: { name: string; email: string; languages: string; format: string; students: string },
): string {
  const lines = [
    intro,
    "",
    `${labels.name}: ${values.name?.trim() ?? ""}`,
    `${labels.email}: ${values.email?.trim() ?? ""}`,
    `${labels.languages}: ${values.languages?.trim() ?? ""}`,
    `${labels.format}: ${values.teachingFormat ?? ""}`,
    `${labels.students}: ${values.studentCount ?? ""}`,
  ];
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
}
