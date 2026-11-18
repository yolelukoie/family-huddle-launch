import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Apple, Check, Copy, Loader2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import LanguageSwitcher from "@/components/yourlangcoach/LanguageSwitcher";
import ThemeToggle from "@/components/yourlangcoach/ThemeToggle";
import { YlcLangProvider, useYlcLang } from "@/lib/yourlangcoach/i18n";
import ylcLogo from "@/assets/yuston-icon.png";
import { ylcSupabase } from "@/integrations/supabase/ylc-client";
import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";
import { iosCodeMarker, isIosDevice } from "@/lib/yourlangcoach/iosCodeMarker";


const TeacherStudentReferralContent = () => {
  const { t, dir } = useYlcLang();
  const tr = t.invite;
  const { code = "" } = useParams();
  const cleanCode = code.trim().toUpperCase();
  const androidHref = `${ANDROID_URL}&referrer=teacher%3D${cleanCode}`;
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = tr.studentDocTitle;
  }, [tr.studentDocTitle]);

  useEffect(() => {
    if (!cleanCode) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await ylcSupabase.rpc("get_teacher_by_code", { _code: cleanCode });
        const row = Array.isArray(data) ? data[0] : data;
        if (!cancelled && row?.first_name) setTeacherName(row.first_name as string);
      } catch {
        // invalid/unknown code — fall back to the generic headline
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cleanCode]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — code is still visible on screen
    }
  };

  const trackClick = (platform: "android" | "ios") => {
    // Fire-and-forget; never block navigation.
    ylcSupabase.rpc("log_teacher_link_click", { _code: cleanCode, _platform: platform }).then(
      () => undefined,
      () => undefined,
    );
  };

  const handleIosClick = () => {
    trackClick("ios");
    // Best-effort clipboard handoff so the code survives the App Store trip. iOS only: on any other
    // device the marker would replace a code the visitor copied with "Copy code".
    if (isIosDevice()) {
      navigator.clipboard?.writeText(iosCodeMarker(cleanCode)).catch(() => undefined);
    }
  };

  const headline = teacherName
    ? // Isolate the name (FSI…PDI): a Latin name inside a Hebrew sentence must not reorder its punctuation.
      tr.studentTitleNamed.replace("{NAME}", `\u2068${teacherName}\u2069`)
    : tr.studentTitle;

  return (
    <div dir={dir} className="ylc-theme tpp-theme min-h-screen bg-background text-foreground">
      <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/yourlangcoach" className="flex items-center gap-2.5">
            <img src={ylcLogo} alt="Yuston logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="font-display text-sm font-semibold sm:text-base">Yuston</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="container px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto w-full max-w-2xl text-center">
          <p className="ylc-eyebrow">{tr.eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-5xl">
            {loading ? <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" /> : headline}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {tr.studentText}
          </p>

          <div className="mx-auto mt-8 w-fit max-w-full rounded-2xl border border-border bg-card/60 px-6 py-6 sm:px-10">
            <p className="text-sm text-muted-foreground">{tr.codeLabel}</p>
            <p dir="ltr" className="mt-1 break-all font-display text-3xl font-semibold tracking-[0.2em] text-primary sm:text-4xl">
              {cleanCode}
            </p>
            <Button onClick={copyCode} variant="secondary" className="mt-4 rounded-lg">
              {copied ? <><Check /> {tr.copied}</> : <><Copy /> {tr.copyCode}</>}
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              {tr.codeHint}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="rounded-lg">
              <a href={androidHref} target="_blank" rel="noopener noreferrer" onClick={() => trackClick("android")}>
                <Smartphone /> {tr.googlePlay}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg">
              <a href={IPHONE_URL} target="_blank" rel="noopener noreferrer" onClick={handleIosClick}>
                <Apple /> {tr.appStore}
              </a>
            </Button>
          </div>
        </div>
      </main>

      <YLCFooter />
    </div>
  );
};

const TeacherStudentReferral = () => (
  <YlcLangProvider>
    <TeacherStudentReferralContent />
  </YlcLangProvider>
);

export default TeacherStudentReferral;
