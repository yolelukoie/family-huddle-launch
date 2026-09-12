import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Apple, Check, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import ylcLogo from "@/assets/yourlangcoach-logo.png";
import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";

const TeacherReferral = () => {
  const { code = "" } = useParams();
  const cleanCode = code.trim().toUpperCase();

  useEffect(() => {
    document.title = "Your free month of YourLangCoach Premium";
    if (cleanCode) {
      try {
        localStorage.setItem("ylc_teacher_code", cleanCode);
      } catch {
        // storage may be unavailable in private mode
      }
    }
  }, [cleanCode]);

  const perks = [
    "1 month of Premium free",
    "Spaced repetition for everything you learn in your lessons",
    "A personal Workbook for notes, photos and PDFs",
    "AI practice while Premium is active",
  ];

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
            Your first month of Premium is on your teacher
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Keep learning between lessons — download YourLangCoach and enter your teacher code when you create your account.
          </p>

          <div className="mx-auto mt-8 w-fit rounded-2xl border border-border bg-card/60 px-8 py-6">
            <p className="text-sm text-muted-foreground">Your teacher code</p>
            <p className="mt-1 font-display text-3xl font-semibold tracking-[0.2em] text-primary">{cleanCode}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="rounded-lg">
              <a href={IPHONE_URL} target="_blank" rel="noopener noreferrer"><Apple /> Download for iPhone</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg">
              <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer"><Smartphone /> Download for Android</a>
            </Button>
          </div>

          <ul className="mx-auto mt-10 grid max-w-lg gap-3 text-left">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <YLCFooter />
    </div>
  );
};

export default TeacherReferral;
