import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { currentUserAtom } from "../utils/store";
import { useAtom } from "jotai";

const useRegister = () => {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  // Function to register a new user
  const registerUser = async (data, strategy = "email_code") => {
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
      // Create a new user account
      await signUp.create({
        username: data.username,
        email_address: data.email,
        password: data.password,
      });

      // Prepare email address verification based on the selected strategy
      switch (strategy) {
        case "email_code":
          await signUp.prepareEmailAddressVerification({ strategy });
          setCurrentUser((prev) => ({
            ...prev,
            metadata: {
              ...prev.metadata,
              pendingVerification: true,
            },
          }));
          break;

        case "email_link":
          await signUp.prepareEmailAddressVerification({
            strategy,
            redirectUrl: "http://localhost:3000",
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
          console.error("Unknown verification strategy:", strategy);
      }

      // Update currentUserAtom with the new user's details
      setCurrentUser((prev) => ({
        ...prev,
        session: null,
        username: data.username,
        email: data.email,
      }));
    } catch (err) {
      // Handle errors
      const errorMessage = isClerkAPIResponseError(err)
        ? err.errors[0].longMessage
        : "An error occurred. Please try again later.";

      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          error: errorMessage,
        },
      }));
    } finally {
      // Set loading to false when registration process is completed
      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          loading: false,
        },
      }));
    }
  };

  // Function to verify email address after registration
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
      // Attempt email address verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      // Redirect to home page if verification is successful
      if (completeSignUp.status === "complete" || "needs_first_factor") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/");
      }
    } catch (err) {
      // Handle errors
      const errorMessage = isClerkAPIResponseError(err)
        ? err.errors[0].longMessage
        : "An error occurred. Please try again later.";

      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          error: errorMessage,
        },
      }));
    } finally {
      // Set loading to false when verification process is completed
      setCurrentUser((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          loading: false,
        },
      }));
    }
  };

  // Return the registerUser and verifyEmail functions
  return {
    registerUser,
    verifyEmail,
  };
};

export default useRegister;
