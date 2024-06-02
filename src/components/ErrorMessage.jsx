import React from "react";

// This is a dynamic error message component where the message is passed as a prop
// This component can be imported and used on any page of the project with a dynamic message prop

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container" role="alert">
      {/* Display the error message passed as a prop */}
      <span className="error-message">{message}</span>
    </div>
  );
};

export default ErrorMessage;
