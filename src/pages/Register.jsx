import React from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../custom_hooks";
import {
  AuthLayout,
  ErrorPopup,
  FormButton,
  FormInput,
  Modal,
} from "../components";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  // Custom hook to handle user registration
  const {
    registerUser,
    verifyEmail,
    loading,
    error,
    pendingVerification,
    setError,
    modal,
    setModal,
    strategy,
    setStrategy,
  } = useRegister();

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Close modal and navigate to home page
  const handleCloseModal = () => {
    navigate("/");
    reset();
    setModal(false);
  };

  // Show verification form if account verification is pending
  if (pendingVerification) {
    return (
      <AuthLayout>
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
        <h2 className="text-2xl font-bold mb-8 text-center">
          Verify your account
        </h2>
        <form onSubmit={handleSubmit(verifyEmail)} className="space-y-6">
          <FormInput
            id="code"
            name="code"
            type="text"
            placeholder="Verification Code"
            register={register}
            errors={errors}
          />
          <FormButton text="Verify Email" loading={loading} />
        </form>
      </AuthLayout>
    );
  }

  // Show registration form
  return (
    <AuthLayout>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}

      {modal && (
        <Modal
          title="Email Sent"
          message="Please check your email for the verification link."
          onClose={handleCloseModal}
          confirmText="Close"
        />
      )}

      <h2 className="text-2xl font-bold mb-8 text-center">
        Create Your Account
      </h2>

      <form
        onSubmit={handleSubmit((data) => registerUser(data, strategy))}
        className="space-y-6"
      >
        {["username", "email", "password"].map((field) => {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
          const isPasswordField = field === "password";
          const placeholder = fieldName;

          return (
            <FormInput
              key={field}
              id={field}
              name={field}
              type={isPasswordField ? "password" : "text"}
              placeholder={placeholder}
              register={register}
              errors={errors}
            />
          );
        })}

        <div className="flex items-center">
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

        <FormButton text="Sign Up" loading={loading} />

        <div className="text-md text-center mt-4 font-medium">
          <span className="font-bold">
            Create Mini Courses, Bridges Pages & much more.
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
