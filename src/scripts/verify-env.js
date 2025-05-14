
// JavaScript version of verify-env.ts
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

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

// Try to load from .env or .env.production
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = dotenv.parse(fs.readFileSync(envPath));
  envVars = { ...envVars, ...envContent };
}

if (fs.existsSync(prodEnvPath)) {
  const prodEnvContent = dotenv.parse(fs.readFileSync(prodEnvPath));
  envVars = { ...envVars, ...prodEnvContent };
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
