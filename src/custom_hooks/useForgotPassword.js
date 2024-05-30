import { useSignIn } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import {
  errorAtom,
  loadingAtom,
  emailSentAtom,
  modalAtom,
} from "../utils/store";

const useForgotPassword = () => {
  const { signIn } = useSignIn();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [emailSent, setEmailSent] = useAtom(emailSentAtom);
  const [modal, setModal] = useAtom(modalAtom);

  // Request a password reset email
  const requestPasswordReset = async (email) => {
    setLoading(true); // Set loading to true
    setError(null); // Clear any previous errors
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      }); // Use Clerk's signIn.create method to send reset password email
      setEmailSent(true); // Set emailSent to true after successful email request
    } catch (err) {
      const errorMessage =
        err?.errors?.[0]?.longMessage || "An unknown error occurred."; // Extract error message from response
      console.error("Error sending reset password email:", errorMessage); // Log error message
      setError(errorMessage); // Set error message
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  // Verify the reset code and set a new password
  const verifyResetCode = async (code, password) => {
    setLoading(true); // Set loading to true
    setError(null); // Clear any previous errors
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      }); // Use Clerk's signIn.attemptFirstFactor method to verify reset code
      if (result.status === "complete") {
        setModal(true); // Show modal if reset is complete
        setEmailSent(false); // Set emailSent to false after modal is shown
      }
    } catch (err) {
      const errorMessage =
        err?.errors?.[0]?.longMessage || "An unknown error occurred."; // Extract error message from response
      console.error("Error verifying reset code:", errorMessage); // Log error message
      setError(errorMessage); // Set error message
    } finally {
      setLoading(false); // Set loading to false after verification completes
    }
  };

  return {
    requestPasswordReset,
    verifyResetCode,
    loading,
    emailSent,
    setEmailSent,
    error,
    setError,
    modal,
    setModal,
  };
};

export default useForgotPassword;
