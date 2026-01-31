import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: 29 January 2026</p>
          
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
            <p className="text-muted-foreground mb-4">
              These Terms of Service ("Terms") govern your use of the Family Huddle application and any related services (together, the "Service"). The Service is owned and operated by Yana Sklyar, Tel Aviv, Israel ("we", "us", "our").
            </p>
            <p className="text-muted-foreground mb-4">
              By creating an account or using the Service, you agree to these Terms. If you do not agree, please do not use the Service.
            </p>
            <p className="text-muted-foreground mb-8 italic">
              This document is provided for general information and use of the Service. It is not legal advice.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              1. What Family Huddle Is
            </h2>
            <p className="text-muted-foreground mb-4">
              Family Huddle is a family and group task-management app that allows users to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>create, assign, and track tasks and goals,</li>
              <li>collaborate with family members and friends,</li>
              <li>share progress and feedback.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              The Service may evolve over time; features may be added, changed, or removed.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              2. Eligibility
            </h2>
            <p className="text-muted-foreground mb-4">
              You may use the Service only if:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>you are at least 13 years old,</li>
              <li>if you are between 13 and 18 years old, you are using the Service with the permission and supervision of a parent or legal guardian.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Parents and legal guardians are responsible for the actions of minors who use the Service under their supervision.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              3. Accounts and Security
            </h2>
            <p className="text-muted-foreground mb-4">
              To use Family Huddle, you may need to create an account.
            </p>
            <p className="text-muted-foreground mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>provide accurate information,</li>
              <li>keep your login credentials secure, and</li>
              <li>be responsible for all activity that occurs under your account.</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              We may suspend or terminate accounts that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>violate these Terms,</li>
              <li>are used for fraudulent or unlawful purposes, or</li>
              <li>interfere with the operation of the Service.</li>
            </ul>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              4. Subscriptions, Payments, and Refunds
            </h2>
            <p className="text-muted-foreground mb-6">
              Some features of Family Huddle are available only through paid subscriptions ("Premium").
            </p>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              4.1 Pricing and Free Trial
            </h3>
            <p className="text-muted-foreground mb-4">
              The standard price for a Family Huddle Premium subscription is 14 NIS (New Israeli Shekel) per month (approximately 3.70 USD, depending on exchange rates). Prices may vary by region, currency, taxes, or promotions.
            </p>
            <p className="text-muted-foreground mb-4">
              We may offer a free trial period for new Premium subscriptions. As of the date of these Terms, the free trial is four (4) days. During the trial you have full access to all Premium features without limitations.
            </p>
            <p className="text-muted-foreground mb-4">
              Unless you cancel before the end of the free trial, your subscription will automatically start at the then-current monthly price, and your payment method will be charged.
            </p>
            <p className="text-muted-foreground mb-4">
              We may change our prices or trial terms in the future. If we do, we will notify you in advance where required by law, and changes will apply from your next billing period.
            </p>
            <p className="text-muted-foreground mb-6">
              From time to time we may offer promo codes, discounts, or other special offers. These are subject to the specific terms of each promotion, are non-transferable, and may be available only for a limited time.
            </p>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              4.2 Subscriptions and Renewal
            </h3>
            <p className="text-muted-foreground mb-4">
              Subscription prices, billing periods, and what is included in each plan are displayed in the app or on our website.
            </p>
            <p className="text-muted-foreground mb-4">
              Subscriptions are typically billed in advance and renew automatically at the end of each billing period unless cancelled.
            </p>
            <p className="text-muted-foreground mb-6">
              You can cancel your subscription at any time through the platform where you subscribed (for example, in-app stores, web payment page, or payment provider account). After cancellation, you will continue to have access to Premium features until the end of your current paid billing period. After that, access to Premium features will be removed unless you renew.
            </p>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              4.3 Payment Processing
            </h3>
            <p className="text-muted-foreground mb-4">
              Payments are processed by third-party payment providers (for example, payment platforms, app stores, or other billing services). We do not store your full payment card details on our own servers.
            </p>
            <p className="text-muted-foreground mb-6">
              Your use of these third-party services may be subject to their own terms and privacy policies in addition to these Terms.
            </p>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              4.4 Refunds
            </h3>
            <p className="text-muted-foreground mb-4">
              We do not provide refunds for partial billing periods (for example, if you cancel in the middle of a month) or for unused time, except where required by applicable law.
            </p>
            <p className="text-muted-foreground mb-4">
              If you believe you have been incorrectly charged (for example, due to fraud, a billing error, or duplicate payment), please contact us as soon as possible at the email address in the Contact section. We will review your request and, where appropriate and permitted by the payment provider or app store, issue a refund.
            </p>
            <p className="text-muted-foreground mb-6">
              Any refunds that are required by applicable consumer protection laws will be provided in accordance with those laws and, where relevant, the policies of the payment provider or app store through which you subscribed.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              5. Acceptable Use
            </h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>violate any applicable laws or regulations,</li>
              <li>harass, threaten, or harm others,</li>
              <li>share content that is hateful, abusive, obscene, or otherwise inappropriate,</li>
              <li>upload or distribute viruses, malware, or any other harmful code,</li>
              <li>attempt to gain unauthorized access to the Service, other accounts, or our systems,</li>
              <li>reverse-engineer, decompile, or otherwise attempt to obtain the source code of the Service, except where permitted by law.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              We may remove content, restrict features, or suspend accounts that violate these rules or otherwise misuse the Service.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              6. User Content
            </h2>
            <p className="text-muted-foreground mb-4">
              "User Content" means any information you or other users submit to the Service, such as task names, notes, comments, profile details, or other data.
            </p>
            <p className="text-muted-foreground mb-4">
              You retain ownership of your User Content. By using the Service, you grant us a worldwide, non-exclusive, royalty-free license to store, process, and display your User Content as necessary to operate and improve the Service.
            </p>
            <p className="text-muted-foreground mb-4">
              You are responsible for ensuring that your User Content:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>does not infringe the rights of others,</li>
              <li>does not contain illegal or prohibited material, and</li>
              <li>complies with these Terms and applicable laws.</li>
            </ul>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              7. Privacy (Privacy Policy)
            </h2>
            <p className="text-muted-foreground mb-6">
              This section explains how we handle your personal data when you use Family Huddle.
            </p>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              7.1 Data We Collect
            </h3>
            <p className="text-muted-foreground mb-4">
              Depending on how you use the Service, we may collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li><strong>Account data:</strong> email address, name or nickname, password (stored in hashed form), language preferences.</li>
              <li><strong>Profile and family data:</strong> family or group names, member names or nicknames, roles, and relationships you define in the app.</li>
              <li><strong>Usage data:</strong> tasks you create or complete, schedules, streaks, achievements, app settings, and other in-app activity.</li>
              <li><strong>Technical data:</strong> IP address, device type, operating system, app version, and basic usage analytics (for example, which screens are most used).</li>
              <li><strong>Payment data:</strong> limited information about your subscription status, payment method type, and billing history, as provided by payment processors or app stores. We do not store your full payment card number on our servers.</li>
            </ul>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              7.2 How We Use Your Data
            </h3>
            <p className="text-muted-foreground mb-4">
              We use your data to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>provide and maintain the Service,</li>
              <li>personalize your experience (for example, language and settings),</li>
              <li>enable collaboration between family members and groups,</li>
              <li>manage subscriptions and verify your access to Premium features,</li>
              <li>monitor and improve performance and reliability of the Service,</li>
              <li>comply with legal obligations (for example, tax or accounting requirements),</li>
              <li>protect our rights, enforce these Terms, and prevent abuse or fraud.</li>
            </ul>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              7.3 Legal Bases (where applicable)
            </h3>
            <p className="text-muted-foreground mb-4">
              Where required by law (for example, in the EU/EEA), our processing may be based on:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>performance of a contract (providing the Service to you),</li>
              <li>legitimate interests (improving and protecting the Service),</li>
              <li>compliance with legal obligations, or</li>
              <li>your consent (for example, for optional analytics, if applicable).</li>
            </ul>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              7.4 Sharing of Data
            </h3>
            <p className="text-muted-foreground mb-4">
              We may share data with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Service providers that help us run the Service (such as hosting, databases, analytics, error monitoring, and customer support).</li>
              <li>Payment processors and app stores that handle your subscription payments.</li>
              <li>Authorities or legal entities where required by law, court order, or to protect our legal rights and users' safety.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              We do not sell your personal data to third parties.
            </p>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              7.5 Data Storage and Retention
            </h3>
            <p className="text-muted-foreground mb-4">
              We store your data on secure servers provided by reputable hosting providers. We keep data for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>operate the Service,</li>
              <li>comply with legal and accounting requirements, and</li>
              <li>resolve disputes or enforce our agreements.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              If you delete your account, we will remove or anonymize your personal data within a reasonable time, except where we are legally required or permitted to keep certain records.
            </p>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              7.6 Your Rights
            </h3>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>access the personal data we hold about you,</li>
              <li>correct inaccurate data,</li>
              <li>request deletion of your data,</li>
              <li>object to or restrict certain processing,</li>
              <li>request a copy of your data in a portable format, where applicable.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              To exercise these rights, please contact us at the email address provided in the Contact section below. We may need to verify your identity before responding.
            </p>

            <h3 className="font-display font-medium text-lg text-foreground mt-6 mb-3">
              7.7 Children's Privacy
            </h3>
            <p className="text-muted-foreground mb-6">
              Family Huddle may be used by families that include children. The Service is intended to be used by minors only with the permission and supervision of a parent or legal guardian. If you believe that we have collected personal data from a child without appropriate consent, please contact us and we will take steps to remove that data where required by law.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              8. Changes to the Service and to These Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              We may update or change the Service at any time, including adding or removing features.
            </p>
            <p className="text-muted-foreground mb-4">
              We may also update these Terms from time to time. When we make material changes, we will take reasonable steps to inform you (for example, by updating the "Last updated" date, notifying you in the app, or sending an email).
            </p>
            <p className="text-muted-foreground mb-6">
              Your continued use of the Service after changes become effective means you accept the updated Terms.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              9. Termination
            </h2>
            <p className="text-muted-foreground mb-4">
              You may stop using the Service at any time and, if you have an account, you may delete it or request deletion.
            </p>
            <p className="text-muted-foreground mb-4">
              We may suspend or terminate your access to the Service if:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>you seriously or repeatedly violate these Terms,</li>
              <li>your account is used in a way that creates risk or legal exposure for us, or</li>
              <li>continued operation of your account is no longer commercially or technically viable.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Upon termination, your right to use the Service will end. Some provisions of these Terms (including those on limitation of liability and governing law) will continue to apply even after termination.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              10. Disclaimers
            </h2>
            <p className="text-muted-foreground mb-4">
              The Service is provided on an "as is" and "as available" basis, without any warranties of any kind, whether express or implied.
            </p>
            <p className="text-muted-foreground mb-4">
              We do not guarantee that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>the Service will be error-free or always available,</li>
              <li>the Service will meet your specific requirements, or</li>
              <li>any defects will be corrected immediately.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              To the maximum extent permitted by law, we disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              11. Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>we are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, profits, or goodwill, arising out of or relating to your use of the Service; and</li>
              <li>our total liability for any claims related to the Service is limited to the amount you paid to us for the Service in the three (3) months immediately before the event giving rise to the claim.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Some jurisdictions do not allow certain limitations of liability, so parts of this section may not apply to you.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              12. Governing Law and Disputes
            </h2>
            <p className="text-muted-foreground mb-4">
              These Terms are governed by the laws of Israel, without regard to its conflict of laws principles.
            </p>
            <p className="text-muted-foreground mb-6">
              Any disputes arising out of or relating to these Terms or the Service will be subject to the exclusive jurisdiction of the competent courts located in Tel Aviv, Israel, unless applicable law requires a different venue.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              13. Contact
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms or our privacy practices, you can contact:
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

export default Terms;