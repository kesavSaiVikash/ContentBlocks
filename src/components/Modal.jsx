import React from "react";

// Reusable modal dialog component
const Modal = ({
  title, // Title of the modal
  message, // Message to display
  onClose, // Function to close the modal
  onConfirm, // Function to handle confirmation action
  confirmText = "Close", // Text for the confirmation button (default is "Close")
}) => (
  <div className="modal-overlay">
    <div className="modal-container">
      {/* Modal header */}
      <div className="modal-header">
        <h3 className="modal-title">{title}</h3>
        <button
          onClick={onClose} // Close button
          className="modal-close-button"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {/* Modal body with message */}
      <div className="modal-body">
        <p className="modal-message">{message}</p>
      </div>
      {/* Modal footer with confirmation button */}
      <div className="modal-footer">
        <button
          onClick={onConfirm || onClose} // If onConfirm is not provided, close the modal
          className="modal-confirm-button"
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
