import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const TeacherPartnerPromo = () => (
  <section className="border-t border-[hsl(220,20%,12%)] py-16 md:py-20">
    <div className="container mx-auto px-4 sm:px-6">
      <Link
        to="/yourlangcoach/tpp"
        className="ylc-card group mx-auto grid max-w-5xl gap-6 rounded-2xl p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10"
      >
        <div className="ylc-icon-wrap h-12 w-12 rounded-xl">
          <GraduationCap className="h-6 w-6" strokeWidth={1.7} />
        </div>
        <div>
          <p className="ylc-eyebrow">Teacher Partner Program</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[hsl(220,25%,95%)] md:text-3xl">
            Are you a language teacher?
          </h2>
          <p className="mt-2 text-[hsl(220,12%,68%)]">
            We have a special offer for you and your students.
          </p>
        </div>
        <span className="ylc-btn ylc-btn-primary w-fit gap-2 rounded-lg px-5 py-3 text-sm font-medium">
          See the offer <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  </section>
);

export default TeacherPartnerPromo;