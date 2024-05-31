import React from "react";
import { ErrorMessage } from "../components"; 

// A form input component with error handling
const FormInput = ({
  id,
  name,
  type,
  placeholder,
  register,
  errors,
  message,
}) => (
  <div className="input-container">
    <label htmlFor={id} className="input-label">
      {placeholder}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className="input-field"
      {...register(name, {
        required: `${placeholder} is required.`,
        ...(type === "email" && {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Enter a valid email address.",
          },
        }),
      })}
    />
    {errors[name] && <ErrorMessage message={errors[name].message} />}
    {/* Show error message if there is an error for this input */}
  </div>
);

export default FormInput;
