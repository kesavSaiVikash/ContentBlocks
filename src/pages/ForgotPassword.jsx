import React from "react";
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
  const {
    requestPasswordReset,
    verifyResetCode,
    loading,
    emailSent,
    error,
    setError,
    modal,
  } = useForgotPassword(); // Custom hook for handling password reset functionality
  const { handleLogout } = useLogout(); // Custom hook for handling user logout functionality

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" }); // React Hook Form for form handling

  const onSubmit = async (data) => {
    reset(); // Reset form after submission
    if (!emailSent) {
      await requestPasswordReset(data.email); // Request password reset if email is not sent
    } else {
      try {
        await verifyResetCode(data.code, data.password); // Verify reset code and update password
      } catch (err) {
        console.error("Password reset failed", err);
      }
    }
  };

  return (
    <AuthLayout>
      {modal && (
        <Modal
          message="Password reset successful. Please log in with your new password."
          onConfirm={handleLogout}
          onClose={handleLogout}
          confirmText="Login Back"
          title="Password Reset"
        />
      )}

      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Forgot Password?
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          {!emailSent ? (
            <>
              <FormInput
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                register={register}
                errors={errors}
              />
              <FormButton text="Send Reset Code" loading={loading} />
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
              <FormButton text="Reset Password" loading={loading} />
            </>
          )}

          <div className="text-md px-12 text-center mt-4 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="inline-block mr-2 iconify iconify--ph"
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
            </span>{" "}
            <a
              href="/login"
              className="font-bold text-indigo-500 hover:underline"
            >
              Remember Password? Login here.
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
