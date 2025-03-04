import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, Pill, Activity, Calendar, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";

const StatCard = ({ title, value, icon, description, linkText, linkUrl }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  linkText?: string;
  linkUrl?: string;
}) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
      {linkText && linkUrl && (
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="ghost" 
            className="p-0 h-auto text-xs flex items-center"
            onClick={() => navigate(linkUrl)}
          >
            {linkText} <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMedicines: 0,
    recentActivity: 0,
  });
  
  useEffect(() => {
    const fetchStats = async () => {
      // Fetch total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Fetch total medicines  
      const { count: medicineCount } = await supabase
        .from('medicines')
        .select('*', { count: 'exact', head: true });
        
      setStats({
        totalUsers: userCount || 0,
        totalMedicines: medicineCount || 0,
        recentActivity: 5, // Placeholder for recent activity
      });
    };
    
    fetchStats();
  }, []);

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Admin Dashboard"
        description="Monitor and manage your health platform"
        align="left"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers}
          icon={<Users className="h-4 w-4" />}
          description="Registered users"
          linkText="View all users"
          linkUrl="/admin/users"
        />
        <StatCard 
          title="Medicines" 
          value={stats.totalMedicines}
          icon={<Pill className="h-4 w-4" />}
          description="Medicines in database"
          linkText="Manage medicines"
          linkUrl="/admin/medicines"
        />
        <StatCard 
          title="Recent Activity" 
          value={stats.recentActivity}
          icon={<Activity className="h-4 w-4" />}
          description="Actions in last 24h"
        />
        <StatCard 
          title="Platform Status" 
          value="Online"
          icon={<Calendar className="h-4 w-4" />}
          description="Last checked: Just now"
        />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used admin actions
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <Button onClick={() => navigate('/admin/medicines')} className="h-auto py-4 flex flex-col items-center justify-center space-y-2 w-full">
                <Pill className="h-5 w-5" />
                <span>Add Medicine</span>
              </Button>
              <Button onClick={() => navigate('/admin/users')} className="h-auto py-4 flex flex-col items-center justify-center space-y-2 w-full">
                <User className="h-5 w-5" />
                <span>Manage Users</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center space-y-2 w-full">
                <Activity className="h-5 w-5" />
                <span>View Activity</span>
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>
                  Recently registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No recent users to display.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => navigate('/admin/users')}>
                  View All Users
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Medicines</CardTitle>
                <CardDescription>
                  Recently added medicines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No recent medicines to display.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => navigate('/admin/medicines')}>
                  View All Medicines
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>
                User growth and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Reports</CardTitle>
              <CardDescription>
                Generated reports and exports
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Reports feature coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
