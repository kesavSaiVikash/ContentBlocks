import React from "react";

// Loading component with a spinner and text
const Loading = () => {
  return (
    <div className="loading-overlay">
      {/* Spinner animation */}
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading;
