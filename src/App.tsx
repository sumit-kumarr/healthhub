
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import HomePage from "./pages/Index";
import FitnessPage from "./pages/Fitness";
import DietPage from "./pages/Diet";
import MentalHealthPage from "./pages/MentalHealth";
import HealthConditionsPage from "./pages/HealthConditions";
import CommunityPage from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout>
                <HomePage />
              </Layout>
            } />
            <Route path="/fitness" element={
              <Layout>
                <FitnessPage />
              </Layout>
            } />
            <Route path="/diet" element={
              <Layout>
                <DietPage />
              </Layout>
            } />
            <Route path="/mental-health" element={
              <Layout>
                <MentalHealthPage />
              </Layout>
            } />
            <Route path="/health-conditions" element={
              <Layout>
                <HealthConditionsPage />
              </Layout>
            } />
            <Route path="/community" element={
              <Layout>
                <CommunityPage />
              </Layout>
            } />
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
