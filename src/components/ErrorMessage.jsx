import React from "react";

// This is a dynamic error message component where message is passed as a prop,
// so basically this component can be imported & called on any page of our project with dynamic message prop.

const ErrorMessage = ({ message }) => {
  return (
    <div
      className="border border-red-500 bg-red-100 text-red-900 px-4 py-3 rounded relative" // Styling for the error message container
      role="alert"
    >
      <span className="font-bold block sm:inline">{message}</span>
      {/* Display the error message */}
    </div>
  );
};

export default ErrorMessage;
