import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark, Check, Copy, Crown, ExternalLink, Gift, Infinity as InfinityIcon, Key, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import LanguageSwitcher from "@/components/yourlangcoach/LanguageSwitcher";
import ylcLogo from "@/assets/yourlangcoach-logo.png";
import { IPHONE_URL, ANDROID_URL } from "@/lib/yourlangcoach/content";
import { YlcLangProvider, useYlcLang } from "@/lib/yourlangcoach/i18n";
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

const TeacherPartnerJoinContent = () => {
  const { t, dir } = useYlcLang();
  const tj = t.join;
  const [values, setValues] = useState<TeacherSignupValues>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [partnerCode, setPartnerCode] = useState<string | null>(null);
  const [copiedPartnerCode, setCopiedPartnerCode] = useState(false);

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
      setPartnerCode(result.partnerCode ?? null);
      if (result.alreadyRegistered) {
        toast.info(tj.alreadyRegistered);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      toast.error(`${tj.signupError} ${message}`.trim());
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success(tj.copySuccess);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(tj.copyError);
    }
  };

  const studentMessage = code
    ? `Hi! I'm inviting you to practice with me on YourLangCoach. Use my link — you'll get 30 days of Premium for free: ${referralUrl(code)}\n\nIf the app asks for a teacher code, enter: ${code}`
    : "";

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(studentMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch {
      toast.error(tj.copyError);
    }
  };

  const copyPartnerCode = async () => {
    if (!partnerCode) return;
    try {
      await navigator.clipboard.writeText(partnerCode);
      setCopiedPartnerCode(true);
      toast.success(tj.copyCodeSuccess);
      setTimeout(() => setCopiedPartnerCode(false), 2000);
    } catch {
      toast.error(tj.copyError);
    }
  };

  const androidHref = partnerCode
    ? `${ANDROID_URL}&referrer=teacher%3D${encodeURIComponent(partnerCode)}`
    : ANDROID_URL;

  const openIphoneStore = async () => {
    if (partnerCode) {
      try {
        await navigator.clipboard.writeText(`YLC-T:${partnerCode}`);
        toast.success(tj.copyCodeSuccess);
      } catch {
        toast.error(tj.copyError);
      }
    }
    window.location.href = IPHONE_URL;
  };

  return (
    <div dir={dir} className="ylc-theme tpp-theme min-h-screen bg-background text-foreground">
      <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/yourlangcoach/tpp" className="flex min-w-0 items-center gap-2.5">
            <img src={ylcLogo} alt="YourLangCoach logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="hidden truncate font-display text-sm font-semibold sm:inline sm:text-base">YourLangCoach</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild variant="ghost" size="sm">
              <Link to="/yourlangcoach/tpp"><ArrowLeft className="rtl:rotate-180" /> {tj.back}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto w-full max-w-xl">
          {!code ? (
            <>
              <div className="text-center">
                <p className="ylc-eyebrow">{tj.eyebrow}</p>
                <h1 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                  {tj.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{tj.intro}</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl border border-border bg-card/60 p-6 md:p-8">
                <div className="space-y-2">
                  <Label htmlFor="name">{tj.name} *</Label>
                  <Input
                    id="name"
                    value={values.name}
                    maxLength={100}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    placeholder={tj.namePlaceholder}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{tj.email} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={values.email}
                    maxLength={255}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    placeholder={tj.emailPlaceholder}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">{tj.languages} *</Label>
                  <Input
                    id="languages"
                    value={values.languages}
                    maxLength={200}
                    onChange={(e) => setValues((v) => ({ ...v, languages: e.target.value }))}
                    placeholder={tj.languagesPlaceholder}
                  />
                  {errors.languages && <p className="text-sm text-destructive">{errors.languages}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="teachingFormat">{tj.format} <span className="text-muted-foreground">{tj.optional}</span></Label>
                    <select
                      id="teachingFormat"
                      value={values.teachingFormat ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, teachingFormat: e.target.value || undefined }))}
                      className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">{tj.select}</option>
                      {TEACHING_FORMATS.map((format, index) => (
                        <option key={format} value={format}>{tj.formats[index] ?? format}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentCount">{tj.students} <span className="text-muted-foreground">{tj.optional}</span></Label>
                    <select
                      id="studentCount"
                      value={values.studentCount ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, studentCount: e.target.value || undefined }))}
                      className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">{tj.select}</option>
                      {STUDENT_COUNTS.map((count) => (
                        <option key={count} value={count}>{count}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full rounded-lg" disabled={loading}>
                  {loading ? <><Loader2 className="animate-spin" /> {tj.submitting}</> : tj.submit}
                </Button>
              </form>
            </>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card/60 text-center">
              <div className="border-b border-border bg-primary/10 px-6 py-8 md:px-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-6 w-6" />
                </div>
              <h1 className="font-display text-3xl font-semibold md:text-4xl">{tj.successTitle}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{tj.successText}</p>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid gap-3 text-start sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <Gift className="mt-0.5 h-5 w-5 text-primary" />
                  <p className="text-sm">{tj.studentsGetA}<strong>{tj.studentsGetB}</strong>.</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <InfinityIcon className="mt-0.5 h-5 w-5 text-primary" />
                  <p className="text-sm">{tj.youGetA}<strong>{tj.youGetB}</strong>.</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border-2 border-primary/40 bg-background/70 p-4 text-start md:p-5">
                  <div className="flex items-center gap-2 text-primary">
                    <Bookmark className="h-5 w-5" />
                    <p className="font-semibold">{tj.saveTitle}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{tj.saveText}</p>
                  <code dir="ltr" className="mt-4 block overflow-x-auto rounded-lg border border-border bg-background px-4 py-3 text-sm">
                    {link}
                  </code>
                  <Button onClick={copyLink} size="lg" className="mt-3 w-full rounded-lg">
                    {copied ? <><Check /> {tj.copied}</> : <><Copy /> {tj.copy}</>}
                  </Button>
                  <p className="mt-3 text-center text-sm text-muted-foreground">
                    {tj.codeNoteA}<strong>{code}</strong>{tj.codeNoteB}
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-6 text-start">
                  <p className="font-medium">{tj.messageLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{tj.messageHint}</p>
                  <textarea
                    readOnly
                    dir="ltr"
                    rows={5}
                    value={studentMessage}
                    className="mt-3 w-full resize-none rounded-lg border border-border bg-background/70 px-4 py-3 text-sm focus:outline-none"
                  />
                  <Button onClick={copyMessage} variant="secondary" className="mt-3 w-full rounded-lg sm:w-auto">
                    {copiedMessage ? <><Check /> {tj.copied}</> : <><Copy /> {tj.copyMessage}</>}
                  </Button>
                </div>

                {partnerCode && (
                  <div className="tpp-premium-code mt-6 rounded-xl border-2 bg-background/70 p-4 text-start md:p-5">
                    <div className="flex items-center gap-2 tpp-amber-text">
                      <Key className="h-5 w-5" />
                      <p className="font-semibold">{tj.premiumCodeTitle}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{tj.premiumCodeBody}</p>
                    <code dir="ltr" className="mt-4 block overflow-x-auto rounded-lg border border-border bg-background px-4 py-3 text-center font-mono text-2xl font-semibold tracking-wider text-foreground">
                      {partnerCode}
                    </code>
                    <Button onClick={copyPartnerCode} size="lg" variant="secondary" className="mt-3 w-full rounded-lg">
                      {copiedPartnerCode ? <><Check /> {tj.copied}</> : <><Copy /> {tj.copyCode}</>}
                    </Button>
                    <div className="tpp-warning-note mt-3 flex items-start gap-2 rounded-lg border p-3 text-sm">
                      <Crown className="tpp-amber-text mt-0.5 h-4 w-4 shrink-0" />
                      <p>{tj.premiumCodeWarning}</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  {partnerCode ? (
                    <>
                      <Button variant="outline" className="rounded-lg" onClick={openIphoneStore}>
                        <ExternalLink /> {tj.openIphone}
                      </Button>
                      <Button asChild variant="outline" className="rounded-lg">
                        <a href={androidHref}>
                          <ExternalLink /> {tj.openAndroid}
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="rounded-lg">
                        <a href={IPHONE_URL}>
                          <ExternalLink /> {tj.openIphone}
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="rounded-lg">
                        <a href={ANDROID_URL}>
                          <ExternalLink /> {tj.openAndroid}
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <YLCFooter />
    </div>
  );
};

const TeacherPartnerJoin = () => (
  <YlcLangProvider>
    <TeacherPartnerJoinContent />
  </YlcLangProvider>
);

export default TeacherPartnerJoin;
