
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Database, Home, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AdminNavigation() {
  const location = useLocation();
  
  const getIsActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Card className="p-4">
      <h2 className="text-lg font-medium mb-4">Admin Panel</h2>
      
      <div className="space-y-1">
        <Button
          variant={getIsActive("/admin") ? "default" : "ghost"}
          className="w-full justify-start"
          size="sm"
          asChild
        >
          <Link to="/admin">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
            {getIsActive("/admin") && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        </Button>
        
        <Button
          variant={getIsActive("/admin/users") ? "default" : "ghost"}
          className="w-full justify-start"
          size="sm"
          asChild
        >
          <Link to="/admin/users">
            <Users className="mr-2 h-4 w-4" />
            User Management
            {getIsActive("/admin/users") && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        </Button>
        
        <Button
          variant={getIsActive("/admin/medicines") ? "default" : "ghost"}
          className="w-full justify-start"
          size="sm"
          asChild
        >
          <Link to="/admin/medicines">
            <Database className="mr-2 h-4 w-4" />
            Medicine Database
            {getIsActive("/admin/medicines") && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start"
          size="sm"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </Card>
  );
}
