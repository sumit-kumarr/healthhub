
import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

const MobileHeader = ({ onMenuToggle }: MobileHeaderProps) => {
  return (
    <header className="bg-sidebar border-b border-sidebar-border md:hidden py-4 px-6 flex items-center justify-between">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onMenuToggle}
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
  );
};

export default MobileHeader;
