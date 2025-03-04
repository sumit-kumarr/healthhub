import { Link } from "react-router-dom";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

const MobileHeader = ({ onMenuToggle }: MobileHeaderProps) => {
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      setUnreadNotifications(3);
    } else {
      setUnreadNotifications(0);
    }
  }, [user]);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-sidebar shadow-md border-b border-sidebar-border md:hidden py-3 px-4 flex items-center justify-between z-30">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onMenuToggle}
        className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
      >
        <Menu className="h-6 w-6" />
      </Button>
      
      <Link to="/" className="text-sidebar-foreground text-xl font-bold flex items-center absolute left-1/2 transform -translate-x-1/2">
        <span className="text-primary">Health</span>
        <span>Tech</span>
      </Link>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
          className="text-sidebar-foreground relative"
        >
          <Link to="/notifications">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
          className="text-sidebar-foreground"
        >
          <Link to="/medicine-search">
            <Search className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default MobileHeader;
