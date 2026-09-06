import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ylcLogo from "@/assets/yourlangcoach-logo.png";

const YLCHeader = () => {
  return (
    <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/yourlangcoach" className="flex items-center gap-2.5 group">
          <img
            src={ylcLogo}
            alt="YourLangCoach logo"
            className="w-9 h-9 rounded-xl object-cover"
          />
          <span className="font-display font-semibold text-base tracking-tight text-[hsl(220,20%,92%)]">
            YourLangCoach
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[hsl(220,12%,65%)]">
          <a href="#how-it-works" className="hover:text-[hsl(220,20%,92%)] transition-colors">
            How it works
          </a>
          <a href="#features" className="hover:text-[hsl(220,20%,92%)] transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-[hsl(220,20%,92%)] transition-colors">
            Pricing
          </a>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ylc-btn ylc-btn-primary text-sm px-4 py-2 rounded-lg inline-flex items-center gap-1.5"
              aria-label="Download YourLangCoach"
            >
              Download
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[10rem] bg-[hsl(222,30%,8%)] border-[hsl(220,20%,13%)] text-[hsl(220,20%,92%)]"
          >
            <DropdownMenuItem asChild>
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer focus:bg-[hsl(235,60%,18%)] focus:text-[hsl(235,90%,78%)]"
              >
                Android
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={IPHONE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer focus:bg-[hsl(235,60%,18%)] focus:text-[hsl(235,90%,78%)]"
              >
                iOS
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default YLCHeader;
