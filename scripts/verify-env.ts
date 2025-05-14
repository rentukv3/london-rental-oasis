import { config } from 'dotenv';
import { resolve } from 'path';

function verifyEnv() {
  // Cargar variables de entorno
  config({ path: resolve(__dirname, '../.env') });

  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_APP_URL',
  ];

  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:');
    missingVars.forEach((envVar) => console.error(`- ${envVar}`));
    process.exit(1);
  }

  console.log('All required environment variables are set!');
}

verifyEnv(); 