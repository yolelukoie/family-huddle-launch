import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, ExternalLink, Gift, Infinity as InfinityIcon, Loader2, MessageCircle } from "lucide-react";
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

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${tj.whatsappText} ${link}`)}`;

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
                    <Label>{tj.format} <span className="text-muted-foreground">{tj.optional}</span></Label>
                    <Select
                      value={values.teachingFormat}
                      onValueChange={(value) => setValues((v) => ({ ...v, teachingFormat: value }))}
                    >
                      <SelectTrigger><SelectValue placeholder={tj.select} /></SelectTrigger>
                      <SelectContent>
                        {TEACHING_FORMATS.map((format, index) => (
                          <SelectItem key={format} value={format}>{tj.formats[index] ?? format}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{tj.students} <span className="text-muted-foreground">{tj.optional}</span></Label>
                    <Select
                      value={values.studentCount}
                      onValueChange={(value) => setValues((v) => ({ ...v, studentCount: value }))}
                    >
                      <SelectTrigger><SelectValue placeholder={tj.select} /></SelectTrigger>
                      <SelectContent>
                        {STUDENT_COUNTS.map((count) => (
                          <SelectItem key={count} value={count}>{count}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full rounded-lg" disabled={loading}>
                  {loading ? <><Loader2 className="animate-spin" /> {tj.submitting}</> : tj.submit}
                </Button>
              </form>
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-card/60 p-6 text-center md:p-10">
              <h1 className="font-display text-3xl font-semibold md:text-4xl">{tj.successTitle}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{tj.successText}</p>

              <div className="mt-8 grid gap-3 text-start sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <Gift className="mt-0.5 h-5 w-5 text-primary" />
                  <p className="text-sm">{tj.studentsGetA}<strong>{tj.studentsGetB}</strong>.</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <InfinityIcon className="mt-0.5 h-5 w-5 text-primary" />
                  <p className="text-sm">{tj.youGetA}<strong>{tj.youGetB}</strong>.</p>
                </div>
              </div>

              <div className="mt-8 text-start">
                <p className="text-sm font-medium text-muted-foreground">{tj.linkLabel}</p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <code dir="ltr" className="flex-1 overflow-x-auto rounded-lg border border-border bg-background/70 px-4 py-3 text-sm">
                    {link}
                  </code>
                  <Button onClick={copyLink} size="lg" className="rounded-lg">
                    {copied ? <><Check /> {tj.copied}</> : <><Copy /> {tj.copy}</>}
                  </Button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {tj.codeNoteA}<strong>{code}</strong>{tj.codeNoteB}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild variant="secondary" className="rounded-lg">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> {tj.whatsapp}
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-lg">
                  <a href={IPHONE_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink /> {tj.openIphone}
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-lg">
                  <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink /> {tj.openAndroid}
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

const TeacherPartnerJoin = () => (
  <YlcLangProvider>
    <TeacherPartnerJoinContent />
  </YlcLangProvider>
);

export default TeacherPartnerJoin;
