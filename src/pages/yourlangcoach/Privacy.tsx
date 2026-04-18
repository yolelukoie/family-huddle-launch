import YLCLegalLayout from "@/components/yourlangcoach/YLCLegalLayout";
import LegalText from "@/components/yourlangcoach/LegalText";
import { PRIVACY_TEXT } from "@/lib/yourlangcoach/content";

const Privacy = () => (
  <YLCLegalLayout
    title="Privacy Policy"
    description="How YourLangCoach handles information when you use the Service."
  >
    <LegalText text={PRIVACY_TEXT} />
  </YLCLegalLayout>
);

export default Privacy;
