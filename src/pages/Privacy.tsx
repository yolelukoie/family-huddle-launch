import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: December 2024</p>
          
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
            <h2 className="font-display font-semibold text-xl text-foreground mb-4">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>Account information (email address, display name, date of birth)</li>
              <li>Profile information (avatar, gender preference for character display)</li>
              <li>Family and task data you create within the app</li>
              <li>Chat messages shared within your family groups</li>
            </ul>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>Provide, maintain, and improve our family task management services</li>
              <li>Send you notifications about task assignments and family activity (with your permission)</li>
              <li>Track your progress and display achievements within the app</li>
              <li>Respond to your comments, questions, and support requests</li>
            </ul>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              3. Push Notifications
            </h2>
            <p className="text-muted-foreground mb-6">
              If you enable push notifications, we use Firebase Cloud Messaging (FCM) to deliver notifications about task assignments, completions, and family chat messages. You can disable notifications at any time through your device settings or the app's personal settings page.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              4. Data Storage and Security
            </h2>
            <p className="text-muted-foreground mb-6">
              Your data is stored securely using Supabase, which provides industry-standard security measures including encryption at rest and in transit. We implement row-level security to ensure you can only access data within your own family groups.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>Supabase: Database and authentication services</li>
              <li>Firebase: Push notification delivery</li>
            </ul>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              6. Data Sharing
            </h2>
            <p className="text-muted-foreground mb-6">
              We do not sell, trade, or rent your personal information to third parties. Your family data is only shared with members of your family groups within the app.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              7. Your Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data at: <a href="https://familyhuddletasks.com/delete-account" className="text-primary hover:underline">familyhuddletasks.com/delete-account</a></li>
              <li>Opt out of push notifications</li>
              <li>Leave family groups at any time</li>
            </ul>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-muted-foreground mb-6">
              Our app is designed for family use. Children under 13 should use the app under parental supervision. Parents or guardians are responsible for managing their children's accounts within family groups.
            </p>

            <h2 className="font-display font-semibold text-xl text-foreground mt-8 mb-4">
              9. Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us through the app's support channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;