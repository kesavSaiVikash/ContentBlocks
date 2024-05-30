import { useSignIn } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import {
  errorAtom,
  loadingAtom,
  emailSentAtom,
  modalAtom,
} from "../utils/store";

// Custom hook for handling forgot password functionality.
// We will be using jotai state management package throught out this app.

const useForgotPassword = () => {
  const { signIn } = useSignIn();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [emailSent, setEmailSent] = useAtom(emailSentAtom);
  const [modal, setModal] = useAtom(modalAtom);

  //  Initiates a password reset request by sending a reset password email with a verification code.
  //  @param {string} email - The email address of the user requesting the reset.

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

  //  Verifies the reset code and updates the user's password.
  //  @param {string} code - The reset code sent to the user's email.
  //  @param {string} password - The new password to set for the user.

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
        setModal(true); // Modal to say user that their password reset was successful.
        setEmailSent(false); // Reset the emailSent state after successful reset.
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

  // All the below returned variables and functions are imported & used on ForgotPassword page.
  return {
    requestPasswordReset, // function to trigger password reset email with verfication code
    verifyResetCode, // function to verify reset verification code and after reset & verified trigger's a confirm email.
    loading, // global loading atom state
    emailSent, // email sent global atom state
    setEmailSent, // function to set emailSent atom state
    error, // global error atom state
    setError, // function to set error atom state
    modal, // global modal atom state
    setModal, // function to set modal atom state
  };
};

export default useForgotPassword;
