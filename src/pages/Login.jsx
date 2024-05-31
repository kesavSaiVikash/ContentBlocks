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
} from "../components"; // Importing components for the login page

const Login = () => {
  const { login, setCurrentUser, currentUser } = useLogin(); // Using custom hook for login functionality

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" }); // Setting up form with react-hook-form

  // If currentUser is not loaded yet, show loading indicator
  if (!currentUser) {
    return <Loading />;
  }

  return (
    <AuthLayout>
      {currentUser.metadata.modal && (
        // Show modal if modal flag is set in currentUser metadata
        <Modal
          message="Email with a magic link has been sent to your email."
          confirmText="Close"
          title="Magic Link Success"
          onClose={() => {
            // Close modal and update currentUser metadata
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: {
                ...prevState.metadata,
                modal: false,
                strategy: process.env.REACT_APP_STRATEGY_EMAIL_CODE,
              },
            }));
          }}
        />
      )}

      {currentUser.metadata.error && (
        // Show error popup if error flag is set in currentUser metadata
        <ErrorPopup
          message={currentUser.metadata.error}
          onClose={() =>
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: {
                ...prevState.metadata,
                error: null,
              },
            }))
          }
        />
      )}

      <h2 className="login-title">Welcome Back!</h2>

      <form className="login-form" onSubmit={handleSubmit(login)}>
        {/* Form input for email or username */}
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
        {/* Form input for password, shown only if using email code strategy */}
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
        {/* Checkbox for selecting magic link method */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
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
                      : process.env.REACT_APP_STRATEGY_EMAIL_CODE,
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

        {/* Login button */}
        <FormButton text="Login" loading={currentUser.metadata.loading} />
      </form>

      {/* Divider */}
      <div className="divider">
        <h2 className="divider-text">OR</h2>
      </div>
      <div className="mt-4 text-center">
        {/* Get started section */}
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
