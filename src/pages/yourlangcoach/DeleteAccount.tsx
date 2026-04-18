import { Mail } from "lucide-react";
import YLCLegalLayout from "@/components/yourlangcoach/YLCLegalLayout";
import { SUPPORT_EMAIL, EFFECTIVE_DATE } from "@/lib/yourlangcoach/content";

const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Delete My YourLangCoach Account",
)}`;

const DeleteAccount = () => (
  <YLCLegalLayout
    title="Delete Account"
    description="Request deletion of your YourLangCoach account and associated data."
  >
    <h1>Delete Account</h1>
    <p>Effective date: {EFFECTIVE_DATE}</p>

    <p>
      If you want to delete your YourLangCoach account and associated data, you can request
      deletion by contacting us at:
    </p>

    <p>
      <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
    </p>

    <div className="not-prose my-8">
      <a href={MAILTO} className="ylc-btn ylc-btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium">
        <Mail className="w-5 h-5" />
        Email support to delete my account
      </a>
    </div>

    <p>
      Please send the request from the email address associated with your account, or include
      that email address in your message.
    </p>

    <p>
      <strong>Subject line suggestion:</strong>
      <br />
      Delete My YourLangCoach Account
    </p>

    <h2>What happens next</h2>
    <ul>
      <li>we will verify the request where necessary;</li>
      <li>we will process deletion within a reasonable period;</li>
      <li>
        some limited data may be retained where required for legal, security, fraud-prevention,
        or legitimate operational reasons.
      </li>
    </ul>

    <p>
      Deleting your account will remove access to your saved learning data, including personal
      dictionary entries, workbook materials, and related account data, except where retention
      is required by law or legitimate operational necessity.
    </p>

    <h2>Subscriptions</h2>
    <p>
      If you purchased a subscription through Apple App Store or Google Play, deleting your
      account does <strong>not</strong> automatically cancel your subscription. You must also
      cancel the subscription through the store where you purchased it:
    </p>
    <ul>
      <li>
        <strong>iPhone / iPad:</strong> Settings → [your name] → Subscriptions
      </li>
      <li>
        <strong>Android:</strong> Google Play Store → Profile → Payments &amp; subscriptions →
        Subscriptions
      </li>
    </ul>
  </YLCLegalLayout>
);

export default DeleteAccount;
