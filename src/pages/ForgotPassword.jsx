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
  // Hooks for navigation, form handling, and custom authentication logic
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const { requestPasswordReset, verifyResetCode, currentUser, setCurrentUser } =
    useForgotPassword();

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Form submission logic
  const onSubmit = async (data) => {
    reset();
    if (!currentUser.metadata.emailSent) {
      await requestPasswordReset(data.email);
    } else {
      try {
        await verifyResetCode(data.code, data.password);
      } catch (err) {
        console.error("Password reset failed", err);
      }
    }
  };

  return (
    // Layout component for authentication pages
    <AuthLayout>
      {currentUser.metadata.modal && (
        // Modal component for showing messages
        <Modal
          message="Password reset successful. Please log in with your new password."
          confirmText="Login Back"
          onConfirm={() => {
            handleLogout();
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: { ...prevState.metadata, modal: false },
            }));
            navigate("/login");
          }}
          onClose={() => {
            handleLogout();
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: { ...prevState.metadata, modal: false },
            }));
            navigate("/login");
          }}
          title="Password Reset"
        />
      )}

      {currentUser.metadata.error && (
        // ErrorPopup component for displaying errors
        <ErrorPopup
          message={currentUser.metadata.error}
          onClose={() =>
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: { ...prevState.metadata, error: null },
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
          {!currentUser.metadata.emailSent ? (
            // Form fields for requesting password reset code
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
            // Form fields for entering reset code and new password
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
