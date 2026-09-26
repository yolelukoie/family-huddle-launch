// YourLangCoach — Teacher Partner welcome email
// Deploy this as an Edge Function in your YourLangCoach Supabase project
// (https://vlspnmiqacqolmgtknpf.supabase.co), named "send-teacher-welcome".
//
// It looks up the teacher by email (service role), builds the welcome email
// with their referral link + personal Premium code, and sends it via Resend.
//
// Required secret (Supabase Dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY = re_xxxxxxxxxxxx

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://familyhuddletasks.com";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.yourlangcoach.app";
const APP_STORE = "https://apps.apple.com/app/id6765670414";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(opts: {
  firstName: string;
  referralCode: string;
  partnerCode: string | null;
}): { subject: string; html: string } {
  const { firstName, referralCode, partnerCode } = opts;
  const studentLink = `${SITE}/yourlangcoach/t/?c=${encodeURIComponent(referralCode)}`;
  const androidLink = `${PLAY_STORE}&referrer=teacher%3D${encodeURIComponent(referralCode)}`;

  const studentMessage =
    `Hi! I'm partnering with YourLangCoach — an app that helps you remember ` +
    `and actually use the words from our lessons. With my link you get 1 month ` +
    `of Premium for free: ${studentLink}`;

  const partnerBlock = partnerCode
    ? `
      <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:20px;margin:24px 0;">
        <h2 style="margin:0 0 8px;font-size:18px;color:#5b21b6;">Your personal Premium code</h2>
        <p style="margin:0 0 12px;color:#444;font-size:14px;">
          This code gives <strong>you</strong> Lifetime Premium. Keep it safe — it's for you, not for students.
        </p>
        <p style="margin:0;font-size:22px;font-weight:700;letter-spacing:1px;color:#1e1b4b;">${escapeHtml(partnerCode)}</p>
      </div>`
    : "";

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e2e8f0;">
      <h1 style="margin:0 0 8px;font-size:24px;color:#1e1b4b;">Welcome to the Teacher Partner Program, ${escapeHtml(firstName)}! 🎉</h1>
      <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">
        You're in. Here is everything you need — keep this email, it has your personal links and codes.
      </p>

      <div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;padding:20px;margin:0 0 8px;">
        <h2 style="margin:0 0 8px;font-size:18px;color:#3730a3;">Your student link</h2>
        <p style="margin:0 0 12px;color:#444;font-size:14px;">
          Share this link with your students — every student who installs through it gets
          <strong>1 month of Premium free</strong>, and is attributed to you.
        </p>
        <p style="margin:0;word-break:break-all;">
          <a href="${studentLink}" style="color:#4f46e5;font-weight:700;">${studentLink}</a>
        </p>
      </div>

      ${partnerBlock}

      <h2 style="margin:24px 0 8px;font-size:18px;color:#1e1b4b;">Ready-made message for your students</h2>
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Copy and send it in your class group:</p>
      <div style="background:#f1f5f9;border-radius:12px;padding:16px;font-size:14px;color:#334155;line-height:1.6;">
        ${escapeHtml(studentMessage)}
      </div>

      <h2 style="margin:24px 0 8px;font-size:18px;color:#1e1b4b;">Download the app</h2>
      <p style="margin:0 0 12px;color:#475569;font-size:14px;">
        Use your personal Premium code in the app to activate Lifetime Premium.
      </p>
      <p style="margin:0;">
        <a href="${androidLink}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:700;font-size:14px;margin:0 8px 8px 0;">Download for Android</a>
        <a href="${APP_STORE}" style="display:inline-block;background:#1e293b;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:700;font-size:14px;margin:0 0 8px;">Download for iPhone</a>
      </p>

      <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;" />
      <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
        YourLangCoach Teacher Partner Program ·
        <a href="${SITE}/yourlangcoach" style="color:#94a3b8;">familyhuddletasks.com/yourlangcoach</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  return {
    subject: "Your YourLangCoach Teacher Partner links & codes 🎉",
    html,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) throw new Error("RESEND_API_KEY is not configured");

    const { email } = await req.json();
    if (typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Look up the teacher server-side so codes are only ever sent to the
    // registered teacher's own email address.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: teacher, error: lookupError } = await supabase
      .from("teachers")
      .select("first_name, email, referral_code, partner_code")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (lookupError) throw lookupError;
    if (!teacher) {
      // Don't reveal whether the email exists.
      return new Response(JSON.stringify({ sent: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { subject, html } = buildEmail({
      firstName: teacher.first_name || "teacher",
      referralCode: teacher.referral_code,
      partnerCode: teacher.partner_code ?? null,
    });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "YourLangCoach <hello@familyhuddletasks.com>",
        to: [teacher.email],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend failed [${res.status}]: ${body}`);
      return new Response(
        JSON.stringify({ error: "Email provider failed", status: res.status, details: body }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ sent: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-teacher-welcome error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
