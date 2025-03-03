
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileSidebarControlsProps {
  onClose: () => void;
}

const MobileSidebarControls = ({ onClose }: MobileSidebarControlsProps) => {
  return (
    <div className="md:hidden p-4 flex justify-between items-center border-b border-sidebar-border">
      <div className="flex items-center">
        <span className="text-xl font-bold mr-2 text-primary">Health</span>
        <span className="text-xl font-bold text-sidebar-foreground">Tech</span>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose}
        className="text-sidebar-foreground hover:bg-sidebar-accent/50 hover:scale-110 transition-all duration-200 rounded-full"
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobileSidebarControls;
