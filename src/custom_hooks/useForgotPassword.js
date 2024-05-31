import { useSignIn } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { currentUserAtom } from "../utils/store";

const useForgotPassword = () => {
  const { signIn } = useSignIn();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  // Function to request a password reset
  const requestPasswordReset = async (email) => {
    // Set loading state and reset other metadata
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
      // Send password reset email
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      // Update metadata after successful request
      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          loading: false,
          emailSent: true,
        },
      }));
    } catch (err) {
      // Handle errors
      const errorMessage =
        err?.errors?.[0]?.longMessage || "An unknown error occurred.";
      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          loading: false,
          error: errorMessage,
        },
      }));
    }
  };

  // Function to verify reset code and set new password
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
        strategy: "reset_password_email_code",
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
      const errorMessage =
        err?.errors?.[0]?.longMessage || "An unknown error occurred.";
      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          loading: false,
          error: errorMessage,
        },
      }));
    }
  };

  // Return the necessary functions and state for password reset
  return {
    requestPasswordReset,
    verifyResetCode,
    currentUser,
    setCurrentUser,
    modal: currentUser.metadata.modal,
  };
};

export default useForgotPassword;
