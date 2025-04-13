
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CrowdfundingProvider } from "@/context/CrowdfundingContext";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CampaignDetail from "./pages/CampaignDetail";
import CreateCampaign from "./pages/CreateCampaign";
import ExplorePage from "./pages/ExplorePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CrowdfundingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/campaign/:id" element={<CampaignDetail />} />
                <Route path="/create" element={<CreateCampaign />} />
                <Route path="/explore" element={<ExplorePage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="bg-muted py-6 px-4 md:px-6">
              <div className="container mx-auto text-center text-sm text-muted-foreground">
                <p>© 2025 FundMyProject. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </CrowdfundingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
