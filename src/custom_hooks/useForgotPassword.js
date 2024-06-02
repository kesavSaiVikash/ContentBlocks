import { useSignIn } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { currentUserAtom } from "../utils/store";
import { useErrorHandler } from "../custom_hooks";

// Custom hook for handling forgot password functionality.

const useForgotPassword = () => {
  const { signIn } = useSignIn(); // Clerk hook for signing in
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const { handleErrors, handleCompletion } = useErrorHandler();

  // Function to request password reset.
  const requestPasswordReset = async (email) => {
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        loading: true,
        error: null,
        emailSent: false,
        modal: false,
      },
    }));
    try {
      await signIn.create({
        strategy: process.env.REACT_APP_STRATEGY_PASSWORD_RESET,
        identifier: email,
      });
      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          loading: false,
          emailSent: true,
        },
      }));
    } catch (err) {
      handleErrors(err);
    } finally {
      handleCompletion(); // Finalize
    }
  };

  // Function to verify reset code and set a new password.
  const verifyResetCode = async (code, password) => {
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        loading: true,
        error: null,
        emailSent: false,
        modal: false,
      },
    }));
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: process.env.REACT_APP_STRATEGY_PASSWORD_RESET,
        code,
        password,
      });
      if (result.status === "complete") {
        setCurrentUser((prev) => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            loading: false,
            modal: true,
          },
        }));
      }
    } catch (err) {
      handleErrors(err); // Handle errors
    } finally {
      handleCompletion(); // Finalize
    }
  };

  return {
    requestPasswordReset,
    verifyResetCode,
    currentUser,
    setCurrentUser,
  };
};

export default useForgotPassword;
