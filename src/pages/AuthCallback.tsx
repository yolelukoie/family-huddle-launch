import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, ExternalLink, Loader2 } from "lucide-react";

const APP_OPEN_URL = "https://familyhuddletasks.com/app/open?next=/tasks";

const AuthCallback = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [showFallback, setShowFallback] = useState(false);
  const attempted = useRef(false);

  useEffect(() => {
    const handle = async () => {
      try {
        // Supabase JS client auto-handles the hash/code exchange via onAuthStateChange,
        // but we can also do it explicitly:
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }

        // Check for session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          // Wait briefly for onAuthStateChange to fire (hash fragment flow)
          await new Promise((resolve) => setTimeout(resolve, 1500));
          const { data: { session: s2 } } = await supabase.auth.getSession();
          if (!s2) throw new Error("No session established");
        }

        setStatus("success");

        // Auto deep-link attempt
        if (!attempted.current) {
          attempted.current = true;
          window.location.href = APP_OPEN_URL;
          setTimeout(() => setShowFallback(true), 1200);
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMsg(err?.message || "Authentication failed.");
      }
    };

    handle();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-bold text-foreground">
            {status === "loading" ? "Signing you in…" : status === "error" ? "Something went wrong" : "You're signed in!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" && (
            <div className="flex justify-center py-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          {status === "success" && (
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <Button
                onClick={() => { window.location.href = APP_OPEN_URL; }}
                className="w-full"
                variant="gradient"
                size="lg"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open the Family Huddle app
              </Button>
              {showFallback && (
                <p className="text-xs text-muted-foreground">
                  If the app didn't open, you can return to it manually. You're already signed in.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;
