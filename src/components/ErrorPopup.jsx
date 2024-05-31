import React from "react";
import { ReactComponent as closeIcon } from "../assets/closeIcon.svg";

// This is a dynamic error popup component where message is passed as a prop,
// so basically this component can be imported & called on any page of our project with dynamic message prop.

const ErrorPopup = ({ message, onClose }) => (
  <div className="overlay">
    <div className="popup">
      <div className="popup-header">
        <h3 className="popup-title">Error</h3>
        <button onClick={onClose} className="close-button">
          {closeIcon}
        </button>
      </div>
      <div className="popup-message">
        <p>{message}</p>
      </div>
      <div className="popup-footer">
        <button onClick={onClose} className="close-button-footer">
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ErrorPopup;
