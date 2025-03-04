
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAuthActions = () => {
  const { toast } = useToast();

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
      }

      toast({
        title: "Success!",
        description: "Check your email for confirmation link.",
        variant: "default",
      });
      return { error: null, data };
    } catch (error: any) {
      toast({
        title: "Unexpected Error",
        description: error.message,
        variant: "destructive",
      });
      return { error, data: null };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
      }

      toast({
        title: "Welcome Back!",
        description: "You have successfully signed in.",
      });
      return { error: null, data };
    } catch (error: any) {
      toast({
        title: "Unexpected Error",
        description: error.message,
        variant: "destructive",
      });
      return { error, data: null };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error Signing Out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
      }

      toast({
        title: "Check Your Email",
        description: "We've sent a password reset link to your email.",
      });
      return { error: null, data };
    } catch (error: any) {
      toast({
        title: "Unexpected Error",
        description: error.message,
        variant: "destructive",
      });
      return { error, data: null };
    }
  };

  const updateProfile = async (data: { first_name?: string; last_name?: string; avatar_url?: string }) => {
    try {
      const user = supabase.auth.getUser().then(({ data }) => data.user);
      if (!user) {
        return { error: new Error("User is not authenticated") };
      }

      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", (await user).id);

      if (error) {
        toast({
          title: "Update Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Unexpected Error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile
  };
};
