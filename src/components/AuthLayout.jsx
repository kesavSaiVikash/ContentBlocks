import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="bg-auth"
      style={{
        backgroundImage: `url("https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png")`,
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
