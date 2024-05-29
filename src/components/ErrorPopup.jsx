import React from "react";

const ErrorPopup = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white max-w-md w-full mx-4 rounded-md shadow-lg">
      <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">Error</h3>
        <button
          onClick={onClose}
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
      <div className="px-6 py-4">
        <p className="text-xl text-center mt-4 text-gray-600">{message}</p>
      </div>
      <div className="flex justify-end px-6 py-4">
        <button
          onClick={onClose}
          className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ErrorPopup;
