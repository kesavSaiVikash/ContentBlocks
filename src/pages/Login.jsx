import React from "react";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import AuthLayout from "../components/AuthLayout";
import ErrorPopup from "../components/ErrorPopup";
import { useAtom } from "jotai";
import { errorAtom, loadingAtom } from "../utils/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isSignInLoaded, isSessionLoaded, isUserLoaded, session, login } =
    useLogin();
  const [error, setError] = useAtom(errorAtom);
  const [loading] = useAtom(loadingAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  /**
   * Redirects to the home page if the session is already active.
   */
  React.useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  if (!isSignInLoaded || !isSessionLoaded || !isUserLoaded) {
    return <Loading />;
  }

  return (
    <AuthLayout>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      <h2 className="text-2xl font-bold mb-8 text-center">Welcome Back!</h2>
      <form className="space-y-6" onSubmit={handleSubmit(login)}>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold">
            Email Address
          </label>
          <input
            id="email"
            type="email"
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
            id="password"
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            {...register("password", { required: "Password is required." })}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
        </div>
        <div className="flex items-center justify-between">
          <a
            href="/forgot-password"
            className="font-bold text-indigo-500 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          {loading ? <Loading /> : "Login"}
        </button>
      </form>
      <div className="flex items-center justify-center border-t-2 border-gray-500 mt-12">
        <h2 className="bg-white py-3 px-6 -mt-6 font-bold text-gray-400">OR</h2>
      </div>
      <div className="mt-4 text-center">
        <div className="text-xl font-bold mb-4">
          Get Started with ContentBlocks
        </div>
        <button
          type="button"
          className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          onClick={() => navigate("/register")}
        >
          Create Your Account
        </button>
        <div className="text-md mt-4 text-gray-600">
          Your first workspace is free!
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
