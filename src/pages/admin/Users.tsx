
import { useState, useEffect } from "react";
import { Search, ArrowUpDown, MoreHorizontal, Mail, Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionHeader } from "@/components/ui/section-header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof User>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();
  
  useEffect(() => {
    fetchUsers();
  }, [sortBy, sortOrder]);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch user data from the profiles table
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          avatar_url,
          created_at
        `)
        .order(sortBy, { ascending: sortOrder === "asc" });
      
      if (error) {
        throw error;
      }
      
      // For each profile, fetch the corresponding user email from auth.users
      // This is just a mock since we can't directly access auth.users
      // In a real app, you might want to store email in the profiles table as well
      
      const usersWithEmail = data?.map(profile => ({
        ...profile,
        email: `user_${profile.id.slice(0, 8)}@example.com` // Mock email
      })) || [];
      
      setUsers(usersWithEmail);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSort = (column: keyof User) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    
    return (
      fullName.includes(searchLower) ||
      (user.email && user.email.toLowerCase().includes(searchLower))
    );
  });
  
  const getInitials = (user: User) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    } else if (user.first_name) {
      return user.first_name[0].toUpperCase();
    } else if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Manage Users"
        description="View and manage user accounts on your platform"
        align="left"
      />
      
      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={fetchUsers}>
          Refresh
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">User</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  Email
                  {sortBy === "email" && (
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead 
                className="cursor-pointer hidden md:table-cell"
                onClick={() => handleSort("created_at")}
              >
                <div className="flex items-center">
                  Joined
                  {sortBy === "created_at" && (
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.avatar_url || ""} />
                      <AvatarFallback>{getInitials(user)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.first_name || user.last_name 
                      ? `${user.first_name || ""} ${user.last_name || ""}` 
                      : <span className="text-muted-foreground">Not provided</span>}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
