import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
            Refund Policy
          </h1>
          
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
            <p className="text-muted-foreground">
              Refund Policy – content coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
