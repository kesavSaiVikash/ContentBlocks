import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div
      className="border border-red-500 bg-red-100 text-red-900 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="font-bold block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;
