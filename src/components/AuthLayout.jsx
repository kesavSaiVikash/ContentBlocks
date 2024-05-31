import React from "react";
import bgImage from "../assets/bgImage.png";

// This is auth layout component which will be used on all the auth pages/ screens.

const AuthLayout = ({ children }) => {
  return (
    <div
      className="bg-auth"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container">{children}</div>
      <div className="footer">
        <div className="footer-text">
          © 2024 ContentBlocks. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
