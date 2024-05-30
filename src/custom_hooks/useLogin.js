import { useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSession, useUser } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import {
  sessionAtom,
  userAtom,
  loadingAtom,
  errorAtom,
  strategyAtom,
  modalAtom,
} from "../utils/store";

const useLogin = () => {
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isSessionLoaded, session } = useSession();
  const { isLoaded: isUserLoaded, user } = useUser();
  const [storedSession, setStoredSession] = useAtom(sessionAtom);
  const [storedUser, setStoredUser] = useAtom(userAtom);
  const [strategy, setStrategy] = useAtom(strategyAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [modal, setModal] = useAtom(modalAtom);
  const [error, setError] = useAtom(errorAtom);
  const navigate = useNavigate();

  // Redirect to home page if session and user are loaded
  useEffect(() => {
    if (isSessionLoaded && session && isUserLoaded && user) {
      setStoredSession(session);
      setStoredUser(user);
      navigate("/");
    }
  }, [
    isSessionLoaded,
    session,
    isUserLoaded,
    user,
    navigate,
    setStoredSession,
    setStoredUser,
  ]);

  // Handle sign-in process after creating the sign-in attempt
  const handleSignIn = async (completeSignIn) => {
    if (
      completeSignIn.status === "needs_first_factor" ||
      completeSignIn.status === "complete"
    ) {
      strategy === "email_link" && setModal(true);
      await setActive({ session: completeSignIn.createdSessionId });

      // Wait for user to be loaded before updating stored session and user
      while (!isUserLoaded) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setStoredSession(session);
      setStoredUser(user);
      navigate("/");
    }
  };

  // Perform sign-in based on the selected strategy
  const login = async (data) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    let completeSignIn;
    try {
      switch (strategy) {
        case "email_link":
          completeSignIn = await signIn.create({
            identifier: data.email,
            redirectUrl: "http://localhost:3000",
            strategy: "email_link",
          });
          break;

        default:
          completeSignIn = await signIn.create({
            identifier: data.email,
            password: data.password,
          });
          break;
      }

      await handleSignIn(completeSignIn);
    } catch (err) {
      const errorMessage = isClerkAPIResponseError(err)
        ? err.errors[0].longMessage
        : "An error occurred. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    isSignInLoaded,
    isSessionLoaded,
    isUserLoaded,
    session,
    error,
    setError,
    loading,
    login,
    strategy,
    setStrategy,
    modal,
    setModal,
  };
};

export default useLogin;
