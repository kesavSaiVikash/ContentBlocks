import React from "react";
import { useClerk } from "@clerk/clerk-react"; // Import useClerk hook
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { loadingAtom } from "../utils/store";
import { useAtom } from "jotai";

const Navbar = () => {
  const { signOut } = useClerk(); // Get the clerk object
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);

  const handleLogout = async () => {
    setLoading(true);
    await signOut(); // Use the signOut method
    setLoading(false);
    navigate("/login");
  };

  return loading ? (
    <Loading />
  ) : (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white">
          <img src="https://app.contentblocks.com/favicon.ico" alt="" />
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
