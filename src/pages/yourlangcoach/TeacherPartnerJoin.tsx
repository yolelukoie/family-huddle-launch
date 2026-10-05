import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, ExternalLink, Gift, Infinity as InfinityIcon, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import LanguageSwitcher from "@/components/yourlangcoach/LanguageSwitcher";
import ylcLogo from "@/assets/yourlangcoach-logo.png";
import { IPHONE_URL, ANDROID_URL, SUPPORT_EMAIL } from "@/lib/yourlangcoach/content";
import { YlcLangProvider, useYlcLang } from "@/lib/yourlangcoach/i18n";
import {
  STUDENT_COUNTS,
  TEACHING_FORMATS,
  referralUrl,
  SignupNetworkError,
  buildSupportMailto,
  submitTeacherSignup,
  teacherSignupSchema,
  type TeacherSignupValues,
} from "@/lib/yourlangcoach/teacherPartner";
import { iosCodeMarker, isIosDevice } from "@/lib/yourlangcoach/iosCodeMarker";

const emptyForm: TeacherSignupValues = {
  name: "",
  email: "",
  languages: "",
  teachingFormat: undefined,
  studentCount: undefined,
};

const STEP1_KEY = "ylc-tpp-step1-done";

const SUCCESS = {
  en: {
    title: "You're in the program 🎉",
    subtitle: "Two quick steps and you're all set.",
    s1Title: "Claim your Premium — forever",
    s1Body: "It's already yours. Open the app and enter the code once.",
    copyCode: "Copy code",
    hint: "In the app: Settings → Teacher code",
    appStore: "Open in App Store",
    googlePlay: "Open in Google Play",
    caution: "The code is single-use and just for you.",
    s2Title: "Invite your students — once you've tried it",
    s2Body: "Every student who joins via your link gets a month of Premium free.",
    copyLink: "Copy link",
    orCode: "Or they can enter the code {CODE} right in the app.",
    accordion: "Ready-made message for students",
    copyMessage: "Copy message",
    message: "Hi! I'm inviting you to practice with me on YourLangCoach. Use my link — you'll get 30 days of Premium for free: {LINK}\n\nIf the app asks for a teacher code, enter: {CODE}",
  },
  ru: {
    title: "Вы в программе 🎉",
    subtitle: "Два коротких шага — и всё готово.",
    s1Title: "Заберите свой Premium — навсегда",
    s1Body: "Он уже ваш. Откройте приложение и введите код один раз.",
    copyCode: "Скопировать код",
    hint: "В приложении: Настройки → Код преподавателя",
    appStore: "Открыть в App Store",
    googlePlay: "Открыть в Google Play",
    caution: "Код одноразовый и только для вас.",
    s2Title: "Пригласите учеников — когда сами попробуете",
    s2Body: "Каждый ученик по вашей ссылке получает месяц Premium бесплатно.",
    copyLink: "Скопировать ссылку",
    orCode: "Или пусть введут код {CODE} прямо в приложении.",
    accordion: "Готовое сообщение для учеников",
    copyMessage: "Скопировать сообщение",
    message: "Привет! Приглашаю тебя заниматься со мной в YourLangCoach. По моей ссылке — 30 дней Premium бесплатно: {LINK}\n\nЕсли приложение попросит код преподавателя, введи: {CODE}",
  },
  he: {
    title: "את/ה בתוכנית 🎉",
    subtitle: "שני צעדים קצרים — וזהו.",
    s1Title: "קבלו את ה‑Premium שלכם — לתמיד",
    s1Body: "הוא כבר שלכם. פתחו את האפליקציה והזינו את הקוד פעם אחת.",
    copyCode: "העתקת קוד",
    hint: "באפליקציה: הגדרות ← קוד מורה",
    appStore: "פתיחה ב‑App Store",
    googlePlay: "פתיחה ב‑Google Play",
    caution: "הקוד חד־פעמי ואישי עבורכם בלבד.",
    s2Title: "הזמינו תלמידים — אחרי שתנסו בעצמכם",
    s2Body: "כל תלמיד שמצטרף דרך הקישור שלכם מקבל חודש Premium בחינם.",
    copyLink: "העתקת קישור",
    orCode: "או שיזינו את הקוד {CODE} ישירות באפליקציה.",
    accordion: "הודעה מוכנה לתלמידים",
    copyMessage: "העתקת ההודעה",
    message: "היי! אני מזמין/ה אותך לתרגל איתי ב‑YourLangCoach. דרך הקישור שלי תקבל/י 30 ימי Premium בחינם: {LINK}\n\nאם האפליקציה מבקשת קוד מורה, הזן/י: {CODE}",
  },
} as const;

const TeacherPartnerJoinContent = () => {
  const { t, dir, lang } = useYlcLang();
  const tj = t.join;
  const s = SUCCESS[(lang as keyof typeof SUCCESS)] ?? SUCCESS.en;
  const [values, setValues] = useState<TeacherSignupValues>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [networkFailed, setNetworkFailed] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [partnerCode, setPartnerCode] = useState<string | null>(null);
  const [copiedPartnerCode, setCopiedPartnerCode] = useState(false);
  const [step1Done, setStep1Done] = useState(() => {
    try { return localStorage.getItem(STEP1_KEY) === "1"; } catch { return false; }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
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
    setNetworkFailed(false);
    setRetrying(false);
    setLoading(true);
    try {
      const result = await submitTeacherSignup(parsed.data, { onRetry: () => setRetrying(true) });
      setCode(result.referralCode);
      setPartnerCode(result.partnerCode ?? null);
      if (result.alreadyRegistered) {
        toast.info(tj.alreadyRegistered);
      }
    } catch (error) {
      if (error instanceof SignupNetworkError) {
        setNetworkFailed(true);
        return;
      }
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

  const supportMailto = buildSupportMailto(values, tj.mailSubject, tj.mailIntro, {
    name: tj.mailName,
    email: tj.mailEmail,
    languages: tj.mailLanguages,
    format: tj.mailFormat,
    students: tj.mailStudents,
  });

  const studentMessage = code ? s.message.replace("{LINK}", referralUrl(code)).replace("{CODE}", code) : "";

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

  const markStep1 = () => {
    setStep1Done(true);
    try { localStorage.setItem(STEP1_KEY, "1"); } catch { /* ignore */ }
  };

  const androidHref = partnerCode
    ? `${ANDROID_URL}&referrer=teacher%3D${encodeURIComponent(partnerCode)}`
    : ANDROID_URL;

  const openAndroidStore = () => {
    markStep1();
    if (partnerCode) {
      // Fallback for the case where Google Play does not hand the install referrer to the app:
      // the plain code is then ready to paste into the app's code field. Not awaited, so the
      // navigation below stays inside the tap.
      navigator.clipboard?.writeText(partnerCode).then(
        () => toast.success(tj.copyCodeSuccess),
        () => undefined,
      );
    }
    window.location.href = androidHref;
  };

  const openIphoneStore = async () => {
    markStep1();
    if (partnerCode) {
      try {
        // iPhone/iPad: the marker the app picks up on first launch. Any other device: the plain
        // code, because the marker is not something a person can paste into the app.
        await navigator.clipboard.writeText(isIosDevice() ? iosCodeMarker(partnerCode) : partnerCode);
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

                {networkFailed && (
                  <div role="alert" className="space-y-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-start">
                    <p className="font-semibold text-destructive">{tj.networkErrorTitle}</p>
                    <p className="text-sm text-muted-foreground">{tj.networkErrorBody}</p>
                    <Button asChild variant="outline" className="rounded-lg">
                      <a href={supportMailto}><Mail /> {tj.writeToUs}</a>
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {tj.noMailApp}{" "}
                      <span dir="ltr" className="inline-block select-all font-medium text-foreground">{SUPPORT_EMAIL}</span>
                    </p>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full rounded-lg" disabled={loading}>
                  {loading ? <><Loader2 className="animate-spin" /> {tj.submitting}</> : tj.submit}
                </Button>
                {loading && retrying && (
                  <p role="status" className="text-center text-sm text-muted-foreground">{tj.slowConnection}</p>
                )}
              </form>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h1 className="font-display text-3xl font-semibold md:text-4xl">{s.title}</h1>
                <p className="mt-2 text-base text-muted-foreground">{s.subtitle}</p>
                <div className="mt-4 grid gap-2 text-start sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-xs text-muted-foreground">
                    <Gift className="h-4 w-4 shrink-0 text-primary/80" />
                    <span>{tj.studentsGetA}{tj.studentsGetB}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-xs text-muted-foreground">
                    <InfinityIcon className="h-4 w-4 shrink-0 text-primary/80" />
                    <span>{tj.youGetA}{tj.youGetB}</span>
                  </div>
                </div>
              </div>

              {/* STEP 1 */}
              <section className="rounded-2xl border-2 border-primary bg-card/70 p-5 text-start md:p-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    1
                    {step1Done && (
                      <span className="absolute -end-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-background">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </span>
                  <h2 className="font-display text-xl font-semibold">{s.s1Title}</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.s1Body}</p>
                {partnerCode && (
                  <>
                    <div className="mt-4 flex gap-2">
                      <code dir="ltr" className="flex-1 overflow-x-auto rounded-lg border border-border bg-background px-4 py-2.5 text-center font-mono text-lg font-semibold tracking-wider">
                        {partnerCode}
                      </code>
                      <Button onClick={copyPartnerCode} variant="outline" className="h-auto rounded-lg">
                        {copiedPartnerCode ? <><Check /> {tj.copied}</> : <><Copy /> {s.copyCode}</>}
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{s.hint}</p>
                  </>
                )}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Button size="lg" className="w-full rounded-lg" onClick={openIphoneStore}>
                    <ExternalLink /> {s.appStore}
                  </Button>
                  <Button size="lg" className="w-full rounded-lg" onClick={openAndroidStore}>
                    <ExternalLink /> {s.googlePlay}
                  </Button>
                </div>
                {partnerCode && <p className="mt-3 text-sm text-muted-foreground">{s.caution}</p>}
              </section>

              {/* STEP 2 */}
              <section className={`rounded-2xl border bg-card/40 p-5 text-start transition-opacity md:p-6 ${step1Done ? "border-border opacity-100" : "border-border/50 opacity-60"}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-semibold">2</span>
                  <h2 className="font-display text-lg font-semibold">{s.s2Title}</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.s2Body}</p>
                <div className="mt-4 flex gap-2">
                  <code dir="ltr" className="flex-1 overflow-x-auto whitespace-nowrap rounded-lg border border-border bg-background px-3 py-2.5 text-sm">{link}</code>
                  <Button onClick={copyLink} variant="secondary" className="h-auto rounded-lg">
                    {copied ? <><Check /> {tj.copied}</> : <><Copy /> {s.copyLink}</>}
                  </Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.orCode.replace("{CODE}", code)}</p>
                <details className="mt-4 rounded-lg border border-border bg-background/40 p-3" dir={dir}>
                  <summary className="cursor-pointer text-sm font-medium">{s.accordion}</summary>
                  <textarea
                    readOnly
                    dir={dir}
                    rows={5}
                    value={studentMessage}
                    className="mt-3 w-full resize-none rounded-lg border border-border bg-background/70 px-3 py-2 text-sm focus:outline-none"
                  />
                  <Button onClick={copyMessage} variant="secondary" size="sm" className="mt-2 rounded-lg">
                    {copiedMessage ? <><Check /> {tj.copied}</> : <><Copy /> {s.copyMessage}</>}
                  </Button>
                </details>
              </section>
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
