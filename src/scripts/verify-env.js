
// JavaScript version of verify-env.ts
const fs = require('fs');
const path = require('path');

// Define required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_APP_URL',
  'VITE_APP_NAME'
];

// Check if .env.production file exists
const envPath = path.resolve(process.cwd(), '.env.production');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env.production file not found');
  process.exit(1);
}

// Read and parse .env.production
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
  const match = line.match(/^(\w+)=(.*)$/);
  if (match) {
    const [, key, value] = match;
    acc[key] = value;
  }
  return acc;
}, {});

// Check if all required variables are defined
const missingVars = requiredEnvVars.filter(varName => {
  const value = envVars[varName];
  return value === undefined || value === '' || value.includes('${');
});

if (missingVars.length > 0) {
  console.error(`Error: Missing required environment variables in .env.production: ${missingVars.join(', ')}`);
  process.exit(1);
} else {
  console.log('Environment variables validation passed!');
}
