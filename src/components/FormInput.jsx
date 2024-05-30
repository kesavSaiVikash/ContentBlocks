import React from "react";
import { ErrorMessage } from "../components"; // Importing the ErrorMessage component

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
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-2 font-semibold">
      {placeholder}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
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
    {errors[name] && <ErrorMessage message={errors[name].message} />}{" "}
    {/* Show error message if there is an error for this input */}
  </div>
);

export default FormInput;
