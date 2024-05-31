import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPassword, useLogout } from "../custom_hooks";
import {
  AuthLayout,
  ErrorPopup,
  Modal,
  FormInput,
  FormButton,
} from "../components";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const { requestPasswordReset, verifyResetCode, currentUser, setCurrentUser } =
    useForgotPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

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
    <AuthLayout>
      {currentUser.metadata.modal && (
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="icon-style iconify iconify--ph"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <g fill="currentColor">
                <path
                  d="M200 128a72 72 0 1 1-72-72a72 72 0 0 1 72 72"
                  opacity=".2"
                />
                <path d="M214.86 180.12a8 8 0 0 1-11 2.74L136 142.13V216a8 8 0 0 1-16 0v-73.87l-67.88 40.73a8 8 0 1 1-8.23-13.72L112.45 128L43.89 86.86a8 8 0 1 1 8.23-13.72L120 113.87V40a8 8 0 0 1 16 0v73.87l67.88-40.73a8 8 0 1 1 8.23 13.72L143.55 128l68.56 41.14a8 8 0 0 1 2.75 10.98" />
              </g>
            </svg>
            <span className="font-bold">
              Create Mini Courses, Bridges Pages & much more.
            </span>
            <a href="/login" className="link-style">
              {" "}
              Remember Password? Login here.
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
