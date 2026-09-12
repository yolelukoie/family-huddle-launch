import { YLC_LANGS, useYlcLang } from "@/lib/yourlangcoach/i18n";

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useYlcLang();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-[hsl(220,20%,18%)] bg-[hsl(222,30%,10%)]/70 p-1 ${className}`}
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
            className={`flex h-7 w-8 items-center justify-center rounded-full text-base leading-none transition-all ${
              active
                ? "bg-[hsl(235,60%,22%)] opacity-100 ring-1 ring-[hsl(235,80%,70%)]"
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
