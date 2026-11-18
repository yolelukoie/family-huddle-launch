import { useEffect } from "react";
import { ensureYlcFonts } from "@/lib/yourlangcoach/fonts";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";
import LanguageSwitcher from "@/components/yourlangcoach/LanguageSwitcher";
import ThemeToggle from "@/components/yourlangcoach/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ylcLogo from "@/assets/yuston-icon.png";

const YLCHeader = () => {
  const { t } = useYlcLang();
  useEffect(ensureYlcFonts, []);

  return (
    <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/yourlangcoach" className="flex items-center gap-3 group">
          <img
            src={ylcLogo}
            alt="Yuston logo"
            className="w-10 h-10 md:w-11 md:h-11 rounded-xl object-cover"
          />
          <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-foreground">
            Yuston
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            {t.nav.howItWorks}
          </a>
          <a href="#features" className="hover:text-foreground transition-colors">
            {t.nav.features}
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            {t.nav.pricing}
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle /><LanguageSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="ylc-btn ylc-btn-primary text-sm px-4 py-2 rounded-lg inline-flex items-center gap-1.5"
                aria-label="Download Yuston"
              >
                {t.nav.download}
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[10rem] bg-popover ylc-vars border-border text-foreground"
            >
              <DropdownMenuItem asChild>
                <a
                  href={ANDROID_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer focus:bg-[hsl(var(--ylc-fill))] focus:text-primary"
                >
                  {t.nav.android}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={IPHONE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer focus:bg-[hsl(var(--ylc-fill))] focus:text-primary"
                >
                  {t.nav.ios}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default YLCHeader;
