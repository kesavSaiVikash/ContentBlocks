import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  loadingAtom,
  errorAtom,
  pendingVerificationAtom,
} from "../utils/store";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

const useRegister = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [pendingVerification, setPendingVerification] = useAtom(
    pendingVerificationAtom
  );

  const registerUser = async (data) => {
    if (!isLoaded || loading) return;
    setLoading(true);
    try {
      await signUp.create({
        username: data.userName,
        email_address: data.email,
        password: data.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      setError(
        isClerkAPIResponseError(err)
          ? err.errors[0].longMessage
          : "An error occurred. Please try again later."
      );
    }
    setLoading(false);
  };

  const verifyEmail = async (data) => {
    if (!isLoaded || loading) return;
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/");
      }
    } catch (err) {
      setError(
        isClerkAPIResponseError(err)
          ? err.errors[0].longMessage
          : "An error occurred. Please try again later."
      );
    }
    setLoading(false);
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
