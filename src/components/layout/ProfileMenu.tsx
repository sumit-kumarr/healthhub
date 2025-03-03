
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, Search, LayoutDashboard, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 border-t border-sidebar-border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-2 hover:bg-sidebar-accent/30 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src={user?.email ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}` : undefined} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="font-medium text-sm">{user?.email?.split('@')[0] || "User"}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">{user?.email || ""}</span>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56 p-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <NavLink to="/profile" className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </NavLink>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <NavLink to="/notifications" className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </div>
              <span>Notifications</span>
            </NavLink>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <NavLink to="/medicine-search" className="flex items-center gap-2 cursor-pointer">
              <Search className="h-4 w-4" />
              <span>Search Medicines</span>
            </NavLink>
          </DropdownMenuItem>
          
          {user?.email === "admin@example.com" && (
            <DropdownMenuItem asChild>
              <NavLink to="/admin" className="flex items-center gap-2 cursor-pointer">
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </NavLink>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem asChild>
            <NavLink to="/settings" className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </NavLink>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleSignOut}
            className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
