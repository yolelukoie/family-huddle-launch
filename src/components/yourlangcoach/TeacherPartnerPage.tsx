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
import LanguageSwitcher from "@/components/yourlangcoach/LanguageSwitcher";
import ylcLogo from "@/assets/yourlangcoach-logo.png";
import workbookGrid from "@/assets/ylc-workbook-grid.jpeg.asset.json";
import workbookEditor from "@/assets/ylc-workbook-editor.jpeg.asset.json";
import reviewDashboard from "@/assets/ylc-review-dashboard.jpeg.asset.json";
import reviewSettings from "@/assets/ylc-review-settings.jpeg.asset.json";
import { SUPPORT_EMAIL } from "@/lib/yourlangcoach/content";
import { YlcLangProvider, useYlcLang } from "@/lib/yourlangcoach/i18n";

const SIGNUP_URL = "/yourlangcoach/tpp/join";

const stepIcons = [GraduationCap, NotebookTabs, RefreshCw, Brain];
const benefitIcons = [Gift, RefreshCw, Brain, BookOpen, Clock3, Sparkles, InfinityIcon, GraduationCap];
const srTagIcons = [Clock3, RefreshCw, Brain, Check];
const wbTagIcons = [FileText, Upload, FileImage, MessageCircleMore];

const SectionHeading = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <div className="tpp-section-heading max-w-3xl mb-10 md:mb-14">
    <p className="ylc-eyebrow">{eyebrow}</p>
    <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">{title}</h2>
    {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>}
  </div>
);

const PartnerCTA = ({ className = "" }: { className?: string }) => {
  const { t } = useYlcLang();
  return (
    <Button asChild size="lg" className={`rounded-lg px-6 ${className}`}>
      <Link to={SIGNUP_URL}>
        {t.tpp.cta} <ArrowRight className="rtl:rotate-180" />
      </Link>
    </Button>
  );
};

const TeacherPartnerContent = () => {
  const { t, dir } = useYlcLang();
  const tp = t.tpp;

  return (
    <div dir={dir} className="ylc-theme tpp-theme min-h-screen bg-background text-foreground">
      <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/yourlangcoach" className="flex min-w-0 items-center gap-2.5">
            <img src={ylcLogo} alt="YourLangCoach logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="hidden truncate font-display text-sm font-semibold sm:inline sm:text-base">YourLangCoach</span>
            <span className="hidden border-s border-border ps-3 text-xs text-muted-foreground lg:inline">{tp.headerTag}</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Teacher Partner page">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">{tp.navHow}</a>
            <a href="#teacher-benefits" className="transition-colors hover:text-foreground">{tp.navBenefits}</a>
            <a href="#faq" className="transition-colors hover:text-foreground">{tp.navFaq}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <PartnerCTA className="h-9 px-3 text-xs sm:px-4 sm:text-sm" />
          </div>
        </div>
      </header>

      <main>
        <section className="tpp-hero overflow-hidden border-b border-border">
          <div className="container px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24">
            <div className="max-w-4xl">
              <p className="ylc-eyebrow">{tp.heroEyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-7xl">
                {tp.heroTitle}
              </h1>
              <p className="mt-7 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
                {tp.heroSubA}
                <strong className="font-semibold text-foreground">{tp.heroSubB}</strong>
              </p>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{tp.heroText}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PartnerCTA />
                <Button asChild variant="outline" size="lg" className="rounded-lg">
                  <a href="#how-it-works">{tp.seeHow} <ArrowDown /></a>
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-6xl" aria-label="Learning journey from lesson to next lesson">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
                {tp.flow.map((label, index) => (
                  <div key={label} className={`tpp-flow-item relative flex min-h-24 items-center justify-center px-3 text-center text-sm font-medium ${index === 2 ? "tpp-flow-focus" : ""}`}>
                    {label}
                    {index < 5 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-primary md:block rtl:hidden" />}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">{tp.flowCaption}</p>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading eyebrow={tp.problemEyebrow} title={tp.problemTitle} />
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>{tp.problem1}</p>
              <p>{tp.problem2}</p>
              <p className="border-s-2 border-primary ps-5 font-medium text-foreground">{tp.problem3}</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow={tp.howEyebrow} title={tp.howTitle} />
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
              {tp.steps.map((step, index) => {
                const Icon = stepIcons[index];
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
          <div className="container px-4 sm:px-6">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <SectionHeading eyebrow={tp.srEyebrow} title={tp.srTitle} intro={tp.srIntro} />
                <div className="grid gap-3 sm:grid-cols-2">
                  {tp.srTags.map((label, index) => {
                    const ItemIcon = srTagIcons[index];
                    return (
                      <div key={label} className="flex items-center gap-3 border-b border-border py-3 text-sm">
                        <ItemIcon className="text-primary" /><span>{label}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-7 font-display text-xl font-semibold text-foreground">{tp.srNoPlan}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tp.srNoPlanText}</p>
              </div>
              <div className="tpp-product-stage">
                <figure className="tpp-phone tpp-phone-back">
                  <img src={reviewSettings.url} alt="YourLangCoach spaced repetition settings showing review options and batch size" loading="lazy" />
                </figure>
                <figure className="tpp-phone tpp-phone-front">
                  <img src={reviewDashboard.url} alt="YourLangCoach review dashboard with due words and review categories" loading="lazy" />
                </figure>
              </div>
            </div>

            <div className="tpp-review-flow mt-16" aria-label="Spaced repetition schedule">
              <div className="tpp-review-track">
                {tp.srSteps.map((step, index) => (
                  <div key={step.label} className="tpp-review-step">
                    <span className="tpp-review-dot">{index + 1}</span>
                    <p className="mt-4 font-display font-semibold">{step.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.time}</p>
                  </div>
                ))}
              </div>
              <div className="tpp-memory-destination">
                <Brain className="h-6 w-6" />
                <div>
                  <p className="font-display font-semibold">{tp.srMemoryTitle}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{tp.srMemoryText}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <SectionHeading eyebrow={tp.wbEyebrow} title={tp.wbTitle} intro={tp.wbIntro} />
              <div className="grid gap-3 sm:grid-cols-2">
                {tp.wbTags.map((label, index) => {
                  const ItemIcon = wbTagIcons[index];
                  return (
                    <div key={label} className="flex items-center gap-3 border-b border-border py-3 text-sm">
                      <ItemIcon className="text-primary" /><span>{label}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-7 font-display text-xl font-semibold text-foreground">{tp.wbLead}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tp.wbText}</p>
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
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
            <SectionHeading eyebrow={tp.aiEyebrow} title={tp.aiTitle} intro={tp.aiIntro} />
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {tp.aiItems.map((item) => (
                <div key={item} className="flex items-center gap-3 bg-card p-5 text-sm"><Check className="text-primary" />{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="teacher-benefits" className="scroll-mt-20 border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow={tp.benefitsEyebrow} title={tp.benefitsTitle} />
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {tp.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                return (
                  <article key={benefit.title} className="bg-card p-6">
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="mt-5 font-display font-semibold">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="join" className="tpp-offer border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="ylc-eyebrow">{tp.offerEyebrow}</p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight md:text-6xl">{tp.offerTitle}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{tp.offerText1}</p>
              <p className="mt-4 max-w-xl text-muted-foreground">{tp.offerText2}</p>
              <PartnerCTA className="mt-8" />
            </div>
            <div className="rounded-lg border border-primary/40 bg-card p-7 md:p-9">
              <p className="text-sm font-medium text-primary">{tp.offerCardTag}</p>
              <div className="mt-6 space-y-6">
                <div><p className="text-sm text-muted-foreground">{tp.offerForYou}</p><p className="mt-1 font-display text-2xl font-semibold">{tp.offerForYouValue}</p></div>
                <div><p className="text-sm text-muted-foreground">{tp.offerForStudent}</p><p className="mt-1 font-display text-2xl font-semibold">{tp.offerForStudentValue}</p></div>
              </div>
              <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm">
                {tp.offerList.map((item) => <li key={item} className="flex items-center gap-3"><Check className="text-primary" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow={tp.startEyebrow} title={tp.startTitle} />
            <div className="grid gap-8 md:grid-cols-3">
              {tp.startSteps.map((step, index) => (
                <div key={step.title} className="border-t border-primary pt-5">
                  <span className="text-sm text-primary">0{index + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-center font-display text-xl font-semibold">{tp.startClosing}</p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <SectionHeading eyebrow={tp.whoEyebrow} title={tp.whoTitle} intro={tp.whoIntro} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {tp.audiences.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm">
                  <Users className="mt-0.5 text-primary" /><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 border-b border-border py-20 md:py-28">
          <div className="container grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionHeading eyebrow={tp.faqEyebrow} title={tp.faqTitle} />
            <Accordion type="single" collapsible className="border-t border-border">
              {tp.faqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`faq-${index}`} className="border-border">
                  <AccordionTrigger className="text-start font-display text-base hover:no-underline">{question}</AccordionTrigger>
                  <AccordionContent className="max-w-2xl leading-relaxed text-muted-foreground">{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 text-center md:py-28">
          <div className="container px-4 sm:px-6">
            <Languages className="mx-auto h-9 w-9 text-primary" />
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">{tp.finalTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{tp.finalText}</p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <PartnerCTA />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm font-medium text-primary hover:underline">{tp.contact}</a>
            </div>
          </div>
        </section>

        <FamilyHuddlePromo />
      </main>
      <YLCFooter />
    </div>
  );
};

const TeacherPartnerPage = () => (
  <YlcLangProvider>
    <TeacherPartnerContent />
  </YlcLangProvider>
);

export default TeacherPartnerPage;
