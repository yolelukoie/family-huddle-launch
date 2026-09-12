import { z } from "zod";
import { ylcSupabase } from "@/integrations/supabase/ylc-client";

export const TEACHER_LINK_BASE = "https://familyhuddletasks.com/yourlangcoach/teacher";

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

export const referralUrl = (code: string) => `${TEACHER_LINK_BASE}/${code}`;

export type SignupResult = { referralCode: string; alreadyRegistered: boolean };

export async function submitTeacherSignup(values: TeacherSignupValues): Promise<SignupResult> {
  const parts = values.name.trim().split(/\s+/);
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  const { data, error } = await ylcSupabase.rpc("create_teacher_partner", {
    _first_name: firstName,
    _last_name: lastName || null,
    _email: values.email.trim(),
    _languages: values.languages.trim(),
    _teaching_format: values.teachingFormat || null,
    _student_count: values.studentCount || null,
  });

  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.referral_code) throw new Error("Signup did not return a referral code");

  return { referralCode: row.referral_code as string, alreadyRegistered: Boolean(row.already_registered) };
}
