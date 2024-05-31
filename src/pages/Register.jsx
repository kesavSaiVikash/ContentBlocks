import React from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../custom_hooks";
import { useNavigate } from "react-router-dom";
import { currentUserAtom } from "../utils/store";
import { useAtom } from "jotai";
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

  // Custom hook to handle user registration
  const { registerUser, verifyEmail } = useRegister();

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
        onSubmit={handleSubmit((data) =>
          registerUser(data, currentUser.metadata.strategy)
        )}
        className="space-y-6"
      >
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

        <div className="flex items-center">
          <input
            id="checkbox"
            name="checkbox"
            type="checkbox"
            checked={currentUser.metadata.strategy === "email_link"}
            className="mr-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            {...register("checkbox")}
            onChange={(e) =>
              setCurrentUser((prev) => ({
                ...prev,
                metadata: {
                  ...prev.metadata,
                  strategy: e.target.checked ? "email_link" : "email_code",
                },
              }))
            }
          />
          <label htmlFor="checkbox" className="font-semibold">
            Magic link method
          </label>
        </div>

        <FormButton text="Sign Up" loading={currentUser.metadata.loading} />

        <div className="text-md text-center mt-4 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
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
