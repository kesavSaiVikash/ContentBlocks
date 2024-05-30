import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Importing CSS for styling
import App from "./App"; // Importing the main App component
import { ClerkProvider } from "@clerk/clerk-react"; // Importing ClerkProvider for authentication

// Imported publishable key
const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY; // Retrieving the publishable key from environment variables

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key"); // Throw an error if the publishable key is missing
}

const root = ReactDOM.createRoot(document.getElementById("root")); // Creating a root for rendering React components in the DOM

root.render(
  // Rendering the application within the root
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/* Wrapping the App component with ClerkProvider and passing the publishable key */}
      <App /> {/* Rendering the main App component */}
    </ClerkProvider>
  </React.StrictMode>
);
