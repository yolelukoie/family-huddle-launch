# Teacher Partner welcome email

The edge function `send-teacher-welcome` lives in the yourlangcoach repo
(`supabase/functions/send-teacher-welcome`) and is deployed by that repo's CI.
Do not deploy a function from this folder.

The website calls it right after every successful teacher signup (`src/lib/yourlangcoach/teacherPartner.ts`,
`sendWelcomeEmail`). The function sends the welcome email at once. A repeat registration sends it
again, at most 3 times in 24 hours and never twice within 10 minutes. If the call is lost, an hourly
job in the database sends the email.

Operations: `docs/RUNBOOK.md` in the yourlangcoach repo, section "Teacher welcome email".
