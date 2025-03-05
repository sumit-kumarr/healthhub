import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/contexts/auth";
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
import AdminLoginPage from "./pages/auth/AdminLogin";
import ResetPasswordPage from "./pages/ResetPassword";
import MedicineSearchPage from "./pages/MedicineSearch";
import MedicineDetailsPage from "./pages/MedicineDetails";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminMedicinesPage from "./pages/admin/Medicines";
import AdminUsersPage from "./pages/admin/Users";
import NotificationsPage from "./pages/Notifications";
import HealthAssessmentPage from "./pages/HealthAssessment";
import GymPage from "./pages/Gym";

const queryClient = new QueryClient();

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

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.email !== "admin@example.com") {
    return <Navigate to="/" replace />;
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
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              
              <Route 
                path="/" 
                element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route 
                  path="/fitness" 
                  element={
                    <ProtectedRoute>
                      <FitnessPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/gym" 
                  element={
                    <ProtectedRoute>
                      <GymPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/diet" 
                  element={
                    <ProtectedRoute>
                      <DietPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/mental-health" 
                  element={
                    <ProtectedRoute>
                      <MentalHealthPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/health-conditions" 
                  element={
                    <ProtectedRoute>
                      <HealthConditionsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/health-assessment" 
                  element={
                    <ProtectedRoute>
                      <HealthAssessmentPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/community" 
                  element={
                    <ProtectedRoute>
                      <CommunityPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/notifications" 
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/medicine-search" 
                  element={
                    <ProtectedRoute>
                      <MedicineSearchPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/medicine/:id" 
                  element={
                    <ProtectedRoute>
                      <MedicineDetailsPage />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminDashboardPage />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/medicines" 
                  element={
                    <AdminRoute>
                      <AdminMedicinesPage />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <AdminRoute>
                      <AdminUsersPage />
                    </AdminRoute>
                  } 
                />
                
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
