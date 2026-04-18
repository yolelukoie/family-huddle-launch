import YLCLegalLayout from "@/components/yourlangcoach/YLCLegalLayout";
import LegalText from "@/components/yourlangcoach/LegalText";
import { TERMS_TEXT } from "@/lib/yourlangcoach/content";

const Terms = () => (
  <YLCLegalLayout
    title="Terms of Use"
    description="Terms of Use governing access to and use of the YourLangCoach language-learning app."
  >
    <LegalText text={TERMS_TEXT} />
  </YLCLegalLayout>
);

export default Terms;
