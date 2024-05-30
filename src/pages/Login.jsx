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
} from "../components";

const Login = () => {
  const {
    isSignInLoaded,
    isSessionLoaded,
    isUserLoaded,
    error,
    setError,
    loading,
    login,
    strategy,
    setStrategy,
    modal,
    setModal,
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Show loading indicator until sign-in, session, and user data are loaded
  if (!isSignInLoaded || !isSessionLoaded || !isUserLoaded) {
    return <Loading />;
  }

  return (
    <AuthLayout>
      {modal && (
        <Modal
          message="Email with a magic link has been sent to your email."
          confirmText="Close"
          title="Magic Link Success"
          onClose={() => setModal(false)}
        />
      )}

      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}

      <h2 className="text-2xl font-bold mb-8 text-center">Welcome Back!</h2>

      <form className="space-y-6" onSubmit={handleSubmit(login)}>
        <FormInput
          id="email"
          name="email"
          type="text"
          placeholder={strategy === "email_link" ? "Email" : "Username/ Email"}
          register={register}
          errors={errors}
        />
        {strategy === "email_code" && (
          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
          />
        )}
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              checked={strategy === "email_link" ? true : false}
              className="mr-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("checkbox")}
              onChange={(e) =>
                setStrategy(e.target.checked ? "email_link" : "email_code")
              }
            />
            <label htmlFor="checkbox" className="font-semibold">
              Magic Link flow
            </label>
          </div>
          <div className="flex items-center">
            <a
              href="/forgot-password"
              className="font-bold text-indigo-500 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <FormButton text="Login" loading={loading} />
      </form>

      <div className="flex items-center justify-center border-t-2 border-gray-500 mt-12">
        <h2 className="bg-white py-3 px-6 -mt-6 font-bold text-gray-400">OR</h2>
      </div>
      <div className="mt-4 text-center">
        <div className="text-xl font-bold mb-4">
          Get Started with ContentBlocks
        </div>
        <a
          className="block w-full py-4 bg-purple-600 text-white text-lg text-center rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          href="/register"
        >
          Create Your Account
        </a>
        <div className="text-md mt-4 text-gray-600">
          Your first workspace is free!
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
