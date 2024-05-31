import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

// This component is a higher order controlled component which
// takes in component as a argument and check if user is signed in,
// finally returns passed component if signed in or returns null and redirect the user to login page.

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/login");
    }
  }, [isSignedIn, navigate]);

  return isSignedIn ? children : null;
};

export default ProtectedRoute;
