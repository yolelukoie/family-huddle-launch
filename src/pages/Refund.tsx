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
          
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
            Refund Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: 29 January 2026</p>
          
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border prose prose-sm max-w-none">
            <p className="text-foreground mb-6">
              Thank you for using Family Huddle.
            </p>
            <p className="text-muted-foreground mb-8">
              This Refund Policy explains when you may be eligible for a refund for payments made for Family Huddle Premium subscriptions.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              1. Subscriptions and Billing
            </h2>
            <p className="text-muted-foreground mb-4">
              Family Huddle Premium is billed on a recurring monthly basis. The current price is 14 NIS per month (price may vary by region, currency, or promotion). Subscriptions renew automatically at the end of each billing period unless cancelled.
            </p>
            <p className="text-muted-foreground mb-6">
              You can cancel your subscription at any time through the platform where you subscribed (for example, in-app store, web payment page, or payment provider account). After cancellation, you will continue to have access to Premium features until the end of your current paid billing period.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              2. Free Trial
            </h2>
            <p className="text-muted-foreground mb-4">
              New Premium subscriptions may include a free trial period (currently four (4) days). During the trial you have full access to all Premium features without limitations.
            </p>
            <p className="text-muted-foreground mb-6">
              If you cancel during the free trial, you will not be charged. If you do not cancel before the trial ends, your subscription will automatically start and your payment method will be charged at the then-current monthly price.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              3. General Refund Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              As a general rule, we do not provide refunds for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>partial billing periods (for example, if you cancel in the middle of a month),</li>
              <li>unused time, or</li>
              <li>forgetting to cancel before the next renewal date.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              You can cancel at any time to prevent future charges.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              4. Billing Errors and Exceptional Cases
            </h2>
            <p className="text-muted-foreground mb-4">
              If you believe you have been incorrectly charged (for example, due to technical issues, duplicate payments, or unauthorized charges), please contact us as soon as possible at:
            </p>
            <p className="text-muted-foreground mb-4">
              Email: <a href="mailto:y.olelukoie@gmail.com" className="text-primary hover:underline">y.olelukoie@gmail.com</a>
            </p>
            <p className="text-muted-foreground mb-6">
              We will review your request and, where appropriate, work with the payment provider or app store to correct the issue. In some cases this may include issuing a refund or credit, in our reasonable discretion and subject to the policies of the relevant payment provider or app store.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              5. Legal Rights
            </h2>
            <p className="text-muted-foreground mb-6">
              Nothing in this Refund Policy affects any rights you may have under applicable consumer protection laws. If the law in your country or region requires a refund in specific circumstances, we will follow those legal requirements.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              6. How to Contact Us
            </h2>
            <p className="text-muted-foreground mb-2">
              If you have questions about this Refund Policy or need help with a payment issue, please contact:
            </p>
            <div className="text-muted-foreground">
              <p>Owner: Yana Sklyar</p>
              <p>Location: Tel Aviv, Israel</p>
              <p>Email: <a href="mailto:support@familyhuddletasks.com" className="text-primary hover:underline">support@familyhuddletasks.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;