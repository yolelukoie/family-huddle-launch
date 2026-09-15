import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown, ArrowRight, BookOpen, Brain, Check, CircleDot, FileText, GraduationCap,
  Languages, Lightbulb, MessageCircleMore, Mic, NotebookTabs, RefreshCw, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import LanguageSwitcher from "@/components/yourlangcoach/LanguageSwitcher";
import ylcLogo from "@/assets/yourlangcoach-logo.png";
import workbookGrid from "@/assets/ylc-workbook-grid.jpeg";
import workbookEditor from "@/assets/ylc-workbook-editor.jpeg";
import reviewDashboard from "@/assets/ylc-review-dashboard.jpeg";
import reviewSettings from "@/assets/ylc-review-settings.jpeg";
import { SUPPORT_EMAIL } from "@/lib/yourlangcoach/content";
import { YlcLangProvider, useYlcLang } from "@/lib/yourlangcoach/i18n";

const SIGNUP_URL = "/yourlangcoach/tpp/join";
const stepIcons = [CircleDot, RefreshCw, MessageCircleMore, NotebookTabs];
const benefitIcons = [RefreshCw, Lightbulb, ArrowRight, GraduationCap, Sparkles, BookOpen];

const SectionHeading = ({ eyebrow, title, intro, centered = false }: { eyebrow: string; title: string; intro?: string; centered?: boolean }) => (
  <div className={`tpp-section-heading max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
    <p className="ylc-eyebrow">{eyebrow}</p>
    <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">{title}</h2>
    {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>}
  </div>
);

const PartnerCTA = ({ className = "", label, compact = false }: { className?: string; label?: string; compact?: boolean }) => {
  const { t } = useYlcLang();
  const text = label ?? t.tpp.cta;
  return (
    <Button asChild size="lg" className={`rounded-lg px-6 ${className}`}>
      <Link to={SIGNUP_URL}>
        {compact ? (
          <>
            <span className="sm:hidden">{t.tpp.ctaMobile}</span>
            <span className="hidden sm:inline">{text}</span>
          </>
        ) : text}
        <ArrowRight className="rtl:rotate-180" />
      </Link>
    </Button>
  );
};


const Flow = ({ items, quiet = false }: { items: string[]; quiet?: boolean }) => (
  <div className="tpp-inline-flow">
    {items.map((item, index) => (
      <div key={`${item}-${index}`} className={`tpp-inline-step ${quiet ? "tpp-inline-step-quiet" : ""}`}>
        <span>{item}</span>
        {index < items.length - 1 && <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-primary rtl:rotate-180" />}
      </div>
    ))}
  </div>
);

const TeacherPartnerContent = () => {
  const { t, dir } = useYlcLang();
  const tp = t.tpp;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div dir={dir} className="ylc-theme tpp-theme min-h-screen bg-background text-foreground">
      <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-1.5 px-3 sm:gap-3 sm:px-6">
          <Link to="/yourlangcoach" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <img src={ylcLogo} alt="YourLangCoach logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="truncate font-display text-sm font-semibold sm:text-base">YourLangCoach</span>
            <span className="hidden border-s border-border ps-3 text-xs text-muted-foreground lg:inline">{tp.headerTag}</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Teacher Partner page">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">{tp.navHow}</a>
            <a href="#teacher-benefits" className="transition-colors hover:text-foreground">{tp.navBenefits}</a>
            <a href="#faq" className="transition-colors hover:text-foreground">{tp.navFaq}</a>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2"><LanguageSwitcher /><PartnerCTA compact className="h-9 px-2 text-xs sm:px-4 sm:text-sm" /></div>
        </div>
      </header>



      <main>
        <section className="tpp-hero overflow-hidden border-b border-border">
          <div className="container px-4 pb-14 pt-14 sm:px-6 md:pb-20 md:pt-20">
            <div className="mx-auto max-w-5xl text-center">
              <p className="ylc-eyebrow">{tp.heroEyebrow}</p>
              <h1 className="mx-auto mt-5 max-w-5xl text-balance font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-7xl">{tp.heroTitle}</h1>
              <p className="mx-auto mt-7 max-w-3xl text-balance text-xl leading-relaxed text-foreground md:text-2xl">{tp.heroText}</p>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                {tp.heroSupport.split("{{anyLanguage}}").map((part, i, arr) => (
                  <span key={i}>{part}{i < arr.length - 1 && <span className="font-semibold text-primary">{tp.anyLanguage}</span>}</span>
                ))}
              </p>
              <p className="mx-auto mt-7 max-w-4xl font-display text-lg font-semibold text-primary md:text-2xl">{tp.heroPromise}</p>
              <div className="mx-auto mt-7 grid max-w-2xl gap-2 text-sm sm:grid-cols-2">
                <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3">{tp.teacherGift}</p>
                <p className="rounded-lg border border-border bg-card px-4 py-3">{tp.studentGift}</p>
              </div>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <PartnerCTA label={tp.heroCta} />
                <Button asChild variant="outline" size="lg" className="rounded-lg"><a href="#how-it-works">{tp.seeHow}<ArrowDown /></a></Button>
              </div>
            </div>
            <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-x-5 gap-y-3 border-y border-border py-5 text-sm">
              {tp.offerStrip.map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow={tp.differenceEyebrow} title={tp.differenceTitle} intro={tp.differenceIntro} centered />
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <article className="tpp-comparison tpp-comparison-static">
                <p className="font-display text-lg font-semibold">{tp.summaryTitle}</p>
                <blockquote className="mt-4 text-2xl text-muted-foreground">“{tp.summaryQuote}”</blockquote>
                <div className="mt-8"><Flow items={tp.summaryFlow} quiet /></div>
              </article>
              <article className="tpp-comparison tpp-comparison-active">
                <p className="font-display text-lg font-semibold text-primary">{tp.systemTitle}</p>
                <blockquote className="mt-4 text-2xl">“{tp.systemQuote}”</blockquote>
                <div className="mt-8"><Flow items={tp.systemFlow} /></div>
              </article>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow={tp.loopEyebrow} title={tp.loopTitle} intro={tp.loopIntro} centered />
            <div className="mx-auto mt-12 grid max-w-5xl auto-rows-min gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {tp.loopLabels.map((label, index) => { const Icon = stepIcons[index]; return <div key={label} className="flex flex-col bg-card p-5"><span className="text-sm text-primary">0{index + 1}</span><Icon className="mt-3 h-6 w-6 text-primary" /><p className="mt-2 font-display text-lg font-semibold">{label}</p></div>; })}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div><SectionHeading eyebrow={tp.captureEyebrow} title={tp.captureTitle} intro={tp.captureIntro} />
                <div className="mt-8"><Flow items={tp.captureFlow} /></div>
                <p className="mt-7 leading-relaxed text-muted-foreground">{tp.captureNote}</p>
                <p className="mt-5 border-s-2 border-primary ps-5 font-medium">{tp.captureTeacher}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-6"><Mic className="h-6 w-6 text-primary" /><ul className="mt-5 space-y-4">{tp.captureMethods.map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul></div>
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-6"><Sparkles className="h-6 w-6 text-primary" /><h3 className="mt-5 font-display font-semibold">{tp.captureCreatesTitle}</h3><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{tp.captureCreates.map((item) => <li key={item}>— {item}</li>)}</ul></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div><SectionHeading eyebrow={tp.srEyebrow} title={tp.srTitle} intro={tp.srIntro} /><p className="mt-7 rounded-lg border-s-2 border-primary bg-primary/5 p-5 font-medium">{tp.srPrinciple}</p><p className="mt-5 text-muted-foreground">{tp.srTeacher}</p></div>
              <div className="tpp-product-stage"><figure className="tpp-phone tpp-phone-back"><img src={reviewSettings} alt="Spaced repetition settings" loading="lazy" /></figure><figure className="tpp-phone tpp-phone-front"><img src={reviewDashboard} alt="Vocabulary review dashboard" loading="lazy" /></figure></div>
            </div>
            <div className="tpp-review-flow mt-16"><div className="tpp-review-track">{tp.srSteps.map((step, index) => <div key={`${step.label}-${index}`} className="tpp-review-step"><span className="tpp-review-dot">{index + 1}</span><p className="mt-4 font-display font-semibold">{step.label}</p><p className="mt-1 text-xs text-muted-foreground">{step.time}</p></div>)}</div><div className="tpp-memory-destination"><Brain className="h-6 w-6" /><div><p className="font-display font-semibold">{tp.srDestination}</p><p className="mt-1 text-sm text-muted-foreground">{tp.srCaution}</p></div></div></div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <div><SectionHeading eyebrow={tp.activeEyebrow} title={tp.activeTitle} intro={tp.activeIntro} /><p className="mt-8 font-display text-2xl font-semibold text-primary md:text-3xl">{tp.activeCallout}</p><div className="mt-7"><Flow items={tp.activeFlow} /></div></div>
              <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">{tp.activeItems.map((item) => <div key={item} className="flex gap-3 bg-card p-5 text-sm"><Check className="h-5 w-5 shrink-0 text-primary" />{item}</div>)}</div>
            </div>
            <div className="tpp-discovery mt-14 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start"><div className="ylc-icon-wrap"><Lightbulb /></div><div><h3 className="font-display text-2xl font-semibold">{tp.discoveryTitle}</h3><p className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">{tp.discoveryText}</p><p className="mt-4 font-medium text-foreground">{tp.discoveryNote}</p></div></div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div><SectionHeading eyebrow={tp.wbEyebrow} title={tp.wbTitle} intro={tp.wbIntro} /><div className="mt-7 flex flex-wrap gap-2">{tp.wbMaterials.map((item) => <span key={item} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs">{item}</span>)}</div><ul className="mt-7 space-y-4">{tp.wbExamples.map((item) => <li key={item} className="flex gap-3 text-sm text-muted-foreground"><FileText className="h-5 w-5 shrink-0 text-primary" />{item}</li>)}</ul><p className="mt-7 border-s-2 border-primary ps-5 font-medium">{tp.wbDistinction}</p></div>
            <div className="tpp-product-stage"><figure className="tpp-phone tpp-phone-back"><img src={workbookGrid} alt="Workbook with organized learning materials" loading="lazy" /></figure><figure className="tpp-phone tpp-phone-front"><img src={workbookEditor} alt="Editable Workbook entry" loading="lazy" /></figure></div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6"><SectionHeading eyebrow={tp.systemEyebrow} title={tp.systemDiagramTitle} centered />
            <div className="tpp-system-map mx-auto mt-12 max-w-6xl">
              <div className="tpp-system-phase"><p className="ylc-eyebrow">{tp.duringTitle}</p>{tp.duringSteps.map((item, i) => <div key={item} className="tpp-system-row"><span>{i + 1}</span><p>{item}</p></div>)}</div>
              <ArrowRight className="tpp-system-arrow rtl:rotate-180" />
              <div className="tpp-system-phase tpp-system-phase-active"><p className="ylc-eyebrow">{tp.afterTitle}</p>{tp.afterSteps.map((item, i) => <div key={item} className="tpp-system-row"><span>{i + 1}</span><p>{item}</p></div>)}</div>
              <ArrowRight className="tpp-system-arrow rtl:rotate-180" />
              <div className="tpp-system-phase"><p className="ylc-eyebrow">{tp.nextTitle}</p><GraduationCap className="mt-7 h-8 w-8 text-primary" /><p className="mt-4 leading-relaxed text-muted-foreground">{tp.nextText}</p></div>
            </div>
            <p className="mx-auto mt-10 max-w-4xl border-t border-border pt-8 text-center text-lg">{tp.systemRole}</p>
          </div>
        </section>

        <section id="teacher-benefits" className="scroll-mt-20 border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6"><SectionHeading eyebrow={tp.benefitsEyebrow} title={tp.benefitsTitle} intro={tp.benefitsIntro} />
            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{tp.benefits.map((benefit, i) => { const Icon = benefitIcons[i]; return <article key={benefit.title} className="bg-card p-6"><Icon className="h-6 w-6 text-primary" /><h3 className="mt-5 font-display font-semibold">{benefit.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p></article>; })}</div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div><SectionHeading eyebrow={tp.exampleEyebrow} title={tp.exampleTitle} intro={tp.exampleIntro} /><div className="mt-7 rounded-lg border border-primary/40 bg-primary/10 p-6"><p dir="rtl" className="font-display text-5xl font-semibold">{tp.exampleWord}</p><p className="mt-2 text-sm text-muted-foreground">{tp.exampleMeaning}</p></div></div>
            <div><Flow items={tp.exampleSteps} /><p className="mt-8 text-lg leading-relaxed text-muted-foreground">{tp.exampleStory}</p><p className="mt-5 text-sm text-muted-foreground">{tp.exampleNote}</p></div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 text-center sm:px-6"><Languages className="mx-auto h-8 w-8 text-primary" /><SectionHeading eyebrow={tp.languagesEyebrow} title={tp.languagesTitle} intro={tp.languagesText} centered /><div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-3">{tp.languages.map((item) => <span key={item} className="rounded-full border border-border bg-card px-5 py-2 text-sm">{item}</span>)}</div></div>
        </section>

        <section className="tpp-offer border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div><SectionHeading eyebrow={tp.offerEyebrow} title={tp.offerTitle} intro={tp.offerText} /><div className="mt-8"><Flow items={tp.offerSteps} /></div><PartnerCTA className="mt-8" /></div>
            <div className="rounded-lg border border-primary/40 bg-card p-7 md:p-9"><div className="space-y-6"><div><p className="text-sm text-muted-foreground">{tp.offerForYou}</p><p className="mt-1 font-display text-2xl font-semibold">{tp.offerForYouValue}</p></div><div><p className="text-sm text-muted-foreground">{tp.offerForStudent}</p><p className="mt-1 font-display text-2xl font-semibold">{tp.offerForStudentValue}</p></div></div><ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm">{tp.offerList.map((item) => <li key={item} className="flex gap-3"><Check className="text-primary" />{item}</li>)}</ul></div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 border-b border-border py-20 md:py-28"><div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]"><SectionHeading eyebrow={tp.faqEyebrow} title={tp.faqTitle} /><Accordion type="single" collapsible className="border-t border-border">{tp.faqs.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger className="text-start font-display text-base hover:no-underline">{question}</AccordionTrigger><AccordionContent className="max-w-2xl leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

        <section className="py-20 text-center md:py-28"><div className="container px-4 sm:px-6"><p className="ylc-eyebrow">{tp.heroPromise}</p><h2 className="mx-auto mt-5 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">{tp.finalTitle}</h2><p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{tp.finalText}</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><PartnerCTA /><Button asChild variant="outline" size="lg" className="rounded-lg"><Link to="/yourlangcoach">{tp.finalSecondary}<ArrowRight className="rtl:rotate-180" /></Link></Button></div><a href={`mailto:${SUPPORT_EMAIL}`} className="mt-6 inline-block text-sm font-medium text-primary hover:underline">{tp.contact}</a></div></section>
      </main>
      <YLCFooter />
    </div>
  );
};

const TeacherPartnerPage = () => <YlcLangProvider><TeacherPartnerContent /></YlcLangProvider>;
export default TeacherPartnerPage;
