import React from "react";
import { Loading } from "."; // Importing the Loading component
import { useLogout } from "../custom_hooks"; // Importing the custom hook for logout functionality

// Navbar component with logo and logout button

const Navbar = () => {
  const { handleLogout, loading } = useLogout(); // Destructuring handleLogout and loading from the custom hook

  return loading ? (
    <Loading /> // Show loading spinner if logout process is in progress
  ) : (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Navbar logo */}
        <div className="navbar-logo">
          <img
            src="https://app.contentblocks.com/favicon.ico"
            alt="Content Blocks Favicon"
          />
        </div>
        {/* Logout button */}
        <button
          className="navbar-button"
          onClick={handleLogout}
          disabled={loading} // Disable button when loading
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
