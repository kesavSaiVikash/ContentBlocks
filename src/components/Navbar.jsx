import React from "react";
import { Loading } from "../components";
import { useLogout } from "../hooks";

// This is basic Navbar component which is used on the Home page after user logged in.
// This component uses useLogout custom hook for logout functionality.

const Navbar = () => {
  const { handleLogout, loading } = useLogout();

  return loading ? (
    <Loading />
  ) : (
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
          onClick={handleLogout}
          disabled={loading}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
