
/// <reference types="vite/client" />

// Extend the Json type to work with our PropertyFeatures and PropertyImage types
declare module "@/integrations/supabase/types" {
  interface Json {
    [key: string]: any;
  }
}
