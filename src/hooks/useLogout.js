import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { loadingAtom } from "../utils/store";
import { useAtom } from "jotai";

// Custom hook for handling user logout functionality.
// We will be using jotai state management package throught out this app.

const useLogout = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    navigate("/login");
  };

  // All the below returned variables and functions are imported & used on NavBar component and ForgotPassword page.
  return {
    handleLogout, // function to let the user logout.
    loading, // global loading atom state
  };
};

export default useLogout;
