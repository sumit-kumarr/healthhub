
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Shield, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";

const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof adminLoginSchema>) => {
    setIsLoading(true);
    try {
      // For now, we'll hardcode the admin validation
      // In a real app, this would be validated on the server side
      if (data.email === "admin@example.com") {
        const { error } = await signIn(data.email, data.password);
        if (!error) {
          toast({
            title: "Admin access granted",
            description: "Welcome to the admin dashboard",
          });
          navigate('/admin');
        }
      } else {
        toast({
          title: "Access denied",
          description: "This account does not have admin privileges",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred while trying to log in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold">Admin Access</h1>
          <p className="mt-2 text-muted-foreground">Login to access the admin dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Only authorized personnel can access this area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Authenticating..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Access Dashboard
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="link" onClick={() => navigate('/auth')}>
              Return to regular login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
