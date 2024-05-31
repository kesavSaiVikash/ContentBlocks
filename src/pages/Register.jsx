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
} from "../components"; // Importing components for the registration page

const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom); // Using Jotai for current user state

  const { registerUser, verifyEmail } = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" }); // Setting up form with react-hook-form

  // Close modal and navigate to home page
  const handleCloseModal = () => {
    navigate("/");
    reset();
    setCurrentUser((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        modal: false,
      },
    }));
  };

  // Show verification form if account verification is pending
  if (currentUser.metadata.pendingVerification) {
    return (
      <AuthLayout>
        {currentUser.metadata.error && (
          // Show error popup if error flag is set in currentUser metadata
          <ErrorPopup
            message={currentUser.metadata.error}
            onClose={() =>
              setCurrentUser((prev) => ({
                ...prev,
                metadata: {
                  ...prev.metadata,
                  error: null,
                },
              }))
            }
          />
        )}
        <h2 className="verify-title">Verify your account</h2>
        <form onSubmit={handleSubmit(verifyEmail)} className="space-y-6">
          {/* Form input for verification code */}
          <FormInput
            id="code"
            name="code"
            type="text"
            placeholder="Verification Code"
            register={register}
            errors={errors}
          />
          {/* Verify email button */}
          <FormButton
            text="Verify Email"
            loading={currentUser.metadata.loading}
          />
        </form>
      </AuthLayout>
    );
  }

  // Show registration form
  return (
    <AuthLayout>
      {currentUser.metadata.error && (
        // Show error popup if error flag is set in currentUser metadata
        <ErrorPopup
          message={currentUser.metadata.error}
          onClose={() =>
            setCurrentUser((prev) => ({
              ...prev,
              metadata: {
                ...prev.metadata,
                error: null,
              },
            }))
          }
        />
      )}

      {currentUser.metadata.modal && (
        // Show modal if modal flag is set in currentUser metadata
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
        {/* Form inputs for username, email, and password */}
        {["username", "email", "password"].map((field) => {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
          const isPasswordField = field === "password";
          const inputType = isPasswordField
            ? "password"
            : field === "email"
            ? field
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

        {/* Checkbox for selecting magic link method */}
        <div className="flex items-center">
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
                    : process.env.REACT_APP_STRATEGY_EMAIL_CODE,
                },
              }))
            }
          />
          <label htmlFor="checkbox" className="font-semibold">
            Magic link method
          </label>
        </div>

        {/* Sign up button */}
        <FormButton text="Sign Up" loading={currentUser.metadata.loading} />

        {/* Footer */}
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
