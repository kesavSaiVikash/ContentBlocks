import React from "react";
import { ReactComponent as CloseIcon } from "../assets/closeIcon.svg";

// This is a dynamic error popup component where the message is passed as a prop
// This component can be imported and used on any page of the project with a dynamic message prop and close functionality

const ErrorPopup = ({ message, onClose }) => (
  <div className="overlay">
    {/* Overlay to cover the entire screen */}
    <div className="popup">
      {/* Popup container */}
      <div className="popup-header">
        {/* Header of the popup */}
        <h3 className="popup-title">Error</h3> {/* Title of the popup */}
        {/* Button to close the popup */}
        <button onClick={onClose} className="close-button">
          <CloseIcon /> {/* Close icon */}
        </button>
      </div>
      <div className="popup-message">
        {/* Message section of the popup */}
        <p>{message}</p> {/* Display the error message passed as a prop */}
      </div>
      <div className="popup-footer">
        {/* Footer of the popup */}
        {/* Close button at the footer */}
        <button onClick={onClose} className="close-button-footer">
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ErrorPopup;
