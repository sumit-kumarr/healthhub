
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import HomePage from "./pages/Index";
import FitnessPage from "./pages/Fitness";
import DietPage from "./pages/Diet";
import MentalHealthPage from "./pages/MentalHealth";
import HealthConditionsPage from "./pages/HealthConditions";
import CommunityPage from "./pages/Community";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import ResetPasswordPage from "./pages/ResetPassword";
import MedicineSearchPage from "./pages/MedicineSearch";
import MedicineDetailsPage from "./pages/MedicineDetails";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminMedicinesPage from "./pages/admin/Medicines";
import AdminUsersPage from "./pages/admin/Users";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  // Here we would check if the user has admin role
  // For now, we'll just check if they're authenticated
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <Layout>
                  <HomePage />
                </Layout>
              } />
              <Route path="/fitness" element={
                <ProtectedRoute>
                  <Layout>
                    <FitnessPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/diet" element={
                <ProtectedRoute>
                  <Layout>
                    <DietPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/mental-health" element={
                <ProtectedRoute>
                  <Layout>
                    <MentalHealthPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/health-conditions" element={
                <ProtectedRoute>
                  <Layout>
                    <HealthConditionsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <Layout>
                    <CommunityPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/medicine-search" element={
                <ProtectedRoute>
                  <Layout>
                    <MedicineSearchPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/medicine/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <MedicineDetailsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <Layout>
                    <AdminDashboardPage />
                  </Layout>
                </AdminRoute>
              } />
              <Route path="/admin/medicines" element={
                <AdminRoute>
                  <Layout>
                    <AdminMedicinesPage />
                  </Layout>
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <Layout>
                    <AdminUsersPage />
                  </Layout>
                </AdminRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={
                <Layout>
                  <NotFound />
                </Layout>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
