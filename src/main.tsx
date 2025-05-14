
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a stable root element to prevent blank screen issues
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there is an element with id 'root' in the HTML");
}

// Wait for DOM to fully load before rendering
const renderApp = () => {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error("Error rendering application:", error);
  }
};

// Ensure the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
