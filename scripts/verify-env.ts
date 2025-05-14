// Simple script to verify environment variables
console.log('Verifying environment variables...');

// List of required environment variables
const requiredEnvVars: string[] = [
  // Add your required environment variables here
  // Example: 'VITE_API_URL',
];

let missingVars = false;

// Check each required environment variable
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    missingVars = true;
  }
}

if (missingVars) {
  process.exit(1);
} else {
  console.log('All required environment variables are set!');
  process.exit(0);
}
