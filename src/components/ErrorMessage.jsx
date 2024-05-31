import React from "react";

// This is a dynamic error message component where message is passed as a prop,
// so basically this component can be imported & called on any page of our project with dynamic message prop.

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container" role="alert">
      <span className="error-message">{message}</span>
    </div>
  );
};

export default ErrorMessage;
