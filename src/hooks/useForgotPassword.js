import { useSignIn, useClerk } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { errorAtom, loadingAtom, emailSentAtom } from "../utils/store";

/**
 * Custom hook for handling forgot password functionality.
 */
const useForgotPassword = () => {
  const { signIn } = useSignIn();
  const { signOut } = useClerk();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [setError] = useAtom(errorAtom);
  const [emailSent, setEmailSent] = useAtom(emailSentAtom);

  /**
   * Initiates a password reset request by sending a reset password email.
   * @param {string} email - The email address of the user requesting the reset.
   */
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setEmailSent(true);
    } catch (err) {
      const errorMessage =
        err?.errors?.[0]?.longMessage || "An unknown error occurred.";
      console.error("Error sending reset password email:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifies the reset code and updates the user's password.
   * @param {string} code - The reset code sent to the user's email.
   * @param {string} password - The new password to set for the user.
   */
  const verifyResetCode = async (code, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (result.status === "complete") {
        setEmailSent(false); // Reset the emailSent state after successful reset
        await signOut(); // Sign out the user to end the session
      }
    } catch (err) {
      const errorMessage =
        err?.errors?.[0]?.longMessage || "An unknown error occurred.";
      console.error("Error verifying reset code:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { requestPasswordReset, verifyResetCode, loading, emailSent };
};

export default useForgotPassword;
