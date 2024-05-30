import { useEffect } from "react";
import { useAtom } from "jotai";
import { useSignIn, useSession, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { sessionAtom, userAtom, loadingAtom, errorAtom } from "../utils/store";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

// Custom hook for handling user login functionality.
// We will be using jotai state management package throught out this app.

const useLogin = () => {
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isSessionLoaded, session } = useSession();
  const { isLoaded: isUserLoaded, user } = useUser();
  const [storedSession, setStoredSession] = useAtom(sessionAtom);
  const [storedUser, setStoredUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const navigate = useNavigate();

  // UseEffect function to store session and user data and navigate to home when session and user are loaded.

  useEffect(() => {
    if (isSessionLoaded && session && isUserLoaded && user) {
      setStoredSession(session);
      setStoredUser(user);
      navigate("/");
    }
  }, [session, user]);

  // Handles the login process.
  // @param {Object} data - The login data containing email and password.

  const login = async (data) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const completeSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });
      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });

        // Wait until the user is fully loaded
        while (!isUserLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        setStoredSession(session);
        setStoredUser(user);
        navigate("/");
      }
    } catch (err) {
      const errorMessage = isClerkAPIResponseError(err)
        ? err.errors[0].longMessage
        : "An error occurred. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // All the below returned variables and functions are imported & used on Login page.
  return {
    isSignInLoaded, // isSignInLoaded state is a boolean returned/ destructured from useSign() of "@clerk/clerk-react"
    isSessionLoaded, // isSessionLoaded state is a boolean returned/ destructured from useSession() of "@clerk/clerk-react"
    isUserLoaded, // isUserLoaded state is a boolean returned/ destructured from useUser() of "@clerk/clerk-react"
    session, // session is an object returned/ destructured from useSign() of "@clerk/clerk-react"
    error, // global error atom state
    setError, // function to set the error atom state
    loading, // global loading state
    login, // login function which takes in username/ email and password as params and lets the user login secure if no errors, else throws error.
  };
};

export default useLogin;
