import { useEffect } from "react";
import { ensureYlcFonts } from "@/lib/yourlangcoach/fonts";
import { Link } from "react-router-dom";
import { SUPPORT_EMAIL } from "@/lib/yourlangcoach/content";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";
import ylcLogo from "@/assets/yuston-icon.png";

const YLCFooter = () => {
  const { t } = useYlcLang();
  useEffect(ensureYlcFonts, []);

  return (
    <footer className="ylc-footer border-t border-border mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <Link to="/yourlangcoach" className="flex items-center gap-2.5 mb-3">
              <img
                src={ylcLogo}
                alt="Yuston logo"
                className="w-9 h-9 rounded-xl object-cover"
              />
              <span className="font-display font-semibold text-base tracking-tight text-foreground">
                Yuston
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t.footer.needHelp}{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-primary hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link
              to="/yourlangcoach/terms"
              className="text-[hsl(var(--ylc-ink-2))] hover:text-foreground transition-colors"
            >
              {t.footer.terms}
            </Link>
            <Link
              to="/yourlangcoach/privacy"
              className="text-[hsl(var(--ylc-ink-2))] hover:text-foreground transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              to="/yourlangcoach/refund"
              className="text-[hsl(var(--ylc-ink-2))] hover:text-foreground transition-colors"
            >
              {t.footer.refund}
            </Link>
            <Link
              to="/yourlangcoach/delete-account"
              className="text-[hsl(var(--ylc-ink-2))] hover:text-foreground transition-colors"
            >
              {t.footer.deleteAccount}
            </Link>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
          © {new Date().getFullYear()} Family Huddle. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default YLCFooter;
