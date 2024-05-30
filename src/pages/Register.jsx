import React from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks";
import { AuthLayout, ErrorMessage, ErrorPopup, Loading } from "../components";

const RegisterPage = () => {
  // Custom hook for registration logic
  const {
    registerUser,
    verifyEmail,
    loading,
    error,
    pendingVerification,
    setError,
  } = useRegister();

  // useForm hook for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Conditional rendering for registration or verification
  if (pendingVerification) {
    return (
      <AuthLayout>
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
        <h2 className="text-2xl font-bold mb-8 text-center">
          Verify your account
        </h2>
        <form onSubmit={handleSubmit(verifyEmail)} className="space-y-6">
          <input
            type="text"
            {...register("code", {
              required: "Verification Code is required.",
            })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter Verification Code..."
          />
          {console.log(errors)}
          {errors.code && <ErrorMessage message={errors.code.message} />}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {loading ? <Loading /> : "Verify Email"}
          </button>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      <h2 className="text-2xl font-bold mb-8 text-center">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit(registerUser)} className="space-y-6">
        {["userName", "email", "password"].map((field) => {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
          const isPasswordField = field === "password";
          const placeholder = fieldName;

          return (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="mb-2 font-semibold">
                {fieldName}
              </label>
              <input
                type={isPasswordField ? "password" : "text"}
                id={field}
                placeholder={placeholder}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                {...register(field, {
                  required: `${fieldName} is required.`,
                  ...(field === "email" && {
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address.",
                    },
                  }),
                })}
              />
              {errors[field] && (
                <ErrorMessage message={errors[field].message} />
              )}
            </div>
          );
        })}
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          {loading ? <Loading /> : "Sign Up"}
        </button>
        <div className="text-md text-center mt-4 font-medium">
          <span className="font-bold">
            Create Mini Courses, Bridges Pages &amp; much more.
          </span>
          <a
            href="/login"
            className="ml-2 font-bold text-indigo-500 hover:underline"
          >
            Already a member? Login here.
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
