import React, { useState } from "react";
import { useSession } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Navbar = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await session.end();
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
        </div>{" "}
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
