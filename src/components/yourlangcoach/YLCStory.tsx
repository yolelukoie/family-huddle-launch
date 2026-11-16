import { Mic, Sparkles, Bell, MessagesSquare, FolderOpen, Check, ArrowRight, ListChecks } from "lucide-react";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";
import reviewDashboard from "@/assets/ylc-review-dashboard.jpeg";
import reviewSettings from "@/assets/ylc-review-settings.jpeg";
import captureDictionary from "@/assets/ylc-capture-dictionary.jpeg";
import captureCard from "@/assets/ylc-capture-card.jpeg";
import grammarExerciseEn from "@/assets/ylc-grammar-exercise-en.jpeg";
import grammarExerciseRu from "@/assets/ylc-grammar-exercise-ru.jpeg";
import grammarExerciseHe from "@/assets/ylc-grammar-exercise-he.jpeg";
import grammarReviewEn from "@/assets/ylc-grammar-review-en.jpeg";
import grammarReviewRu from "@/assets/ylc-grammar-review-ru.jpeg";
import grammarReviewHe from "@/assets/ylc-grammar-review-he.jpeg";

const GRAMMAR_SHOTS = {
  en: [grammarExerciseEn, grammarReviewEn],
  ru: [grammarExerciseRu, grammarReviewRu],
  he: [grammarExerciseHe, grammarReviewHe],
} as const;

const Arrow = () => (
  <span aria-hidden="true" className="text-muted-foreground text-sm">
    →
  </span>
);

const YLCStory = () => {
  const { t, lang } = useYlcLang();
  const h = t.home;
  const [grammarExercise, grammarReview] = GRAMMAR_SHOTS[lang] ?? GRAMMAR_SHOTS.en;

  return (
    <>
      {/* Who it's for: people who just moved */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="ylc-eyebrow">{h.movers.eyebrow}</p>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-foreground mt-3 text-balance">
              {h.movers.title}
            </h2>
            <p className="mt-5 text-[hsl(var(--ylc-ink-2))] text-base md:text-lg">{h.movers.p1}</p>
            <p className="mt-3 text-foreground text-base md:text-lg font-medium">{h.movers.p2}</p>
            <ul className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3 text-start">
              {h.movers.chips.map((c) => (
                <li key={c.label} className="ylc-card rounded-xl px-4 py-3 sm:max-w-[17rem]">
                  <span className="block text-sm font-medium text-foreground">{c.label}</span>
                  <span className="block text-sm text-muted-foreground mt-0.5">{c.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-primary font-medium text-balance">{h.movers.closing}</p>
          </div>
        </div>
      </section>

      {/* Why words are forgotten */}
      <section className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="ylc-eyebrow">{h.forget.eyebrow}</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-foreground mt-3 text-balance">
              {h.forget.title}
            </h2>
            <div className="mt-6 space-y-4 text-[hsl(var(--ylc-ink-2))] text-base md:text-lg">
              {h.forget.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="ylc-card ylc-card-highlight rounded-2xl px-6 py-5 mt-8 text-foreground font-medium">
              {h.forget.highlight}
            </div>
          </div>
        </div>
      </section>

      {/* Capture */}
      <section className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <p className="ylc-eyebrow">{h.capture.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-foreground mt-3">
                {h.capture.title}
              </h2>
              <p className="text-[hsl(var(--ylc-ink-2))] mt-4 text-lg">{h.capture.subtitle}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {h.capture.sources.map((s) => (
                <span
                  key={s}
                  className="ylc-card rounded-full px-4 py-1.5 text-sm text-[hsl(var(--ylc-ink-2))]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="ylc-card ylc-card-highlight rounded-2xl px-6 py-5 mt-8 flex flex-wrap items-center gap-3 justify-center">
              {h.capture.flow.map((step, i) => (
                <span key={step} className="flex items-center gap-3">
                  {i > 0 && <Arrow />}
                  <span className="text-foreground font-medium">{step}</span>
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="ylc-card rounded-2xl p-6">
                <div className="ylc-icon-wrap mb-4">
                  <Mic className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {h.capture.inputTitle}
                </h3>
                <p className="text-sm text-[hsl(var(--ylc-ink-2))] leading-relaxed">
                  {h.capture.inputText}
                </p>
                <p className="mt-4 text-sm text-foreground font-medium">
                  {h.capture.note}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{h.capture.bulk}</p>
              </div>

              <div className="ylc-card rounded-2xl p-6">
                <div className="ylc-icon-wrap mb-4">
                  <Sparkles className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                  {h.capture.cardTitle}
                </h3>
                <ul className="space-y-2">
                  {h.capture.cardItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0 text-primary"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-[hsl(var(--ylc-ink-2))]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mx-auto mt-9 max-w-xl">
              <div className="grid grid-cols-2 items-start gap-4 sm:gap-6 px-3 sm:px-5 py-5">
                <img src={captureDictionary} alt="Yuston dictionary" loading="lazy" className="w-full -rotate-3 translate-y-5 rounded-xl border border-border shadow-xl motion-reduce:transform-none" />
                <img src={captureCard} alt="Yuston word card" loading="lazy" className="w-full rotate-3 rounded-xl border border-border shadow-xl motion-reduce:transform-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saving is only the first step */}
      <section className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="ylc-eyebrow">{h.notEnd.eyebrow}</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-foreground mt-3 text-balance">
              {h.notEnd.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-10 text-start">
              <div className="ylc-card rounded-2xl p-6 opacity-80">
                <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
                  {h.notEnd.otherTitle}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {h.notEnd.otherFlow.map((s, i) => (
                    <span key={s} className="flex items-center gap-2.5">
                      {i > 0 && <Arrow />}
                      <span className="text-sm text-[hsl(var(--ylc-ink-2))]">{s}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="ylc-card ylc-card-highlight rounded-2xl p-6">
                <p className="text-sm uppercase tracking-wide text-primary mb-4">
                  {h.notEnd.ylcTitle}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {h.notEnd.ylcFlow.map((s, i) => (
                    <span key={s} className="flex items-center gap-2.5">
                      {i > 0 && <Arrow />}
                      <span className="text-sm font-medium text-foreground">{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 text-[hsl(var(--ylc-ink-2))]">{h.notEnd.note}</p>
          </div>
        </div>
      </section>

      {/* Remember */}
      <section className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <p className="ylc-eyebrow">{h.remember.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-foreground mt-3 text-balance">
                {h.remember.title}
              </h2>
              <p className="text-[hsl(var(--ylc-ink-2))] mt-4 text-lg">{h.remember.text}</p>
            </div>

            <div className="ylc-card ylc-card-highlight rounded-2xl px-6 py-5 mt-8 flex items-start gap-3">
              <div className="ylc-icon-wrap shrink-0">
                <Bell className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <p className="text-foreground font-medium self-center">
                {h.remember.highlight}
              </p>
            </div>

            <div className="mt-8 overflow-x-auto pb-3" aria-label={h.remember.eyebrow}>
              <ol dir="ltr" className="flex min-w-[840px] items-start">
                {h.remember.timeline.map((point, i) => (
                  <li key={point} className="flex min-w-0 flex-1 items-start">
                    <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/60 bg-secondary text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <span dir="auto" className="mt-3 text-sm font-medium text-foreground leading-tight">{point}</span>
                    </div>
                    {i < h.remember.timeline.length - 1 && <ArrowRight aria-hidden="true" className="mt-3 h-4 w-4 shrink-0 text-primary/70" strokeWidth={1.8} />}
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-6 text-sm text-muted-foreground text-center">
              {h.remember.caution}
            </p>
            <div className="mx-auto mt-9 max-w-xl">
              <div className="grid grid-cols-2 items-start gap-4 sm:gap-6 px-3 sm:px-5 py-5">
                <img src={reviewDashboard} alt="Yuston review reminders" loading="lazy" className="w-full -rotate-3 translate-y-5 rounded-xl border border-border shadow-xl motion-reduce:transform-none" />
                <img src={reviewSettings} alt="Yuston review schedule" loading="lazy" className="w-full rotate-3 rounded-xl border border-border shadow-xl motion-reduce:transform-none" />
              </div>
              <p className="mt-8 text-xs text-center text-muted-foreground">{h.example.caption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use */}
      <section className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <p className="ylc-eyebrow">{h.use.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-foreground mt-3">
                {h.use.title}
              </h2>
              <p className="text-[hsl(var(--ylc-ink-2))] mt-4 text-lg">{h.use.subtitle}</p>
              <p className="text-muted-foreground mt-4">{h.use.intro}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {h.use.items.map((item) => (
                <div key={item} className="ylc-card rounded-xl px-5 py-4 flex items-start gap-3">
                  <MessagesSquare
                    className="w-4 h-4 mt-1 shrink-0 text-primary"
                    strokeWidth={1.8}
                  />
                  <span className="text-sm text-[hsl(var(--ylc-ink-2))]">{item}</span>
                </div>
              ))}
            </div>

            <div className="ylc-card ylc-card-highlight rounded-2xl px-6 py-6 mt-8 text-center">
              <p className="text-lg text-foreground font-medium text-balance">
                {h.use.callout}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {h.use.flow.map((s, i) => (
                  <span key={s} className="flex items-center gap-3">
                    {i > 0 && <Arrow />}
                    <span className="text-sm text-[hsl(var(--ylc-ink-2))]">{s}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Discovery */}
            <div className="ylc-card rounded-2xl p-6 md:p-8 mt-6">
              <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground">
                {h.discovery.title}
              </h3>
              <p className="text-[hsl(var(--ylc-ink-2))] mt-3">{h.discovery.text}</p>
              <p className="text-sm text-primary mt-4">{h.discovery.note}</p>
            </div>

            {/* Grammar exercises */}
            <div className="ylc-card rounded-2xl p-6 md:p-8 mt-6">
              <div className="flex items-start gap-3">
                <div className="ylc-icon-wrap shrink-0">
                  <ListChecks className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground">
                    {h.grammar.title}
                  </h3>
                  <p className="text-[hsl(var(--ylc-ink-2))] mt-3">{h.grammar.text}</p>
                </div>
              </div>
              <div className="mx-auto mt-6 max-w-xl">
                <div className="grid grid-cols-2 items-start gap-4 sm:gap-6 px-3 sm:px-5 py-5">
                  <img src={grammarExercise} alt={h.grammar.altExercise} loading="lazy" className="w-full -rotate-3 translate-y-5 rounded-xl border border-border shadow-xl motion-reduce:transform-none" />
                  <img src={grammarReview} alt={h.grammar.altReview} loading="lazy" className="w-full rotate-3 rounded-xl border border-border shadow-xl motion-reduce:transform-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workbook */}
      <section className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="ylc-eyebrow">{h.workbook.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-foreground mt-3">
                {h.workbook.title}
              </h2>
              <p className="text-[hsl(var(--ylc-ink-2))] mt-4 text-lg">{h.workbook.subtitle}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              {h.workbook.items.map((item) => (
                <span
                  key={item}
                  className="ylc-card rounded-full px-4 py-1.5 text-sm text-[hsl(var(--ylc-ink-2))]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {h.workbook.examples.map((ex) => (
                <div key={ex} className="ylc-card rounded-2xl p-5">
                  <div className="ylc-icon-wrap mb-3">
                    <FolderOpen className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <p className="text-sm text-[hsl(var(--ylc-ink-2))] leading-relaxed">{ex}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-muted-foreground text-sm">
              {h.workbook.note}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default YLCStory;
