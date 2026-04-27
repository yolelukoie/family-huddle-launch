import { useState, useEffect } from "react";
import { ylcSupabase } from "@/integrations/supabase/ylc-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import ylcLogo from "@/assets/yourlangcoach-logo.png";

type PageState = "loading" | "ready" | "success" | "error";

const YLCResetPassword = () => {
  const [pageState, setPageState] = useState<PageState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const establishSession = async () => {
      try {
        const url = new URL(window.location.href);
        const tokenHash = url.searchParams.get("token_hash");
        const type = url.searchParams.get("type");
        const code = url.searchParams.get("code");
        const hashParams = new URLSearchParams(url.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (tokenHash && type) {
          // Modern Supabase recovery link format
          const { error } = await ylcSupabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as any,
          });
          if (error) throw error;
        } else if (code) {
          // Legacy PKCE flow
          const { error } = await ylcSupabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (accessToken && refreshToken) {
          // Legacy hash-token flow
          const { error } = await ylcSupabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
        } else {
          // No tokens in URL — see if /auth/confirm already established a session
          const { data: { session } } = await ylcSupabase.auth.getSession();
          if (!session) {
            throw new Error(
              "No recovery session found. Please request a new password-reset email from the app."
            );
          }
        }

        setPageState("ready");
      } catch (err: any) {
        setPageState("error");
        setErrorMessage(
          err?.message || "This link is invalid or expired. Request a new reset email."
        );
      }
    };

    establishSession();
  }, []);

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
      const { error } = await ylcSupabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPageState("success");
    } catch (err: any) {
      setFormError(err?.message || "Failed to update password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ylc-theme min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img
            src={ylcLogo}
            alt="YourLangCoach logo"
            className="mx-auto mb-4 h-16 w-16 rounded-2xl object-cover"
          />
          <CardTitle className="text-2xl font-bold text-foreground">
            Reset your password
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">YourLangCoach</p>
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
                You can now return to the YourLangCoach app and sign in with your new password.
              </p>
            </div>
          )}

          {pageState === "ready" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Choose a new password for your YourLangCoach account.
              </p>

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

              <Button type="submit" className="w-full" variant="gradient" disabled={submitting}>
                {submitting ? "Updating…" : "Update password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default YLCResetPassword;
