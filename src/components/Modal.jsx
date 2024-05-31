import React from "react";
import { ReactComponent as closeIcon } from "../assets/astrix.svg";

// Reusable modal dialog component.

const Modal = ({
  title, // Title of the modal
  message, // Message to display
  onClose, // Function to close the modal
  onConfirm, // Function to handle confirmation action
  confirmText = "Close", // Text for the confirmation button (default is "Close")
}) => (
  <div className="modal-overlay">
    <div className="modal-container">
      <div className="modal-header">
        <h3 className="modal-title">{title}</h3>
        <button onClick={onClose} className="modal-close-button">
          {closeIcon}
        </button>
      </div>
      <div className="modal-body">
        <p className="modal-message">{message}</p>
      </div>
      <div className="modal-footer">
        <button onClick={onConfirm || onClose} className="modal-confirm-button">
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
