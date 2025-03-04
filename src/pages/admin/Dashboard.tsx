
import { Activity, AlertTriangle, Database, DownloadCloud, TrendingUp, User, UserPlus, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import { StatCard } from "@/components/ui/stat-card";

const AdminDashboardPage = () => {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <AdminNavigation />
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={Users}
              title="Total Users"
              value="2,345"
              description="Active accounts"
              trend="up"
              trendValue="12% from last month"
            />
            
            <StatCard
              icon={Activity}
              title="System Health"
              value="99.9%"
              description="Uptime this month"
              trend="neutral"
              trendValue="Stable"
            />
            
            <StatCard
              icon={Database}
              title="Database"
              value="1,024"
              description="Total entries"
              trend="up"
              trendValue="56 new this week"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent User Registrations</CardTitle>
                <CardDescription>New users in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">User {i}</p>
                        <p className="text-sm text-muted-foreground">Joined {i} day{i !== 1 ? 's' : ''} ago</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Users
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Recent administrative actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 py-2 border-b">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <UserPlus className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">New user account approved</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-2 border-b">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Database backup completed</p>
                      <p className="text-sm text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-2 border-b">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">System update deployed</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-2 border-b">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Security alert resolved</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <DownloadCloud className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Data export completed</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
