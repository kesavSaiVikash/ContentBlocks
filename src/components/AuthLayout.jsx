import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: `url("https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png")`,
      }}
    >
      <div className="bg-white p-8 border-2 border-black rounded-md max-w-lg mx-auto shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
