import { YLC_LANGS, useYlcLang } from "@/lib/yourlangcoach/i18n";

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useYlcLang();

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5 sm:gap-1 sm:p-1 ${className}`}
      role="group"
      aria-label="Language"
    >

      {YLC_LANGS.map((option) => {
        const active = option.code === lang;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            title={option.label}
            className={`flex h-6 w-7 items-center justify-center rounded-full text-base leading-none transition-all sm:h-7 sm:w-8 ${
              active
                ? "bg-[hsl(var(--ylc-fill))] opacity-100 ring-1 ring-primary"
                : "opacity-55 hover:opacity-100"
            }`}
          >
            <span aria-hidden="true">{option.flag}</span>
            <span className="sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
