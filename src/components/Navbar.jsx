import React from "react";
import { Loading } from ".";
import { useLogout } from "../custom_hooks";

// Navbar component with logo and logout button
const Navbar = () => {
  const { handleLogout, loading } = useLogout(); // Using useLogout custom hook

  return loading ? ( // Display loading spinner if loading
    <Loading />
  ) : (
    // Navbar with logo and logout button
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white">
          <img
            src="https://app.contentblocks.com/favicon.ico"
            alt="Content Blocks Favicon"
          />
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600"
          onClick={handleLogout} // Logout button calls handleLogout function
          disabled={loading} // Disable button if loading
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
