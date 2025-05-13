
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import DonatorSignup from "./pages/DonatorSignup";
import InstitutionSignup from "./pages/InstitutionSignup";
import Auth from "./pages/Auth";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";
import Donate from "./pages/Donate";
import DonateProcess from "./pages/DonateProcess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donator-signup" element={<DonatorSignup />} />
            <Route path="/institution-signup" element={<InstitutionSignup />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/minha-conta" element={<MyAccount />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donate/:id" element={<DonateProcess />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
