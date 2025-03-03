
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileHeader from "./layout/MobileHeader";
import Sidebar from "./layout/Sidebar";
import MobileSidebarControls from "./layout/MobileSidebarControls";

const Layout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
        <Dialog open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <DialogContent className="hidden" />
        </Dialog>
      )}
      
      {/* Main content */}
      <main className="flex-1 md:pl-64">
        <div className="mx-auto">
          <Outlet />
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Layout;
