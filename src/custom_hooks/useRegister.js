import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { currentUserAtom } from "../utils/store";
import { useErrorHandler } from "../custom_hooks";
import { useAtom } from "jotai";

// Custom hook for registration functionality.

const useRegister = () => {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp(); // Clerk hooks for signing up and setting active session
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const { handleErrors, handleCompletion } = useErrorHandler();

  // Function to register a new user.
  const registerUser = async (data, strategy) => {
    if (!isLoaded || currentUser.metadata.loading) return;
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        loading: true,
        error: null,
      },
    }));
    try {
      await signUp.create({
        username: data.username,
        email_address: data.email,
        password: data.password,
      });
      switch (strategy) {
        case process.env.REACT_APP_STRATEGY_EMAIL_LINK:
          await signUp.prepareEmailAddressVerification({
            strategy,
            redirectUrl: process.env.REACT_APP_REDIRECT_URL,
          });
          setCurrentUser((prev) => ({
            ...prev,
            metadata: {
              ...prev.metadata,
              modal: true,
            },
          }));
          break;
        default:
          await signUp.prepareEmailAddressVerification({ strategy });
          setCurrentUser((prev) => ({
            ...prev,
            metadata: {
              ...prev.metadata,
              pendingVerification: true,
            },
          }));
      }
      setCurrentUser((prev) => ({
        ...prev,
        session: null,
        username: data.username,
        email: data.email,
      }));
    } catch (err) {
      handleErrors(err);
    } finally {
      handleCompletion(); // Finalize
    }
  };

  // Function to verify email after registration.
  const verifyEmail = async (data) => {
    if (!isLoaded || currentUser.metadata.loading) return;
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        loading: true,
        error: null,
      },
    }));
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });
      if (
        completeSignUp.status === "complete" ||
        completeSignUp.status === "needs_first_factor"
      ) {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/"); // Navigate to home after successful verification
      }
    } catch (err) {
      handleErrors(err); // Handle errors
    } finally {
      handleCompletion(); // Finalize
    }
  };

  return {
    registerUser,
    verifyEmail,
  };
};

export default useRegister;
