import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import DeleteAccount from "./pages/DeleteAccount";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import ResetPassword from "./pages/ResetPassword";
import AppLinkTest from "./pages/AppLinkTest";
import NotFound from "./pages/NotFound";
import YLCIndex from "./pages/yourlangcoach/Index";
import YLCTerms from "./pages/yourlangcoach/Terms";
import YLCPrivacy from "./pages/yourlangcoach/Privacy";
import YLCRefund from "./pages/yourlangcoach/Refund";
import YLCDeleteAccount from "./pages/yourlangcoach/DeleteAccount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/reset" element={<ResetPassword />} />
          <Route path="/auth/app-link-test" element={<AppLinkTest />} />
          <Route path="/yourlangcoach" element={<YLCIndex />} />
          <Route path="/yourlangcoach/terms" element={<YLCTerms />} />
          <Route path="/yourlangcoach/privacy" element={<YLCPrivacy />} />
          <Route path="/yourlangcoach/refund" element={<YLCRefund />} />
          <Route path="/yourlangcoach/delete-account" element={<YLCDeleteAccount />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
