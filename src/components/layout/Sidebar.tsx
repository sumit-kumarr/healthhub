
import { Link, NavLink } from "react-router-dom";
import { 
  Home, 
  Activity,
  BarChart2, 
  Brain,
  Pill,
  Utensils,
  MessageSquare,
  Dumbbell,
} from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import MobileSidebarControls from "./MobileSidebarControls";

interface SidebarProps {
  isSidebarOpen: boolean;
  onCloseMobile: () => void;
  isMobile: boolean;
}

export const mainNavItems = [
  { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  { href: "/health-conditions", label: "Health Conditions", icon: <Activity className="h-5 w-5" /> },
  { href: "/medicines", label: "Medicines", icon: <Pill className="h-5 w-5" /> },
  { href: "/mental-health", label: "Mental Health", icon: <Brain className="h-5 w-5" /> },
  { href: "/fitness", label: "Fitness", icon: <BarChart2 className="h-5 w-5" /> },
  { href: "/gym", label: "Gym", icon: <Dumbbell className="h-5 w-5" /> },
  { href: "/diet", label: "Diet & Nutrition", icon: <Utensils className="h-5 w-5" /> },
  { href: "/community", label: "Community", icon: <MessageSquare className="h-5 w-5" /> },
];

const Sidebar = ({ isSidebarOpen, onCloseMobile, isMobile }: SidebarProps) => {
  // In mobile view, we need to display the sidebar using fixed positioning with a transform
  // In desktop view, we need a static sidebar that's always visible
  const sidebarClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-[280px] overflow-hidden`
    : "fixed inset-y-0 left-0 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out md:translate-x-0 w-64";
  
  return (
    <aside className={sidebarClasses}>
      <div className="h-full w-full bg-sidebar text-sidebar-foreground flex flex-col shadow-lg">
        {/* Close button - mobile only */}
        {isMobile && <MobileSidebarControls onClose={onCloseMobile} />}
        
        {/* Brand */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-primary">Health</span>
            <span>Tech</span>
          </Link>
        </div>
        
        {/* Main navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <NavLink 
                  to={item.href}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    }`
                  }
                  onClick={isMobile ? onCloseMobile : undefined}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Profile menu at bottom */}
        <ProfileMenu />
      </div>
    </aside>
  );
};

export default Sidebar;
