
import { Link } from "react-router-dom";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

const MobileHeader = ({ onMenuToggle }: MobileHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-sidebar shadow-sm border-b border-sidebar-border md:hidden py-3 px-4 flex items-center justify-between z-30">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onMenuToggle}
        className="text-sidebar-foreground"
      >
        <Menu className="h-6 w-6" />
      </Button>
      
      <Link to="/" className="text-sidebar-foreground text-xl font-bold flex items-center">
        <span className="text-primary">Health</span>
        <span>Tech</span>
      </Link>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
          className="text-sidebar-foreground"
        >
          <Link to="/notifications">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>
        
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
      </div>
    </header>
  );
};

export default MobileHeader;
