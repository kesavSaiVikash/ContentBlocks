import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../custom_hooks";
import {
  Loading,
  AuthLayout,
  ErrorPopup,
  FormInput,
  FormButton,
  Modal,
} from "../components";

const Login = () => {
  // Destructuring login, setCurrentUser, and currentUser from the useLogin custom hook
  const { login, setCurrentUser, currentUser } = useLogin();

  // Destructuring methods and state from useForm hook for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  // If currentUser is not yet defined (likely still loading), display loading component
  if (!currentUser) {
    return <Loading />;
  }

  return (
    <AuthLayout>
      {/* Display a modal if the user has been sent a magic link */}
      {currentUser.metadata.modal && (
        <Modal
          message="Email with a magic link has been sent to your email."
          confirmText="Close"
          title="Magic Link Success"
          onClose={() => {
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: {
                ...prevState.metadata,
                modal: false,
                strategy: process.env.REACT_APP_STRATEGY_EMAIL_CODE, // Reset strategy after closing modal
              },
            }));
          }}
        />
      )}
      {/* Display an error popup if there's an error in the currentUser metadata */}
      {currentUser.metadata.error && (
        <ErrorPopup
          message={currentUser.metadata.error}
          onClose={() =>
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: {
                ...prevState.metadata,
                error: null, // Clear the error on closing the popup
              },
            }))
          }
        />
      )}
      <h2 className="login-title">Welcome Back!</h2>
      {/* Form submission is handled by handleSubmit which wraps the login function */}
      <form className="login-form" onSubmit={handleSubmit(login)}>
        {/* Input for email or username depending on the login strategy */}
        <FormInput
          id="email"
          name="email"
          type={
            currentUser.metadata.strategy ===
            process.env.REACT_APP_STRATEGY_EMAIL_LINK
              ? "email"
              : "text"
          }
          placeholder={
            currentUser.metadata.strategy ===
            process.env.REACT_APP_STRATEGY_EMAIL_LINK
              ? "Email"
              : "Username/ Email"
          }
          register={register}
          errors={errors}
        />
        {/* If the login strategy is email code, display the password input */}
        {currentUser.metadata.strategy ===
          process.env.REACT_APP_STRATEGY_EMAIL_CODE && (
          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
          />
        )}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Checkbox for toggling the magic link method */}
            <input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              checked={
                currentUser.metadata.strategy ===
                process.env.REACT_APP_STRATEGY_EMAIL_LINK
              }
              className="checkbox-input"
              {...register("checkbox")}
              onChange={(e) =>
                setCurrentUser((prevState) => ({
                  ...prevState,
                  metadata: {
                    ...prevState.metadata,
                    strategy: e.target.checked
                      ? process.env.REACT_APP_STRATEGY_EMAIL_LINK
                      : process.env.REACT_APP_STRATEGY_EMAIL_CODE, // Toggle strategy based on checkbox state
                  },
                }))
              }
            />
            <label htmlFor="checkbox" className="checkbox-label">
              Magic link method
            </label>
          </div>
          <div>
            <a href="/forgot-password" className="forgot-password-link">
              Forgot password?
            </a>
          </div>
        </div>
        {/* Submit button for the login form */}
        <FormButton text="Login" loading={currentUser.metadata.loading} />
      </form>
      <div className="divider">
        <h2 className="divider-text">OR</h2>
      </div>
      <div className="mt-4 text-center">
        <div className="get-started-title">Get Started with ContentBlocks</div>
        <a className="get-started-button" href="/register">
          Create Your Account
        </a>
        <br />
        <div className="free-workspace-text">Your first workspace is free!</div>
      </div>
    </AuthLayout>
  );
};

export default Login;
