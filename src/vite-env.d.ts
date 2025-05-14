
/// <reference types="vite/client" />

// Extend the Json type to work with our PropertyFeatures and PropertyImage types
declare module "@/integrations/supabase/types" {
  interface Json {
    [key: string]: any;
  }
}

// Add a global type for Json
declare type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
