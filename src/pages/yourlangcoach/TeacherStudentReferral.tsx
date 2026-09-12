import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Apple, Check, Copy, Loader2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import ylcLogo from "@/assets/yourlangcoach-logo.png";
import { ylcSupabase } from "@/integrations/supabase/ylc-client";
import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";


const TeacherStudentReferral = () => {
  const { code = "" } = useParams();
  const cleanCode = code.trim().toUpperCase();
  const androidHref = `${ANDROID_URL}&referrer=teacher%3D${cleanCode}`;
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Your teacher invited you | YourLangCoach";
  }, []);

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
    // Best-effort clipboard handoff so the code survives the App Store trip.
    navigator.clipboard.writeText(`YLC-T:${cleanCode}`).catch(() => undefined);
  };

  const headline = teacherName
    ? `${teacherName} invites you to YourLangCoach — your first 30 days of Premium are free.`
    : "Your teacher invites you to YourLangCoach — 30 days of Premium free.";

  return (
    <div className="ylc-theme tpp-theme min-h-screen bg-background text-foreground">
      <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Link to="/yourlangcoach" className="flex items-center gap-2.5">
            <img src={ylcLogo} alt="YourLangCoach logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="font-display text-sm font-semibold sm:text-base">YourLangCoach</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto w-full max-w-2xl text-center">
          <p className="ylc-eyebrow">Invited by your teacher</p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-5xl">
            {loading ? <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" /> : headline}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Download the app and keep practicing between lessons — words, materials and AI practice, all in one place.
          </p>

          <div className="mx-auto mt-8 w-fit max-w-full rounded-2xl border border-border bg-card/60 px-6 py-6 sm:px-10">
            <p className="text-sm text-muted-foreground">Your teacher code</p>
            <p className="mt-1 break-all font-display text-3xl font-semibold tracking-[0.2em] text-primary sm:text-4xl">
              {cleanCode}
            </p>
            <Button onClick={copyCode} variant="secondary" className="mt-4 rounded-lg">
              {copied ? <><Check /> Copied</> : <><Copy /> Copy code</>}
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Enter this code when you sign up in the app if it isn't applied automatically.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="rounded-lg">
              <a href={androidHref} target="_blank" rel="noopener noreferrer" onClick={() => trackClick("android")}>
                <Smartphone /> Get it on Google Play
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg">
              <a href={IPHONE_URL} target="_blank" rel="noopener noreferrer" onClick={handleIosClick}>
                <Apple /> Download on the App Store
              </a>
            </Button>
          </div>
        </div>
      </main>

      <YLCFooter />
    </div>
  );
};

export default TeacherStudentReferral;
