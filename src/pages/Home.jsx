import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useSession, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { sessionAtom, userAtom } from "../utils/store";

const Home = () => {
  const { isLoaded: isSessionLoaded, session } = useSession();
  const { isLoaded: isUserLoaded, user } = useUser();
  const [storedSession, setStoredSession] = useAtom(sessionAtom);
  const [storedUser, setStoredUser] = useAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSessionLoaded || !isUserLoaded) return;

    if (session && user) {
      setStoredSession(session);
      setStoredUser(user);
    } else {
      navigate("/login");
    }
  }, [
    isSessionLoaded,
    isUserLoaded,
    session,
    user,
    setStoredSession,
    setStoredUser,
    navigate,
  ]);

  if (!storedSession || !storedUser) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome back, {storedUser.username}
            </h1>
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <div className="mt-12">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-md font-semibold"
                onClick={() => navigate("/https://app.contentblocks.com/")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
