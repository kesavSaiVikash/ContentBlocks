import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

// This component is a higher-order component that protects routes.
// It checks if the user is signed in, and if not, it redirects to the login page.

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/login"); // If the user is not signed in, redirect to the login page
    }
  }, [isSignedIn, navigate]); // Dependency array to ensure the effect runs when isSignedIn or navigate changes

  return isSignedIn ? children : null; // Render the children if the user is signed in, otherwise render null
};

export default ProtectedRoute;
