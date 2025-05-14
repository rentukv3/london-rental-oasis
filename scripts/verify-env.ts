
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Define required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_APP_URL',
  'VITE_APP_NAME'
];

// Check if .env file exists
const envPath = path.resolve(process.cwd(), '.env');
const prodEnvPath = path.resolve(process.cwd(), '.env.production');
const examplePath = path.resolve(process.cwd(), '.env.example');

// Try to load from .env or .env.production or .env.example
let envVars: Record<string, string> = {};

if (fs.existsSync(envPath)) {
  console.log('Using .env file for environment variables.');
  const envContent = dotenv.parse(fs.readFileSync(envPath));
  envVars = { ...envVars, ...envContent };
} else if (fs.existsSync(prodEnvPath)) {
  console.log('Using .env.production file for environment variables.');
  const prodEnvContent = dotenv.parse(fs.readFileSync(prodEnvPath));
  envVars = { ...envVars, ...prodEnvContent };
} else if (fs.existsSync(examplePath)) {
  console.log('Using .env.example file for environment variables.');
  const exampleContent = dotenv.parse(fs.readFileSync(examplePath));
  envVars = { ...envVars, ...exampleContent };
} else {
  console.error('No environment file found. Please create a .env file.');
  process.exit(1);
}

// Check if all required variables are defined
const missingVars = requiredEnvVars.filter(varName => {
  return !envVars[varName] || envVars[varName] === '' || envVars[varName].includes('${');
});

if (missingVars.length > 0) {
  console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
} else {
  console.log('Environment variables validation passed!');
}
