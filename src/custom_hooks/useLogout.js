import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { loadingAtom } from "../utils/store";
import { useAtom } from "jotai";

// Custom hook for handling user logout functionality.
const useLogout = () => {
  const { signOut } = useClerk(); // Use Clerk's signOut method
  const navigate = useNavigate(); // Use react-router-dom's useNavigate hook
  const [loading, setLoading] = useAtom(loadingAtom); // Use jotai's useAtom hook to manage loading state

  // Handle user logout
  const handleLogout = async () => {
    setLoading(true); // Set loading to true
    await signOut(); // Sign out the user
    setLoading(false); // Set loading to false
    navigate("/login"); // Redirect to the login page
  };

  // Return the handleLogout function and the loading state
  return {
    handleLogout, // Function to let the user logout
    loading, // Global loading state
  };
};

export default useLogout;
