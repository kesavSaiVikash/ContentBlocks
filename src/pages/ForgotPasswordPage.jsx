import React from "react";
import { useForm } from "react-hook-form";
import useForgotPassword from "../hooks/useForgotPassword";
import AuthLayout from "../components/AuthLayout";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import ErrorPopup from "../components/ErrorPopup";
import { useAtom } from "jotai";
import { errorAtom, emailSentAtom } from "../utils/store";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { requestPasswordReset, verifyResetCode, loading, emailSent } =
    useForgotPassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [error, setError] = useAtom(errorAtom);
  const [isEmailSent, setEmailSent] = useAtom(emailSentAtom);
  const navigate = useNavigate();

  /**
   * Handles form submission for password reset.
   * @param {Object} data - The form data containing email, code, and password.
   */
  const onSubmit = async (data) => {
    reset();
    if (!isEmailSent) {
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
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Forgot Password?
        </h2>
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          {!isEmailSent ? (
            <>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-semibold">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  {...register("email", { required: "Email is required." })}
                />
                {errors.email && (
                  <ErrorMessage message={errors.email.message} />
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {loading ? <Loading /> : "Send Reset Code"}
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-2 font-semibold">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New Password"
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                />
                {errors.password && (
                  <ErrorMessage message={errors.password.message} />
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="code" className="mb-2 font-semibold">
                  Password Reset Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="Verification Code"
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  {...register("code", {
                    required: "Verification Code is required.",
                  })}
                />
                {errors.code && <ErrorMessage message={errors.code.message} />}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {loading ? <Loading /> : "Reset Password"}
              </button>
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
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-indigo-500 hover:underline"
            >
              Remember Password? Login here.
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
