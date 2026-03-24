import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, KeyRound, ExternalLink } from "lucide-react";

type PageState = "loading" | "ready" | "success" | "error";

const ResetPassword = () => {
  const [pageState, setPageState] = useState<PageState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const deepLinkAttempted = useRef(false);

  useEffect(() => {
    const establishSession = async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const hashParams = new URLSearchParams(url.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const type = url.searchParams.get("type") || hashParams.get("type");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
        } else if (type !== "recovery") {
          // No tokens and not a recovery type — check if there's already a session
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            throw new Error("No recovery credentials found");
          }
        }

        setPageState("ready");

        // Attempt deep link on load
        if (!deepLinkAttempted.current) {
          deepLinkAttempted.current = true;
          attemptDeepLink();
          setTimeout(() => setShowFallback(true), 1200);
        }
      } catch (err: any) {
        setPageState("error");
        setErrorMessage(
          err?.message || "This link is invalid or expired. Request a new reset email."
        );
      }
    };

    establishSession();
  }, []);

  const attemptDeepLink = () => {
    window.location.href = window.location.href;
  };

  const handleOpenApp = () => {
    attemptDeepLink();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (newPassword.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPageState("success");
    } catch (err: any) {
      setFormError(err?.message || "Failed to update password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Reset your password
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {pageState === "loading" && (
            <p className="text-center text-muted-foreground">
              Verifying your reset link…
            </p>
          )}

          {pageState === "error" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage || "This link is invalid or expired. Request a new reset email."}
              </AlertDescription>
            </Alert>
          )}

          {pageState === "success" && (
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <p className="text-foreground font-medium">
                Password updated successfully!
              </p>
              <p className="text-sm text-muted-foreground">
                You can now open the app and log in with your new password.
              </p>
              <Button onClick={handleOpenApp} className="w-full" variant="gradient">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open the Family Huddle app
              </Button>
            </div>
          )}

          {pageState === "ready" && (
            <>
              <div className="text-center space-y-3">
                <Button onClick={handleOpenApp} className="w-full" variant="gradient" size="lg">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open the Family Huddle app
                </Button>
                <p className="text-xs text-muted-foreground">
                  If the app doesn't open, you can reset your password below.
                </p>
              </div>

              {showFallback && (
                <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-border">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>

                  {formError && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Updating…" : "Update password"}
                  </Button>
                </form>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
