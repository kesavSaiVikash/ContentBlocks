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
  const { login, setCurrentUser, currentUser } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Show loading indicator until sign-in, session, and user data are loaded
  if (!currentUser) {
    return <Loading />;
  }

  return (
    <AuthLayout>
      {currentUser.metadata.modal && (
        <Modal
          message="Email with a magic link has been sent to your email."
          confirmText="Close"
          title="Magic Link Success"
          onClose={() => {
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: {
                ...prevState.metadata,
                modal: false,
                strategy: "email_code",
              },
            }));
          }}
        />
      )}

      {currentUser.metadata.error && (
        <ErrorPopup
          message={currentUser.metadata.error}
          onClose={() =>
            setCurrentUser((prevState) => ({
              ...prevState,
              metadata: {
                ...prevState.metadata,
                error: null,
              },
            }))
          }
        />
      )}

      <h2 className="login-title">Welcome Back!</h2>

      <form className="login-form" onSubmit={handleSubmit(login)}>
        <FormInput
          id="email"
          name="email"
          type={
            currentUser.metadata.strategy === "email_link" ? "email" : "text"
          }
          placeholder={
            currentUser.metadata.strategy === "email_link"
              ? "Email"
              : "Username/ Email"
          }
          register={register}
          errors={errors}
        />
        {currentUser.metadata.strategy === "email_code" && (
          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
          />
        )}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              checked={currentUser.metadata.strategy === "email_link"}
              className="checkbox-input"
              {...register("checkbox")}
              onChange={(e) =>
                setCurrentUser((prevState) => ({
                  ...prevState,
                  metadata: {
                    ...prevState.metadata,
                    strategy: e.target.checked ? "email_link" : "email_code",
                  },
                }))
              }
            />
            <label htmlFor="checkbox" className="checkbox-label">
              Magic link method
            </label>
          </div>
          <div>
            <a href="/forgot-password" className="forgot-password-link">
              Forgot password?
            </a>
          </div>
        </div>

        <FormButton text="Login" loading={currentUser.metadata.loading} />
      </form>

      <div className="divider">
        <h2 className="divider-text">OR</h2>
      </div>
      <div className="mt-4 text-center">
        <div className="get-started-title">Get Started with ContentBlocks</div>
        <a className="get-started-button" href="/register">
          Create Your Account
        </a>
        <div className="free-workspace-text">Your first workspace is free!</div>
      </div>
    </AuthLayout>
  );
};

export default Login;
