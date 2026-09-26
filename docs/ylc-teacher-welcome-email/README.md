# Teacher Partner welcome email (Resend)

Sends every registered teacher an email with their student referral link,
personal Premium code, a ready-made message for students, and app download
links — so they always have their codes in their inbox.

## What's here

- `send-teacher-welcome/index.ts` — the Edge Function. It looks up the teacher
  by email (service role) and only ever sends to the registered teacher's own
  address, so the form can't be abused to spam strangers.

## One-time setup (about 10 minutes)

### 1. Resend account + domain

1. Create a free account at https://resend.com
2. Add and verify your domain `familyhuddletasks.com`
   (Resend → Domains → Add Domain, then add the DNS records it shows you).
   Until the domain is verified you can only email yourself.
3. Create an API key (Resend → API Keys → Create). Copy it.

### 2. Deploy the function to your YourLangCoach Supabase

Option A — Supabase Dashboard (no CLI needed):

1. Open your YLC project → Edge Functions → Create function
2. Name it exactly: `send-teacher-welcome`
3. Paste the full contents of `send-teacher-welcome/index.ts` and deploy

Option B — Supabase CLI:

```bash
supabase functions deploy send-teacher-welcome --project-ref vlspnmiqacqolmgtknpf
```

### 3. Add the Resend API key as a secret

Supabase Dashboard → Edge Functions → Secrets → Add:

```
RESEND_API_KEY = re_xxxxxxxxxxxx
```

(or `supabase secrets set RESEND_API_KEY=re_xxx --project-ref vlspnmiqacqolmgtknpf`)

### 4. Done — the website already calls it

After a successful teacher signup (both fresh and "already registered",
which doubles as a "resend my codes" feature), the website calls the
function in the background. The teacher sees the success screen immediately;
the email arrives a few seconds later. If the email fails, signup still works.

## Testing

Register a test teacher on `/yourlangcoach/tpp/join` with your own email —
you should receive the welcome email within seconds. Check the function logs
in Supabase → Edge Functions → `send-teacher-welcome` → Logs if it doesn't.
