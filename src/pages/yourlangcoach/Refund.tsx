import YLCLegalLayout from "@/components/yourlangcoach/YLCLegalLayout";
import LegalText from "@/components/yourlangcoach/LegalText";
import { REFUND_TEXT } from "@/lib/yourlangcoach/content";

const Refund = () => (
  <YLCLegalLayout
    title="Refund Policy"
    description="How refunds and cancellations work for YourLangCoach subscriptions."
  >
    <LegalText text={REFUND_TEXT} />
  </YLCLegalLayout>
);

export default Refund;
