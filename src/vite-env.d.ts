
/// <reference types="vite/client" />

// Extend the Json type to work with our PropertyFeatures and PropertyImage types
declare module "@/integrations/supabase/types" {
  interface Json {
    [key: string]: any;
  }
}

// Add the env variables typing
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_APP_URL: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add a global type for Json
declare type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
