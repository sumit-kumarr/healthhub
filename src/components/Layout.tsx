
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Dumbbell, 
  Salad, 
  Brain, 
  Heart, 
  Users, 
  Moon, 
  Sun, 
  Menu, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Fitness", path: "/fitness", icon: Dumbbell },
  { name: "Diet", path: "/diet", icon: Salad },
  { name: "Mental Health", path: "/mental-health", icon: Brain },
  { name: "Health Conditions", path: "/health-conditions", icon: Heart },
  { name: "Community", path: "/community", icon: Users },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent content flash before theme loads
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-background border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 bg-primary rounded-full flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-semibold">HealthHub</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background pt-16 animate-fade-in">
          <div className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-4 text-lg",
                  location.pathname === item.path
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r p-4">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="relative h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold">HealthHub</span>
          </Link>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>GM</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">Guest</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
