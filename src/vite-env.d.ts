
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

// Ignore type checking for Deno-specific edge function imports
// These are only used in the Supabase edge functions
declare module "https://deno.land/std@0.177.0/http/server.ts" {
  export function serve(handler: any): void;
}

declare module "https://esm.sh/@supabase/supabase-js@2.39.0" {
  export function createClient(url: string, key: string, options?: any): any;
}

// Declare Deno global for edge functions
declare namespace Deno {
  export const env: {
    get(key: string): string | undefined;
  };
}
