import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, ExternalLink, Gift, Infinity as InfinityIcon, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import ylcLogo from "@/assets/yourlangcoach-logo.png";
import { IPHONE_URL, ANDROID_URL } from "@/lib/yourlangcoach/content";
import {
  STUDENT_COUNTS,
  TEACHING_FORMATS,
  referralUrl,
  submitTeacherSignup,
  teacherSignupSchema,
  type TeacherSignupValues,
} from "@/lib/yourlangcoach/teacherPartner";

const emptyForm: TeacherSignupValues = {
  name: "",
  email: "",
  languages: "",
  teachingFormat: undefined,
  studentCount: undefined,
};

const TeacherPartnerJoin = () => {
  const [values, setValues] = useState<TeacherSignupValues>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Join the Teacher Partner Program | YourLangCoach";
  }, []);

  const link = code ? referralUrl(code) : "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = teacherSignupSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const result = await submitTeacherSignup(parsed.data);
      setCode(result.referralCode);
      if (result.alreadyRegistered) {
        toast.info("You're already a Teacher Partner — here is your link again.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(`We couldn't complete your signup. ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy automatically — please copy the link manually.");
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `Here is your free month of YourLangCoach Premium: ${link}`,
  )}`;

  return (
    <div className="ylc-theme tpp-theme min-h-screen bg-background text-foreground">
      <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/yourlangcoach/tpp" className="flex min-w-0 items-center gap-2.5">
            <img src={ylcLogo} alt="YourLangCoach logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="truncate font-display text-sm font-semibold sm:text-base">YourLangCoach</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/yourlangcoach/tpp"><ArrowLeft /> Back</Link>
          </Button>
        </div>
      </header>

      <main className="container px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto w-full max-w-xl">
          {!code ? (
            <>
              <div className="text-center">
                <p className="ylc-eyebrow">Teacher Partner Program</p>
                <h1 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                  Become a Teacher Partner
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Lifetime Premium for you, one free month of Premium for every student. No payment, no commitment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl border border-border bg-card/60 p-6 md:p-8">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={values.name}
                    maxLength={100}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    placeholder="Anna Cohen"
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={values.email}
                    maxLength={255}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">What language(s) do you teach? *</Label>
                  <Input
                    id="languages"
                    value={values.languages}
                    maxLength={200}
                    onChange={(e) => setValues((v) => ({ ...v, languages: e.target.value }))}
                    placeholder="Hebrew, English"
                  />
                  {errors.languages && <p className="text-sm text-destructive">{errors.languages}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Teaching format <span className="text-muted-foreground">(optional)</span></Label>
                    <Select
                      value={values.teachingFormat}
                      onValueChange={(value) => setValues((v) => ({ ...v, teachingFormat: value }))}
                    >
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {TEACHING_FORMATS.map((format) => (
                          <SelectItem key={format} value={format}>{format}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Number of students <span className="text-muted-foreground">(optional)</span></Label>
                    <Select
                      value={values.studentCount}
                      onValueChange={(value) => setValues((v) => ({ ...v, studentCount: value }))}
                    >
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {STUDENT_COUNTS.map((count) => (
                          <SelectItem key={count} value={count}>{count}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full rounded-lg" disabled={loading}>
                  {loading ? <><Loader2 className="animate-spin" /> Creating your link…</> : "Become a Teacher Partner"}
                </Button>
              </form>
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-card/60 p-6 text-center md:p-10">
              <h1 className="font-display text-3xl font-semibold md:text-4xl">You're in! 🎉</h1>
              <p className="mt-3 text-lg text-muted-foreground">Your Teacher Partner link is ready.</p>

              <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <Gift className="mt-0.5 h-5 w-5 text-primary" />
                  <p className="text-sm">Your students get <strong>1 month of Premium free</strong>.</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <InfinityIcon className="mt-0.5 h-5 w-5 text-primary" />
                  <p className="text-sm">You get <strong>Lifetime Premium free</strong>.</p>
                </div>
              </div>

              <div className="mt-8 text-left">
                <p className="text-sm font-medium text-muted-foreground">Your personal student link</p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <code className="flex-1 overflow-x-auto rounded-lg border border-border bg-background/70 px-4 py-3 text-sm">
                    {link}
                  </code>
                  <Button onClick={copyLink} size="lg" className="rounded-lg">
                    {copied ? <><Check /> Copied</> : <><Copy /> Copy link</>}
                  </Button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Students can also enter your code <strong>{code}</strong> directly in the app.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild variant="secondary" className="rounded-lg">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> Share via WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-lg">
                  <a href={IPHONE_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink /> Open YourLangCoach (iPhone)
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-lg">
                  <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink /> Open YourLangCoach (Android)
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <YLCFooter />
    </div>
  );
};

export default TeacherPartnerJoin;
