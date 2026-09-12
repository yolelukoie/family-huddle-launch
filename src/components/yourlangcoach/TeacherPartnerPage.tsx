import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  Clock3,
  FileImage,
  FileText,
  Gift,
  GraduationCap,
  Infinity as InfinityIcon,
  Languages,
  MessageCircleMore,
  NotebookTabs,
  RefreshCw,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FamilyHuddlePromo from "@/components/yourlangcoach/FamilyHuddlePromo";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import ylcLogo from "@/assets/yourlangcoach-logo.png";
import workbookGrid from "@/assets/ylc-workbook-grid.jpeg.asset.json";
import workbookEditor from "@/assets/ylc-workbook-editor.jpeg.asset.json";
import { SUPPORT_EMAIL } from "@/lib/yourlangcoach/content";

const SIGNUP_URL = "[TEACHER_PARTNER_SIGNUP_URL]";

const continuationSteps = [
  {
    title: "Learn something new",
    text: "A student encounters a new word, phrase, grammar point, explanation or example.",
    icon: GraduationCap,
  },
  {
    title: "Save it",
    text: "Save vocabulary, examples, explanations, tutor messages, PDFs, photos, diagrams and notes.",
    icon: NotebookTabs,
  },
  {
    title: "Keep it alive",
    text: "Spaced repetition brings learning back at the right time, while optional AI can create more practice.",
    icon: RefreshCw,
  },
  {
    title: "Return prepared",
    text: "Students arrive at the next lesson with more of their previous learning still in reach.",
    icon: Brain,
  },
];

const teacherBenefits = [
  { title: "Give students a real benefit", text: "One month of Premium free.", icon: Gift },
  { title: "Keep learning going", text: "Students continue working on what you taught them.", icon: RefreshCw },
  { title: "Support vocabulary retention", text: "Spaced repetition brings important words back.", icon: Brain },
  { title: "Keep materials organized", text: "PDFs, photos, explanations, AI conversations and vocabulary stay together.", icon: BookOpen },
  { title: "Save lesson time", text: "Spend less time re-teaching forgotten vocabulary.", icon: Clock3 },
  { title: "Add an AI learning assistant", text: "Students can practice between lessons when they choose.", icon: Sparkles },
  { title: "Lifetime Premium for you", text: "Free for early Teacher Partners.", icon: InfinityIcon },
  { title: "No change to your method", text: "YourLangCoach works alongside the way you already teach.", icon: GraduationCap },
];

const useCases = [
  ["After a Hebrew lesson", "A student adds new Hebrew words and YourLangCoach schedules reviews."],
  ["After an English lesson", "A teacher shares a phrasal-verb PDF and the student uploads it to the Workbook."],
  ["During conversation practice", "The student saves useful explanations and examples."],
  ["After a grammar explanation", "The student photographs the teacher’s diagram and keeps it with their notes."],
  ["Between lessons", "The student asks the optional AI tutor to practice recently learned vocabulary."],
];

const audiences = [
  "Private tutors",
  "Small-group teachers",
  "Language schools",
  "Ulpan teachers",
  "Online teachers",
  "Conversation teachers",
  "Teachers of adults and teenagers",
  "Independent language instructors",
];

const faqs = [
  ["Do I have to pay?", "No. Teacher Partners receive Lifetime Premium for free."],
  ["How many students can I invite?", "There is no fixed limit."],
  ["Do my students have to pay?", "No. They receive one month of Premium completely free."],
  ["Do I need to change how I teach?", "No. YourLangCoach works alongside your existing teaching method."],
  ["Which languages are supported?", "YourLangCoach is designed for learning and practicing any language."],
  ["Do I need technical knowledge?", "No. You simply share your invitation link."],
  ["What happens after the free month?", "Students can continue using the free features. Premium features, including AI functionality, require a subscription."],
  ["Can I use YourLangCoach myself?", "Yes. Teacher Partners receive Lifetime Premium."],
];

const SectionHeading = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <div className="max-w-3xl mb-10 md:mb-14">
    <p className="ylc-eyebrow">{eyebrow}</p>
    <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">{title}</h2>
    {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>}
  </div>
);

const PartnerCTA = ({ className = "" }: { className?: string }) => (
  <Button asChild size="lg" className={`rounded-lg px-6 ${className}`}>
    <a href={SIGNUP_URL}>Become a Teacher Partner <ArrowRight /></a>
  </Button>
);

const TeacherPartnerPage = () => {
  return (
    <div className="ylc-theme tpp-theme min-h-screen bg-background text-foreground">
      <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/yourlangcoach" className="flex min-w-0 items-center gap-2.5">
            <img src={ylcLogo} alt="YourLangCoach logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="truncate font-display text-sm font-semibold sm:text-base">YourLangCoach</span>
            <span className="hidden border-l border-border pl-3 text-xs text-muted-foreground lg:inline">Teacher Partners</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Teacher Partner page">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#teacher-benefits" className="transition-colors hover:text-foreground">Benefits</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <PartnerCTA className="h-9 px-3 text-xs sm:px-4 sm:text-sm" />
        </div>
      </header>

      <main>
        <section className="tpp-hero overflow-hidden border-b border-border">
          <div className="container px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24">
            <div className="mx-auto max-w-5xl text-center">
              <p className="ylc-eyebrow">Teacher Partner Program · Israel</p>
              <h1 className="mx-auto mt-5 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-7xl">
                What happens in your lesson shouldn&apos;t disappear when the lesson ends.
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
                Give your students a smarter way to keep learning between lessons — with <strong className="font-semibold text-foreground">1 month of YourLangCoach Premium, completely free.</strong>
              </p>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                Turn words, explanations, examples and lesson materials into ongoing learning through spaced repetition, optional AI-powered practice and a personal Workbook.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <PartnerCTA />
                <Button asChild variant="outline" size="lg" className="rounded-lg">
                  <a href="#how-it-works">See how it works <ArrowDown /></a>
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-6xl" aria-label="Learning journey from lesson to next lesson">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
                {["Lesson", "New words & materials", "YourLangCoach", "Spaced repetition", "Better retention", "Next lesson"].map((label, index) => (
                  <div key={label} className={`tpp-flow-item relative flex min-h-24 items-center justify-center px-3 text-center text-sm font-medium ${index === 2 ? "tpp-flow-focus" : ""}`}>
                    {label}
                    {index < 5 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-primary md:block" />}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground">Teacher + Student + YourLangCoach</p>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading eyebrow="The problem" title="The lesson ends. Learning shouldn’t." />
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>Students may understand a new word during a lesson and forget it days later.</p>
              <p>Useful explanations and materials often end up scattered across WhatsApp, Telegram, screenshots, notebooks and PDFs. Students then have to rely on their own motivation to review.</p>
              <p className="border-l-2 border-primary pl-5 font-medium text-foreground">YourLangCoach keeps the learning going between lessons — alongside the teacher, never in place of them.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow="How it works" title="Learn in class. Remember between classes." />
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
              {continuationSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="bg-card p-6 md:p-7">
                    <div className="flex items-center justify-between">
                      <div className="ylc-icon-wrap"><Icon /></div>
                      <span className="font-display text-sm text-muted-foreground">0{index + 1}</span>
                    </div>
                    <h3 className="mt-7 font-display text-lg font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Workbook" title="A personal workbook that never gets lost." intro="Students can keep their learning materials in one place instead of scattering them across chats, screenshots, notebooks and PDFs." />
              <div className="grid gap-3 sm:grid-cols-2">
                {[ [FileText, "Editable texts"], [Upload, "PDFs"], [FileImage, "Photos & screenshots"], [MessageCircleMore, "Useful AI conversations"] ].map(([Icon, label]) => {
                  const ItemIcon = Icon as typeof FileText;
                  return <div key={label as string} className="flex items-center gap-3 border-b border-border py-3 text-sm"><ItemIcon className="text-primary" /><span>{label as string}</span></div>;
                })}
              </div>
              <p className="mt-7 font-display text-xl font-semibold text-foreground">If it helped your student learn, they can keep it in their Workbook.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Saved cards can be reordered, renamed and edited. YourLangCoach is more than a flashcard app: it keeps vocabulary, explanations, images and full learning materials together.</p>
            </div>
            <div className="tpp-product-stage">
              <figure className="tpp-phone tpp-phone-back">
                <img src={workbookGrid.url} alt="YourLangCoach Workbook showing organized, draggable learning cards" loading="lazy" />
              </figure>
              <figure className="tpp-phone tpp-phone-front">
                <img src={workbookEditor.url} alt="YourLangCoach editable Workbook text entry" loading="lazy" />
              </figure>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow="Spaced repetition" title="Students don’t need more motivation. They need a system." intro="YourLangCoach brings vocabulary and learning materials back at useful intervals. The app remembers when it is time to review — so the student doesn’t have to." />
            <div className="tpp-timeline grid gap-3 md:grid-cols-5">
              {["Lesson", "1st review", "2nd review", "Later review", "Long-term memory"].map((item, index) => (
                <div key={item} className="relative flex items-center gap-3 rounded-lg border border-border bg-card p-4 md:block md:text-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground md:mx-auto">{index + 1}</span>
                  <p className="font-medium md:mt-3">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
            <SectionHeading eyebrow="Optional AI practice" title="Turn what students learn into practice." intro="Students can use AI to practice the language they are actually learning. AI is an optional enhancement; the Workbook and core learning system remain useful without Premium AI." />
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {["Practice vocabulary", "Generate examples", "Explain difficult concepts", "Practice conversations", "Ask about saved materials", "Create additional practice"].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-card p-5 text-sm"><Check className="text-primary" />{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="teacher-benefits" className="scroll-mt-20 border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow="Why teachers benefit" title="A better learning experience for your students — without extra work for you." />
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {teacherBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return <article key={benefit.title} className="bg-card p-6"><Icon className="h-6 w-6 text-primary" /><h3 className="mt-5 font-display font-semibold">{benefit.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="join" className="tpp-offer border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="ylc-eyebrow">The offer</p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight md:text-6xl">Become a YourLangCoach Teacher Partner</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">We’re inviting a small group of language teachers based in Israel to become early Teacher Partners.</p>
              <p className="mt-4 max-w-xl text-muted-foreground">Share your personal student link with as many students as you teach. No complicated materials and no change to your teaching method.</p>
              <PartnerCTA className="mt-8" />
            </div>
            <div className="rounded-lg border border-primary/40 bg-card p-7 md:p-9">
              <p className="text-sm font-medium text-primary">EARLY TEACHER PARTNER</p>
              <div className="mt-6 space-y-6">
                <div><p className="text-sm text-muted-foreground">For you</p><p className="mt-1 font-display text-2xl font-semibold">Lifetime Premium — FREE</p></div>
                <div><p className="text-sm text-muted-foreground">For every student</p><p className="mt-1 font-display text-2xl font-semibold">1 month of Premium — FREE</p></div>
              </div>
              <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm">
                {["No payment", "No commitment", "No student limit", "Your personal invitation link"].map((item) => <li key={item} className="flex items-center gap-3"><Check className="text-primary" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow="Getting started" title="It takes less than a minute to get started." />
            <div className="grid gap-8 md:grid-cols-3">
              {[ ["Join", "Sign up for the Teacher Partner Program."], ["Get your personal link", "Receive a unique link for your students."], ["Share it", "Students receive one month of Premium free."] ].map(([title, text], index) => (
                <div key={title} className="border-t border-primary pt-5"><span className="text-sm text-primary">0{index + 1}</span><h3 className="mt-4 font-display text-xl font-semibold">{title}</h3><p className="mt-2 text-muted-foreground">{text}</p></div>
              ))}
            </div>
            <p className="mt-12 text-center font-display text-xl font-semibold">You teach. YourLangCoach helps your students keep learning between lessons.</p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-16 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Use cases" title="Use it your way." />
              <div className="divide-y divide-border border-y border-border">
                {useCases.map(([title, text]) => <div key={title} className="py-5"><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Who it’s for" title="For language teachers of any language." intro="Hebrew, English, Russian, Spanish, French, German, Italian — and other languages. We’re currently recruiting early Teacher Partners in Israel." />
              <div className="grid grid-cols-2 gap-3">
                {audiences.map((item) => <div key={item} className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm"><Users className="mt-0.5 text-primary" /><span>{item}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeading eyebrow="Early Partner Program" title="Be one of our first Teacher Partners." />
            <div className="grid gap-4 sm:grid-cols-2">
              {["Lifetime Premium", "Free Premium access for students", "Early access to new features", "Opportunity to influence future teacher-focused features", "A direct, optional channel for feedback"].map((item) => <div key={item} className="flex gap-3 border-b border-border py-4"><Check className="text-primary" /><span>{item}</span></div>)}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionHeading eyebrow="FAQ" title="Questions from teachers." />
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`faq-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-display text-base hover:no-underline">{question}</AccordionTrigger>
                  <AccordionContent className="max-w-2xl leading-relaxed text-muted-foreground">{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 text-center md:py-28">
          <div className="container px-4 sm:px-6">
            <Languages className="mx-auto h-9 w-9 text-primary" />
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">What happens in your lesson shouldn’t disappear when the lesson ends.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Join the YourLangCoach Teacher Partner Program and give your students one month of Premium for free.</p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <PartnerCTA />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm font-medium text-primary hover:underline">Questions? Contact us</a>
            </div>
          </div>
        </section>

        <FamilyHuddlePromo />
      </main>
      <YLCFooter />
    </div>
  );
};

export default TeacherPartnerPage;
