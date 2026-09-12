import { Link } from "react-router-dom";
import { SUPPORT_EMAIL } from "@/lib/yourlangcoach/content";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";
import ylcLogo from "@/assets/yourlangcoach-logo.png";

const YLCFooter = () => {
  const { t } = useYlcLang();

  return (
    <footer className="ylc-footer border-t border-[hsl(220,20%,15%)] mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <Link to="/yourlangcoach" className="flex items-center gap-2.5 mb-3">
              <img
                src={ylcLogo}
                alt="YourLangCoach logo"
                className="w-9 h-9 rounded-xl object-cover"
              />
              <span className="font-display font-semibold text-base tracking-tight text-[hsl(220,20%,92%)]">
                YourLangCoach
              </span>
            </Link>
            <p className="text-sm text-[hsl(220,12%,60%)] max-w-sm">
              {t.footer.needHelp}{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[hsl(235,90%,78%)] hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link
              to="/yourlangcoach/terms"
              className="text-[hsl(220,12%,70%)] hover:text-[hsl(220,20%,92%)] transition-colors"
            >
              {t.footer.terms}
            </Link>
            <Link
              to="/yourlangcoach/privacy"
              className="text-[hsl(220,12%,70%)] hover:text-[hsl(220,20%,92%)] transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              to="/yourlangcoach/refund"
              className="text-[hsl(220,12%,70%)] hover:text-[hsl(220,20%,92%)] transition-colors"
            >
              {t.footer.refund}
            </Link>
            <Link
              to="/yourlangcoach/delete-account"
              className="text-[hsl(220,12%,70%)] hover:text-[hsl(220,20%,92%)] transition-colors"
            >
              {t.footer.deleteAccount}
            </Link>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-[hsl(220,20%,15%)] text-xs text-[hsl(220,10%,50%)]">
          © {new Date().getFullYear()} Family Huddle. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default YLCFooter;
