import React from "react";
import { ErrorMessage } from "../components";

// This is a form input component with error handling

const FormInput = ({ id, name, type, placeholder, register, errors }) => (
  <div className="input-container">
    {/* Container for the input field and its error message */}
    <label htmlFor={id} className="input-label">
      {/* Label for the input field */}
      {placeholder} {/* Use the placeholder text as the label */}
    </label>
    <input
      id={id} // Set the ID for the input field
      name={name} // Set the name attribute for the input field
      type={type} // Set the type of the input (e.g., text, email, password)
      placeholder={placeholder} // Set the placeholder text for the input field
      className="input-field" // Apply CSS class for styling
      {...register(name, {
        // Register the input field with react-hook-form
        required: `${placeholder} is required.`, // Set the required validation message
        ...(type === "email" && {
          // If the input type is email, add an email pattern validation
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Enter a valid email address.",
          },
        }),
      })}
    />
    {/* Display an error message if there is a validation error for this input field */}
    {errors[name] && <ErrorMessage message={errors[name].message} />}
  </div>
);

export default FormInput;
