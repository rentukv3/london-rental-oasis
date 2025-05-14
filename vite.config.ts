
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno con prefijo VITE_
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  
  return {
    server: {
      host: "::",
      port: 8080,
      // Agregar configuración de seguridad
      strictPort: true,
      hmr: {
        overlay: true
      }
    },
    plugins: [
      react(),
      // Solo usar componentTagger en desarrollo
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Solo exponer variables de entorno con prefijo VITE_
      'process.env': Object.keys(env).reduce((acc, key) => {
        acc[key] = JSON.stringify(env[key]);
        return acc;
      }, {})
    },
    build: {
      sourcemap: mode === 'development',
      // Optimizaciones de build
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
            // Agregar más chunks para mejor code splitting
            utils: ['date-fns', 'lodash'],
            forms: ['react-hook-form', 'zod']
          },
          // Optimizar nombres de archivos
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        },
      },
    },
    // Agregar optimizaciones de caché
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
    },
    // Configuración de CSS
    css: {
      devSourcemap: mode === 'development',
      modules: {
        localsConvention: 'camelCase'
      }
    }
  };
});
