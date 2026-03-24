import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Smartphone } from "lucide-react";

const AppLinkTest = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            App Link Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            If Android App Links are configured correctly, tapping the link below on an Android device should open the Family Huddle app directly.
          </p>
          <a
            href="https://familyhuddletasks.com/auth/reset"
            className="block text-primary underline font-medium break-all"
          >
            https://familyhuddletasks.com/auth/reset
          </a>
          <p className="text-xs text-muted-foreground">
            If the link opens in a browser instead of the app, verify that the <code>assetlinks.json</code> file is correctly configured and the SHA-256 fingerprint matches your app signing key.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-sm text-primary hover:underline mt-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppLinkTest;
