import React from "react";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useRegister } from "../custom_hooks";
import { useNavigate } from "react-router-dom";
import { currentUserAtom } from "../utils/store";
import { ReactComponent as Astrix } from "../assets/astrix.svg";

import {
  AuthLayout,
  ErrorPopup,
  FormButton,
  FormInput,
  Modal,
} from "../components";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const { registerUser, verifyEmail } = useRegister(); // Destructuring register and verifyEmail functions from useRegister hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" }); // Form handling and validation setup

  // Function to handle closing the modal
  const handleCloseModal = () => {
    navigate("/"); // Navigate to the home page
    reset(); // Reset the form
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        modal: false, // Close the modal
      },
    }));
  };

  // If the user is pending verification, show the verification form
  if (currentUser.metadata.pendingVerification) {
    return (
      <AuthLayout>
        {currentUser.metadata.error && (
          <ErrorPopup
            message={currentUser.metadata.error}
            onClose={() =>
              setCurrentUser((prev) => ({
                ...prev,
                metadata: {
                  ...prev.metadata,
                  error: null, // Clear the error
                },
              }))
            }
          />
        )}
        <h2 className="verify-title">Verify your account</h2>
        <form onSubmit={handleSubmit(verifyEmail)} className="space-y-6">
          <FormInput
            id="code"
            name="code"
            type="text"
            placeholder="Verification Code"
            register={register}
            errors={errors}
          />
          <FormButton
            text="Verify Email"
            loading={currentUser.metadata.loading}
          />
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {currentUser.metadata.error && (
        <ErrorPopup
          message={currentUser.metadata.error}
          onClose={() =>
            setCurrentUser((prev) => ({
              ...prev,
              metadata: {
                ...prev.metadata,
                error: null, // Clear the error
              },
            }))
          }
        />
      )}
      {currentUser.metadata.modal && (
        <Modal
          title="Email Sent"
          message="Please check your email for the verification link."
          onClose={handleCloseModal}
          confirmText="Close"
        />
      )}
      <h2 className="register-title">Create Your Account</h2>
      <form
        onSubmit={handleSubmit((data) =>
          registerUser(data, currentUser.metadata.strategy)
        )}
        className="space-y-6"
      >
        {/* Loop through the fields to generate form inputs dynamically */}
        {["username", "email", "password"].map((field) => {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
          const isPasswordField = field === "password";
          const inputType = isPasswordField
            ? "password"
            : field === "email"
            ? "email"
            : "text";
          const placeholder = fieldName;
          return (
            <FormInput
              key={field}
              id={field}
              name={field}
              type={inputType}
              placeholder={placeholder}
              register={register}
              errors={errors}
            />
          );
        })}
        <div className="flex items-center">
          {/* Checkbox for toggling the magic link method */}
          <input
            id="checkbox"
            name="checkbox"
            type="checkbox"
            checked={
              currentUser.metadata.strategy ===
              process.env.REACT_APP_STRATEGY_EMAIL_LINK
            }
            className="checkbox-input"
            {...register("checkbox")}
            onChange={(e) =>
              setCurrentUser((prev) => ({
                ...prev,
                metadata: {
                  ...prev.metadata,
                  strategy: e.target.checked
                    ? process.env.REACT_APP_STRATEGY_EMAIL_LINK
                    : process.env.REACT_APP_STRATEGY_EMAIL_CODE, // Toggle strategy based on checkbox state
                },
              }))
            }
          />
          <label htmlFor="checkbox" className="font-semibold">
            Magic link method
          </label>
        </div>
        <FormButton text="Sign Up" loading={currentUser.metadata.loading} />
        <div className="register-footer">
          <Astrix />
          <span className="font-bold">
            Create Mini Courses, Bridges Pages & much more.
          </span>{" "}
          <a href="/login" className="link-style">
            Already a member? Login here.
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
