
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Home, 
  Heart, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search,
  Activity,
  BarChart2, 
  Brain,
  Pill,
  Users,
  Utensils,
  MessageSquare,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

// Helper function to determine active status
const isLinkActive = (pathname: string, href: string) => {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(href);
};

const Layout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Close the sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  const mainNavItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/health-conditions", label: "Health Conditions", icon: <Activity className="h-5 w-5" /> },
    { href: "/medicines", label: "Medicines", icon: <Pill className="h-5 w-5" /> },
    { href: "/mental-health", label: "Mental Health", icon: <Brain className="h-5 w-5" /> },
    { href: "/fitness", label: "Fitness", icon: <BarChart2 className="h-5 w-5" /> },
    { href: "/diet", label: "Diet & Nutrition", icon: <Utensils className="h-5 w-5" /> },
    { href: "/community", label: "Community", icon: <MessageSquare className="h-5 w-5" /> },
  ];
  
  const sidebarClasses = isSidebarOpen 
    ? "fixed inset-y-0 left-0 transform translate-x-0 transition-transform duration-300 ease-in-out z-50"
    : "fixed inset-y-0 left-0 transform -translate-x-full transition-transform duration-300 ease-in-out z-50 md:translate-x-0";
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile header */}
      <header className="bg-sidebar border-b border-sidebar-border md:hidden py-4 px-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-sidebar-foreground"
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <Link to="/" className="text-sidebar-foreground text-xl font-bold">
          HealthTech
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
          className="text-sidebar-foreground"
        >
          <Link to="/medicines">
            <Search className="h-5 w-5" />
          </Link>
        </Button>
      </header>
      
      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="h-full w-64 bg-sidebar text-sidebar-foreground flex flex-col">
          {/* Close button - mobile only */}
          <div className="md:hidden p-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(false)}
              className="text-sidebar-foreground"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Brand */}
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/" className="text-xl font-bold">
              HealthTech
            </Link>
          </div>
          
          {/* Main navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <NavLink 
                    to={item.href}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="relative">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">My Account</span>
                </div>
              </Button>
              
              {isProfileMenuOpen && (
                <div className="absolute bottom-full mb-2 w-full bg-popover rounded-md shadow-md border border-border overflow-hidden">
                  <ul className="py-1">
                    <li>
                      <NavLink 
                        to="/profile" 
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-3 py-2 transition-colors ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`
                        }
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </NavLink>
                    </li>
                    
                    {user?.email === "admin@example.com" && (
                      <li>
                        <NavLink 
                          to="/admin" 
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 transition-colors ${
                              isActive
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            }`
                          }
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </NavLink>
                      </li>
                    )}
                    
                    <li>
                      <NavLink 
                        to="/medicines/search" 
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-3 py-2 transition-colors ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`
                        }
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Search className="h-4 w-4" />
                        <span>Search Medicines</span>
                      </NavLink>
                    </li>
                    
                    <li>
                      <NavLink 
                        to="/settings" 
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-3 py-2 transition-colors ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`
                        }
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </NavLink>
                    </li>
                    
                    <li>
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          signOut();
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      
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
