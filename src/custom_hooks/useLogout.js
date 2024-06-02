import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { currentUserAtom } from "../utils/store";
import { useAtom } from "jotai";
import { useErrorHandler } from "../custom_hooks";

// Custom hook for handling user logout.

const useLogout = () => {
  const { signOut } = useClerk(); // Clerk hook for signing out
  const navigate = useNavigate();
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const { handleErrors, handleCompletion } = useErrorHandler();

  // Function to handle user logout.
  const handleLogout = async () => {
    try {
      // Set loading state before starting the logout process
      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          loading: true,
        },
      }));

      // Call Clerk's signOut function to log out the user
      await signOut();

      // Update state to reflect the user is no longer loading
      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          loading: false,
        },
      }));

      // Redirect user to the login page after logout
      navigate("/login");
    } catch (err) {
      handleErrors(err); // Handle any errors that occur during logout
    } finally {
      handleCompletion(); // Finalize the logout process
    }
  };

  return {
    handleLogout, // Return the handleLogout function for use in components
  };
};

export default useLogout;
