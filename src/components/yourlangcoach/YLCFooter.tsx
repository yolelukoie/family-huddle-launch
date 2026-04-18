import { Link } from "react-router-dom";
import { SUPPORT_EMAIL } from "@/lib/yourlangcoach/content";

const YLCFooter = () => {
  return (
    <footer className="ylc-footer border-t border-[hsl(220,20%,15%)] mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <Link to="/yourlangcoach" className="flex items-center gap-2.5 mb-3">
              <span className="ylc-logo-mark w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold">
                Y
              </span>
              <span className="font-display font-semibold text-base tracking-tight text-[hsl(220,20%,92%)]">
                YourLangCoach
              </span>
            </Link>
            <p className="text-sm text-[hsl(220,12%,60%)] max-w-sm">
              Need help? Contact:{" "}
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
              Terms of Use
            </Link>
            <Link
              to="/yourlangcoach/privacy"
              className="text-[hsl(220,12%,70%)] hover:text-[hsl(220,20%,92%)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/yourlangcoach/refund"
              className="text-[hsl(220,12%,70%)] hover:text-[hsl(220,20%,92%)] transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              to="/yourlangcoach/delete-account"
              className="text-[hsl(220,12%,70%)] hover:text-[hsl(220,20%,92%)] transition-colors"
            >
              Delete Account
            </Link>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-[hsl(220,20%,15%)] text-xs text-[hsl(220,10%,50%)]">
          © {new Date().getFullYear()} Family Huddle. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default YLCFooter;
