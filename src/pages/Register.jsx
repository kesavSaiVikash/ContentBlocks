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
  const { registerUser, verifyEmail, setError } = useRegister();
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  const [pendingVerification] = useAtom(pendingVerificationAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "all" });

  return (
    <AuthLayout>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      {!pendingVerification ? (
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit(registerUser)} className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="user_name" className="mb-2 font-semibold">
                User Name
              </label>
              <input
                type="text"
                id="user_name"
                placeholder="User Name"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                {...register("userName", {
                  required: "User Name is required.",
                })}
              />
              {errors.userName && (
                <ErrorMessage message={errors.userName.message} />
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                {...register("email", { required: "Email is required." })}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                {...register("password", { required: "Password is required." })}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              {loading ? <Loading /> : "Sign Up"}
            </button>
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
                Create Mini Courses, Bridges Pages &amp; much more.
              </span>{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-bold text-indigo-500 hover:underline"
              >
                Already a member? Login here.
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">
            Verify your account
          </h2>
          <form onSubmit={handleSubmit(verifyEmail)} className="space-y-6">
            <input
              type="numeric"
              {...register("code", {
                required: "Verification Code is required.",
              })}
              onChange={(e) => setValue("code", e.target.value)}
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
        </div>
      )}
    </AuthLayout>
  );
};

export default RegisterPage;
