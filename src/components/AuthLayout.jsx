import React from "react";
import bgImage from "../assets/bgImage.png";

// This is the AuthLayout component, which will be used for all the authentication pages/screens
const AuthLayout = ({ children }) => {
  return (
    <div
      className="bg-auth" // Applying background styling for the auth layout
      style={{
        backgroundImage: `url(${bgImage})`, // Setting the background image
      }}
    >
      {/* Container for the main content passed as children */}
      <div className="container">{children}</div>
      {/* Footer section */}
      <div className="footer">
        <div className="footer-text">
          © 2024 ContentBlocks. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
