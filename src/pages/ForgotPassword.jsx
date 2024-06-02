import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPassword, useLogout } from "../custom_hooks";
import { ReactComponent as Astrix } from "../assets/astrix.svg";

import {
  AuthLayout,
  ErrorPopup,
  Modal,
  FormInput,
  FormButton,
} from "../components";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { handleLogout } = useLogout(); // Destructuring handleLogout function from useLogout hook
  const { requestPasswordReset, verifyResetCode, currentUser, setCurrentUser } =
    useForgotPassword(); // Destructuring necessary functions and state from useForgotPassword hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" }); // Form handling and validation setup

  // Function to handle form submission
  const onSubmit = async (data) => {
    reset(); // Reset the form
    if (!currentUser.metadata.emailSent) {
      await requestPasswordReset(data.email); // Request password reset if email not sent
    } else {
      try {
        await verifyResetCode(data.code, data.password); // Verify reset code if email sent
      } catch (err) {
        console.error("Password reset failed", err); // Log error if password reset fails
      }
    }
  };

  return (
    <AuthLayout>
      {/* Display modal if the password reset is successful */}
      {currentUser.metadata.modal && (
        <Modal
          message="Password reset successful. Please log in with your new password."
          confirmText="Login Back"
          onConfirm={() => {
            handleLogout(); // Log out the user
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: { ...prevState.metadata, modal: false }, // Close the modal
            }));
            navigate("/login"); // Navigate to login page
          }}
          onClose={() => {
            handleLogout(); // Log out the user
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: { ...prevState.metadata, modal: false }, // Close the modal
            }));
            navigate("/login"); // Navigate to login page
          }}
          title="Password Reset"
        />
      )}
      {/* Display error popup if there's an error */}
      {currentUser.metadata.error && (
        <ErrorPopup
          message={currentUser.metadata.error}
          onClose={() =>
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: { ...prevState.metadata, error: null }, // Clear the error
            }))
          }
        />
      )}
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password?</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="forgot-password-form"
          autoComplete="off"
        >
          {/* Conditionally render inputs based on emailSent status */}
          {!currentUser.metadata.emailSent ? (
            <>
              <FormInput
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                register={register}
                errors={errors}
              />
              <FormButton
                text="Send Reset Code"
                loading={currentUser.metadata.loading}
              />
            </>
          ) : (
            <>
              <FormInput
                id="password"
                name="password"
                type="password"
                placeholder="New Password"
                register={register}
                errors={errors}
              />
              <FormInput
                id="code"
                name="code"
                type="text"
                placeholder="Password Reset Code"
                register={register}
                errors={errors}
              />
              <FormButton
                text="Reset Password"
                loading={currentUser.metadata.loading}
              />
            </>
          )}
          <div className="forgot-password-footer">
            <Astrix />
            <span className="font-bold">
              Create Mini Courses, Bridges Pages & much more.{" "}
            </span>
            <a href="/login" className="link-style">
              Remember Password? Login here.
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
