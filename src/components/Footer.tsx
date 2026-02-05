import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-10 md:py-12 border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Links Row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6">
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/refund"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              to="/delete-account"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Delete Account
            </Link>
          </div>

          {/* Contact Text */}
          <p className="text-center text-sm text-muted-foreground">
            Need help or have a suggestion? Contact our support team at{" "}
            <a
              href="mailto:support@familyhuddletasks.com"
              className="text-primary hover:underline"
            >
              support@familyhuddletasks.com
            </a>
          </p>

          {/* Logo & Copyright */}
          <div className="flex flex-col items-center gap-3 mt-8">
            <img src={logo} alt="Family Huddle" className="w-10 h-10" />
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Family Huddle. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
