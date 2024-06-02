import { useAtom } from "jotai";
import { currentUserAtom } from "../utils/store";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

// Custom hook for handling errors and loading state.

const useErrorHandler = () => {
  const [, setCurrentUser] = useAtom(currentUserAtom);

  // Function to handle errors by setting an appropriate error message in state.
  const handleErrors = (err) => {
    const errorMessage =
      isClerkAPIResponseError(err) && err.errors[0].longMessage; // Extract detailed message from Clerk API response error

    // Update state with the error message
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        error: errorMessage,
      },
    }));
  };

  // Function to handle completion by resetting the loading state.
  const handleCompletion = () => {
    // Update state to indicate that loading has finished
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        loading: false,
      },
    }));
  };

  return { handleErrors, handleCompletion }; // Return error and completion handlers for use in other hooks
};

export default useErrorHandler;
