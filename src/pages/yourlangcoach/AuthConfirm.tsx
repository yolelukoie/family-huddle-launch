import { useEffect, useState } from "react";
import { ylcSupabase } from "@/integrations/supabase/ylc-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import ylcLogo from "@/assets/yourlangcoach-logo.png";

type Status = "loading" | "error";

const YLCAuthConfirm = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const url = new URL(window.location.href);
        const tokenHash = url.searchParams.get("token_hash");
        const type = url.searchParams.get("type");
        const next = url.searchParams.get("next") || "/yourlangcoach/auth/reset";
        const code = url.searchParams.get("code");

        if (tokenHash && type) {
          const { error } = await ylcSupabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as any,
          });
          if (error) throw error;
        } else if (code) {
          const { error } = await ylcSupabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else {
          throw new Error("Missing confirmation token in the URL.");
        }

        // Normalize redirect target to live within /yourlangcoach
        const target = next.startsWith("/yourlangcoach")
          ? next
          : `/yourlangcoach${next.startsWith("/") ? next : `/${next}`}`;

        window.location.replace(target);
      } catch (err: any) {
        setStatus("error");
        setErrorMsg(
          err?.message ||
            "This link is invalid or expired. Please request a new email from the app."
        );
      }
    };

    run();
  }, []);

  return (
    <div className="ylc-theme min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center pb-2">
          <img
            src={ylcLogo}
            alt="YourLangCoach logo"
            className="mx-auto mb-3 h-14 w-14 rounded-2xl object-cover"
          />
          <CardTitle className="text-xl font-bold text-foreground">
            {status === "loading" ? "Verifying your link…" : "Link invalid"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">YourLangCoach</p>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default YLCAuthConfirm;
