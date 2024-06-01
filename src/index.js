import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";

// Fetching the publishable key from environment variables
const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY;

// Ensure the publishable key is available
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Create the root element for the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
  <React.StrictMode>
    {/* Wrapping the App component with ClerkProvider and passing the publishable key.
    This ensures easy access to authentication-related functionality throughout the app
    without needing to pass down props manually through multiple layers of components. */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
