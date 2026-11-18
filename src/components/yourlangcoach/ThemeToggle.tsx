import { Moon, Sun } from "lucide-react";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";
import { useYlcTheme } from "@/lib/yourlangcoach/theme";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { t } = useYlcLang();
  const { theme, toggle } = useYlcTheme();
  const label = theme === "dark" ? t.nav.themeLight : t.nav.themeDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/60 sm:h-9 sm:w-9 ${className}`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" strokeWidth={1.8} /> : <Moon className="h-4 w-4" strokeWidth={1.8} />}
    </button>
  );
};

export default ThemeToggle;
