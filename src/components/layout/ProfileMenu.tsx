
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { User, Settings, LogOut, Search, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const ProfileMenu = () => {
  const { user, signOut } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
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
  );
};

export default ProfileMenu;
