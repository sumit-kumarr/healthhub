
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileSidebarControlsProps {
  onClose: () => void;
}

const MobileSidebarControls = ({ onClose }: MobileSidebarControlsProps) => {
  return (
    <div className="md:hidden p-4 flex justify-end">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose}
        className="text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-full"
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobileSidebarControls;
