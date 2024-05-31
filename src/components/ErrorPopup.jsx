import React from "react";

// This is a dynamic error popup component where message is passed as a prop,
// so basically this component can be imported & called on any page of our project with dynamic message prop.

const ErrorPopup = ({ message, onClose }) => (
  <div className="overlay">
    {/* Fixed position overlay for the error popup */}
    <div className="popup">
      {/* Popup content */}
      <div className="popup-header">
        {/* Header with close button */}
        <h3 className="popup-title">Error</h3>
        {/* Error title */}
        <button
          onClick={onClose}
          className="close-button"
          // Close button styling
        >
          <svg
            className="close-icon"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
            {/* Close icon */}
          </svg>
        </button>
      </div>
      <div className="popup-message">
        {/* Error message */}
        <p>{message}</p>
      </div>
      <div className="popup-footer">
        {/* Close button */}
        <button onClick={onClose} className="close-button-footer">
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ErrorPopup;
