import React from "react";
import { useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import AuthLayout from "../components/AuthLayout";
import ErrorMessage from "../components/ErrorMessage";
import ErrorPopup from "../components/ErrorPopup";
import Loading from "../components/Loading";
import { useAtom } from "jotai";
import {
  errorAtom,
  loadingAtom,
  pendingVerificationAtom,
} from "../utils/store";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // Custom hook for registration logic
  const { registerUser, verifyEmail, setError } = useRegister();
  // Atoms for managing application state
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  const [pendingVerification] = useAtom(pendingVerificationAtom);
  const navigate = useNavigate();
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
        {/* Input fields for registration */}
        {["userName", "email", "password"].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="mb-2 font-semibold">
              {field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              id={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register(field, {
                required: `${
                  field.charAt(0).toUpperCase() + field.slice(1)
                } is required.`,
              })}
            />
            {errors[field] && <ErrorMessage message={errors[field].message} />}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          {loading ? <Loading /> : "Sign Up"}
        </button>
        <div className="text-md text-center mt-4 font-medium">
          {/* Additional information and navigation */}
          <span className="font-bold">
            Create Mini Courses, Bridges Pages &amp; much more.
          </span>
          <button
            onClick={() => navigate("/login")}
            className="ml-2 font-bold text-indigo-500 hover:underline"
          >
            Already a member? Login here.
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
