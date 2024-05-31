import { useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSession, useUser } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { currentUserAtom } from "../utils/store";

// Import bcrypt for password hashing simulation.
// import bcrypt from "bcryptjs";

const useLogin = () => {
  const navigate = useNavigate();
  const { signIn, setActive } = useSignIn();
  const { isLoaded: isSessionLoaded, session } = useSession();
  const { isLoaded: isUserLoaded, user } = useUser();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  // useEffect to handle redirection and updating currentUser on session and user load.
  useEffect(() => {
    setCurrentUser((prevState) => ({
      ...prevState,
      metadata: {
        ...prevState.metadata,
        strategy: process.env.REACT_APP_STRATEGY_EMAIL_CODE,
      },
    }));

    if (isSessionLoaded && session && isUserLoaded && user) {
      setCurrentUser((prevState) => ({
        ...prevState,
        session: session.id,
        username: user.username,
        email: user.primaryEmailAddress?.emailAddress,
      }));

      navigate("/");
    }
  }, [isSessionLoaded, session, isUserLoaded, user, navigate, setCurrentUser]);

  // Handle sign-in process after creating the sign-in attempt.
  const handleSignIn = async (completeSignIn) => {
    if (
      completeSignIn.status === "needs_first_factor" ||
      completeSignIn.status === "complete"
    ) {
      if (
        currentUser.metadata.strategy ===
        process.env.REACT_APP_STRATEGY_EMAIL_LINK
      ) {
        setCurrentUser((prevState) => ({
          ...prevState,
          metadata: {
            ...prevState.metadata,
            modal: true,
          },
        }));
      }

      await setActive({ session: completeSignIn.createdSessionId });

      // Wait for user to be loaded before updating stored session and user.
      while (!isUserLoaded) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setCurrentUser((prevState) => ({
        ...prevState,
        session: session.id,
        username: user.username || user.firstName,
        email:
          user.primaryEmailAddress?.emailAddress ||
          user.emailAddresses[0].emailAddress,
      }));

      navigate("/");
    }
  };

  // Demonstrating the process of how to perform password hashing using bcryptjs.

  // const simulatePasswordHashing = (password) => {
  //   const salt = bcrypt.genSaltSync(10);
  //   return bcrypt.hashSync(password, salt);
  // };

  // Perform sign-in based on the selected strategy
  const login = async (data) => {
    if (currentUser.metadata.loading) return;

    try {
      setCurrentUser((prevState) => ({
        ...prevState,
        metadata: {
          ...prevState.metadata,
          loading: true,
          error: null,
        },
      }));

      let completeSignIn;
      switch (currentUser.metadata.strategy) {
        case process.env.REACT_APP_STRATEGY_EMAIL_LINK:
          completeSignIn = await signIn.create({
            identifier: data.email,
            redirectUrl: process.env.REACT_APP_REDIRECT_URL,
            strategy: process.env.REACT_APP_STRATEGY_EMAIL_LINK,
          });
          break;

        default:
          // Simulate password hashing before sending to Clerk.

          // const hashedPassword = simulatePasswordHashing(data.password);
          // Now we pass this hashed password in the password field of sign in function in our custom server.

          completeSignIn = await signIn.create({
            identifier: data.email,
            password: data.password,
          });
          break;
      }

      await handleSignIn(completeSignIn);
    } catch (err) {
      const errorMessage =
        isClerkAPIResponseError(err) && err.errors[0].longMessage;

      setCurrentUser((prevState) => ({
        ...prevState,
        metadata: {
          ...prevState.metadata,
          error: errorMessage,
        },
      }));
    } finally {
      setCurrentUser((prevState) => ({
        ...prevState,
        metadata: {
          ...prevState.metadata,
          loading: false,
        },
      }));
    }
  };

  return {
    login,
    currentUser,
    setCurrentUser,
  };
};

export default useLogin;
