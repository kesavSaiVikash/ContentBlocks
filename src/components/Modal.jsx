import React from "react";

// Reusable modal dialog component
const Modal = ({
  title, // Title of the modal
  message, // Message to display
  onClose, // Function to close the modal
  onConfirm, // Function to handle confirmation action
  confirmText = "Close", // Text for the confirmation button (default is "Close")
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white max-w-md w-full mx-4 rounded-md shadow-lg">
      {/* Modal header */}
      <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={onClose} // Close button
          className="text-gray-400 hover:text-gray-800 focus:outline-none"
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
      <div className="px-6 py-4">
        <p className="text-xl text-center mt-4 text-gray-600">{message}</p>
      </div>
      {/* Modal footer with confirmation button */}
      <div className="flex justify-end px-6 py-4">
        <button
          onClick={onConfirm || onClose} // If onConfirm is not provided, close the modal
          className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
