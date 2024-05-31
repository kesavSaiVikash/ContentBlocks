import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { currentUserAtom } from "../utils/store";
import { useAtom } from "jotai";

// Custom hook for handling user logout functionality.
const useLogout = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [, setCurrentUser] = useAtom(currentUserAtom);

  // Handle user logout
  const handleLogout = async () => {
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        loading: true,
      },
    })); // Set loading to true in currentUserAtom.

    await signOut(); // Sign out the user

    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        loading: false,
      },
    })); // Set loading to false in currentUserAtom.

    navigate("/login"); // Redirect to the login page.
  };

  return {
    handleLogout,
  };
};

export default useLogout;
