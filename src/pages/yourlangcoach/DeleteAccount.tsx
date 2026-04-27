import { useState, useEffect } from "react";
import { ylcSupabase as supabase } from "@/integrations/supabase/ylc-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, CheckCircle, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

const DeleteAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAuthLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }

    setError(null);
    setDeleteLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to delete your account");
      }

      const { error } = await supabase.functions.invoke("delete-account", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      await supabase.auth.signOut();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ylc-theme min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="ylc-theme min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-xl">Account Deleted</CardTitle>
            <CardDescription>
              Your account and all associated data have been permanently deleted.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/yourlangcoach">
              <Button variant="gradient" className="w-full">
                Return to YourLangCoach
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="ylc-theme min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link
          to="/yourlangcoach"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to YourLangCoach
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Delete Your Account</CardTitle>
            <CardDescription>
              Request permanent deletion of your YourLangCoach account and all associated data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>What happens when you delete your account</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <p>Deleting your account will permanently remove:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Your profile information (name, email)</li>
                  <li>Your personal dictionary entries</li>
                  <li>Your workbook materials and uploads</li>
                  <li>Your practice history and learning progress</li>
                  <li>Your notification preferences and settings</li>
                </ul>
                <p className="font-medium mt-3">
                  This action is irreversible. You will not be able to recover your data.
                </p>
                <p className="mt-3">
                  If you purchased a subscription through Apple App Store or Google Play, deleting
                  your account does <strong>not</strong> automatically cancel your subscription.
                  You must also cancel through the store where you purchased it.
                </p>
              </AlertDescription>
            </Alert>

            <div className="text-sm text-muted-foreground">
              <p>
                Need help? Contact us at{" "}
                <a
                  href="mailto:support@familyhuddletasks.com"
                  className="text-primary hover:underline"
                >
                  support@familyhuddletasks.com
                </a>
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!user ? (
              <div className="border rounded-lg p-6 bg-muted/30">
                <h3 className="font-semibold mb-4">Sign in to continue</h3>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={authLoading}
                  >
                    {authLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="border border-destructive/30 rounded-lg p-6 bg-destructive/5">
                <h3 className="font-semibold mb-2">Confirm Account Deletion</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Signed in as <span className="font-medium text-foreground">{user.email}</span>
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="confirm">
                      Type <span className="font-mono font-bold">DELETE</span> to confirm
                    </Label>
                    <Input
                      id="confirm"
                      type="text"
                      placeholder="Type DELETE here"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                      className="font-mono"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => supabase.auth.signOut()}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={deleteLoading || confirmText !== "DELETE"}
                      className="flex-1"
                    >
                      {deleteLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Deleting...
                        </>
                      ) : (
                        "Delete My Account"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeleteAccount;
