import React from "react";

// Loading component with a spinner and text
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      {/* Spinner animation */}
      <div className="animate-spin rounded-full h-32 w-32 border-4 border-purple-500 mb-4"></div>
      {/* Loading text */}
      <p className="text-white text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
