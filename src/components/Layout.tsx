
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileHeader from "./layout/MobileHeader";
import Sidebar from "./layout/Sidebar";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !user && !location.pathname.includes('/auth')) {
      navigate('/auth');
    }
  }, [user, loading, navigate, location.pathname]);
  
  // Close the sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile header */}
      <MobileHeader onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Main sidebar component */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        onCloseMobile={() => setIsSidebarOpen(false)}
        isMobile={isMobile}
      />
      
      {/* Mobile sidebar backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main content */}
      <main className="flex-1 md:pl-64 pt-[60px] md:pt-0">
        <div className="mx-auto w-full max-w-7xl p-4">
          <Outlet />
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Layout;
