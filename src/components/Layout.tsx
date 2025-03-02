
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileHeader from "./layout/MobileHeader";
import Sidebar from "./layout/Sidebar";
import ProfileMenu from "./layout/ProfileMenu";
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
      
      {/* Sidebar with fully rendered components inside */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      
      {/* Handle closing sidebar on mobile with X button */}
      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar">
            <MobileSidebarControls onClose={() => setIsSidebarOpen(false)} />
            <div className="p-6 border-b border-sidebar-border">
              <span className="text-xl font-bold">HealthTech</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {/* The sidebar navigation items are rendered in the Sidebar component */}
            </div>
            <ProfileMenu />
          </div>
        </>
      )}
      
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
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
