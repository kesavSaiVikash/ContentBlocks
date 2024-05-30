import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import {
  loadingAtom,
  errorAtom,
  pendingVerificationAtom,
  modalAtom,
  strategyAtom,
} from "../utils/store";

const useRegister = () => {
  const navigate = useNavigate(); // Use react-router-dom's useNavigate hook
  const { isLoaded, signUp, setActive } = useSignUp(); // Use Clerk's useSignUp hook
  const [loading, setLoading] = useAtom(loadingAtom); // Use jotai's useAtom hook to manage loading state
  const [error, setError] = useAtom(errorAtom); // Use jotai's useAtom hook to manage error state
  const [modal, setModal] = useAtom(modalAtom); // Use jotai's useAtom hook to manage modal state
  const [strategy, setStrategy] = useAtom(strategyAtom); // Use jotai's useAtom hook to manage strategy state
  const [pendingVerification, setPendingVerification] = useAtom(
    // Use jotai's useAtom hook to manage pending verification state
    pendingVerificationAtom
  );

  // Register a new user
  const registerUser = async (data, strategy = "email_code") => {
    if (!isLoaded || loading) return;
    setLoading(true); // Set loading to true
    setError(null); // Clear any previous errors
    try {
      await signUp.create({
        username: data.username,
        email_address: data.email,
        password: data.password,
      }); // Use Clerk's signUp.create method to register the user

      switch (strategy) {
        case "email_code":
          await signUp.prepareEmailAddressVerification({ strategy });
          setPendingVerification(true);
          break;

        case "email_link":
          await signUp.prepareEmailAddressVerification({
            strategy,
            redirectUrl: "http://localhost:3000",
          });
          setModal(true);
          break;

        default:
          console.error("Unknown verification strategy:", strategy);
      }
    } catch (err) {
      const errorMessage = isClerkAPIResponseError(err)
        ? err.errors[0].longMessage
        : "An error occurred. Please try again later.";
      console.error(err.errors[0].longMessage);
      setError(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after registration completes
    }
  };

  // Verify the email address after registration
  const verifyEmail = async (data) => {
    if (!isLoaded || loading) return;
    setLoading(true); // Set loading to true
    setError(null); // Clear any previous errors
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      }); // Use Clerk's signUp.attemptEmailAddressVerification method to verify email address
      if (completeSignUp.status === "complete" || "needs_first_factor") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/"); // Redirect to home page after successful verification
      }
    } catch (err) {
      const errorMessage = isClerkAPIResponseError(err)
        ? err.errors[0].longMessage
        : "An error occurred. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after verification completes
    }
  };

  // Return the registerUser and verifyEmail functions along with the loading, error, pendingVerification, setError, modal, setModal, strategy, and setStrategy states
  return {
    registerUser,
    verifyEmail,
    loading,
    error,
    pendingVerification,
    setError,
    modal,
    setModal,
    strategy,
    setStrategy,
  };
};

export default useRegister;
