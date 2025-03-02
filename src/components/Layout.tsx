
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  X,
  User,
  LogOut,
  Search,
  Pill,
  LayoutDashboard,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Fitness", path: "/fitness", icon: Dumbbell },
  { name: "Diet", path: "/diet", icon: Salad },
  { name: "Mental Health", path: "/mental-health", icon: Brain },
  { name: "Health Conditions", path: "/health-conditions", icon: Heart },
  { name: "Community", path: "/community", icon: Users },
  { name: "Medicine Search", path: "/medicine-search", icon: Pill },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

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
            
            <Separator className="my-4" />
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-4 text-lg text-muted-foreground"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 py-4 text-lg text-muted-foreground"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-3 px-3 py-4 text-lg text-muted-foreground"
              >
                <LogOut className="h-5 w-5" />
                Sign In
              </Link>
            )}
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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 w-full justify-start px-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium truncate max-w-[120px]">
                      {user.email}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/medicine-search')}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search Medicines</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/auth">Sign in</Link>
              </Button>
            )}
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
