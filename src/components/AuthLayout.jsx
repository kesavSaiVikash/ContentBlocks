import React from "react";

// This component is a layout for authorization pages, which this AuthLayout will be wrapped around the pages like login, register, and forgot password.
// By doing this way reduces the rewriting of the same code.

const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 bg-cover bg-center" // Styling for the background image
      style={{
        backgroundImage: `url("https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png")`, // Background image URL
      }}
    >
      <div className="bg-white p-8 border-2 border-black rounded-md max-w-lg mx-auto shadow-lg">
        {/* Container for the content */}
        {children} {/* Render the children components */}
      </div>
      <div className="max-w-lg mx-auto p-8 mt-2 text-center">
        {/* Container for the footer */}
        <div
          className="font-bold text-sm text-white"
          style={{ textShadow: "3px 3px 0px rgba(0, 0, 0, 0.1)" }} // Styling for the text shadow
        >
          © 2024 ContentBlocks. All rights reserved. {/* Footer text */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
