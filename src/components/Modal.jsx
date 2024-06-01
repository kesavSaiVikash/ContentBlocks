import React from "react";
import { ReactComponent as CloseIcon } from "../assets/closeIcon.svg";

// Reusable modal dialog component with dynamic title, message, confirm text, and close/confirm functionality.

const Modal = ({
  title, // Title of the modal
  message, // Message content of the modal
  onClose, // Function to handle closing the modal
  onConfirm, // Function to handle confirm action
  confirmText = "Close", // Text for the confirm button, default is "Close"
}) => (
  <div className="modal-overlay">
    <div className="modal-container">
      {/* Modal header with title and close button */}
      <div className="modal-header">
        <h3 className="modal-title">{title}</h3>
        <button onClick={onClose} className="modal-close-button">
          <CloseIcon />
        </button>
      </div>
      {/* Modal body with the message content */}
      <div className="modal-body">
        <p className="modal-message">{message}</p>
      </div>
      {/* Modal footer with the confirm button */}
      <div className="modal-footer">
        <button onClick={onConfirm || onClose} className="modal-confirm-button">
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
