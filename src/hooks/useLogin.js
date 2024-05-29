import { useEffect } from "react";
import { useSignIn, useSession, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { sessionAtom, userAtom, loadingAtom, errorAtom } from "../utils/store";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

const useLogin = () => {
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isSessionLoaded, session } = useSession();
  const { isLoaded: isUserLoaded, user } = useUser();
  const [storedSession, setStoredSession] = useAtom(sessionAtom);
  const [storedUser, setStoredUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const navigate = useNavigate();

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
    setStoredSession,
    setStoredUser,
    navigate,
  ]);

  const login = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });
      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        while (!isUserLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        setStoredSession(session);
        setStoredUser(user);
        navigate("/");
      }
    } catch (err) {
      setError(
        isClerkAPIResponseError(err)
          ? err.errors[0].longMessage
          : "An error occurred. Please try again later."
      );
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
  };
};

export default useLogin;
