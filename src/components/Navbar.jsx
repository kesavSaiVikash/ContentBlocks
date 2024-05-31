import React from "react";
import { Loading } from ".";
import { useLogout } from "../custom_hooks";

// Navbar component with logo and logout button.

const Navbar = () => {
  const { handleLogout, loading } = useLogout();

  return loading ? ( // Display loading spinner if loading
    <Loading />
  ) : (
    // Navbar with logo and logout button.
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img
            src="https://app.contentblocks.com/favicon.ico"
            alt="Content Blocks Favicon"
          />
        </div>
        <button
          className="navbar-button"
          onClick={handleLogout} // Logout button calls handleLogout function.
          disabled={loading} // Disable button if loading.
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
