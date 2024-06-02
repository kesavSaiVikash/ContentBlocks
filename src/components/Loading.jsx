import React from "react";

// Loading component that displays a spinner and a loading text.

const Loading = () => {
  return (
    <div className="loading-overlay">
      {/* Spinner */}
      <div className="loading-spinner"></div>
      {/* Loading text displayed below the spinner */}
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading;
