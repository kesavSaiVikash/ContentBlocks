import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  loadingAtom,
  errorAtom,
  pendingVerificationAtom,
} from "../utils/store";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

/**
 * Custom hook for handling user registration and email verification.
 */
const useRegister = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [pendingVerification, setPendingVerification] = useAtom(
    pendingVerificationAtom
  );

  /**
   * Registers a new user and prepares email address verification.
   * @param {Object} data - The registration data containing username, email, and password.
   */
  const registerUser = async (data) => {
    if (!isLoaded || loading) return;
    setLoading(true);
    setError(null);
    try {
      await signUp.create({
        username: data.userName,
        email_address: data.email,
        password: data.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      const errorMessage = isClerkAPIResponseError(err)
        ? err.errors[0].longMessage
        : "An error occurred. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifies the email address using the provided verification code.
   * @param {Object} data - The verification data containing the code.
   */
  const verifyEmail = async (data) => {
    if (!isLoaded || loading) return;
    setLoading(true);
    setError(null);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
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

  return {
    registerUser,
    verifyEmail,
    loading,
    error,
    pendingVerification,
    setError,
  };
};

export default useRegister;
