
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://szmpivxrkcvskgzgbeqc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bXBpdnhya2N2c2tnemdiZXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjQ2NDcsImV4cCI6MjA1NjQwMDY0N30.YiMpSL562iuBArqK_44bXD3n5Suk0vSonrh_IDDmpIM";

// Create a custom type that extends Database
type CustomDatabase = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      medicines: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: string | null;
          usage: string | null;
          side_effects: string | null;
          dosage: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          category?: string | null;
          usage?: string | null;
          side_effects?: string | null;
          dosage?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          category?: string | null;
          usage?: string | null;
          side_effects?: string | null;
          dosage?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export const supabase = createClient<CustomDatabase>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
