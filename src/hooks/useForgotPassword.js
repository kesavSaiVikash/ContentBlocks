import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { errorAtom, loadingAtom, emailSentAtom } from "../utils/store";

const useForgotPassword = () => {
  const { signIn } = useSignIn();
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [emailSent, setEmailSent] = useAtom(emailSentAtom);

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
      console.error(
        "Error sending reset password email:",
        err.errors[0]?.longMessage
      );
      setError(err.errors[0]?.longMessage);
    } finally {
      setLoading(false);
    }
  };

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
        navigate("/login");
      }
    } catch (err) {
      console.error("Error verifying reset code:", err.errors[0]?.longMessage);
      setError(err.errors[0]?.longMessage);
    } finally {
      setLoading(false);
    }
  };

  return { requestPasswordReset, verifyResetCode, loading, emailSent };
};

export default useForgotPassword;
