import { useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSession, useUser } from "@clerk/clerk-react";
import { currentUserAtom } from "../utils/store";
import { useErrorHandler } from "../custom_hooks";

// Custom hook for login functionality.

const useLogin = () => {
  const navigate = useNavigate();
  const { signIn, setActive } = useSignIn(); // Clerk hooks for signing in and setting active session
  const { isLoaded: isSessionLoaded, session } = useSession(); // Clerk hook for session information
  const { isLoaded: isUserLoaded, user } = useUser(); // Clerk hook for user information
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom); // curremtUserAtom jotai state
  const { handleErrors, handleCompletion } = useErrorHandler(); // global error handler

  // Effect to set initial strategy and update user info if session and user data are loaded.
  useEffect(() => {
    setCurrentUser((prevState) => ({
      ...prevState,
      metadata: {
        ...prevState.metadata,
        strategy: process.env.REACT_APP_STRATEGY_EMAIL_CODE, // Default strategy
      },
    }));
    if (isSessionLoaded && session && isUserLoaded && user) {
      setCurrentUser((prevState) => ({
        ...prevState,
        session: session.id,
        username: user.username,
        email: user.primaryEmailAddress?.emailAddress,
      }));
      navigate("/"); // Navigate to home after login
    }
  }, [isSessionLoaded, session, isUserLoaded, user, navigate, setCurrentUser]);

  // Function to handle the sign-in process.
  const handleSignIn = async (completeSignIn) => {
    try {
      if (
        currentUser.metadata.strategy ===
        process.env.REACT_APP_STRATEGY_EMAIL_LINK
      ) {
        setCurrentUser((prevState) => ({
          ...prevState,
          metadata: {
            ...prevState.metadata,
            modal: true,
          },
        }));
      }
      await setActive({ session: completeSignIn.createdSessionId });
      setCurrentUser((prevState) => ({
        ...prevState,
        session: session.id,
        username: user.username,
        email:
          user.primaryEmailAddress?.emailAddress ||
          user.emailAddresses[0].emailAddress,
      }));
      navigate("/"); // Navigate to home after setting active session
    } catch (err) {
      handleErrors(err); // Handle errors
    } finally {
      handleCompletion(); // Finalize
    }
  };

  // Function to handle login.
  const login = async (data) => {
    if (currentUser.metadata.loading) return;
    try {
      setCurrentUser((prevState) => ({
        ...prevState,
        metadata: {
          ...prevState.metadata,
          loading: true,
          error: null,
        },
      }));
      let completeSignIn;
      switch (currentUser.metadata.strategy) {
        case process.env.REACT_APP_STRATEGY_EMAIL_LINK:
          completeSignIn = await signIn.create({
            identifier: data.email,
            redirectUrl: process.env.REACT_APP_REDIRECT_URL,
            strategy: process.env.REACT_APP_STRATEGY_EMAIL_LINK,
          });
          break;
        default:
          completeSignIn = await signIn.create({
            identifier: data.email,
            password: data.password,
          });
          break;
      }
      await handleSignIn(completeSignIn); // Complete sign-in process
    } catch (err) {
      handleErrors(err); // Handle errors
    } finally {
      handleCompletion(); // Finalize
    }
  };

  return {
    login,
    currentUser,
    setCurrentUser,
  };
};

export default useLogin;
