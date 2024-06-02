import React from "react";
import { useAtom } from "jotai";
import { Navbar, Loading } from "../components";
import { currentUserAtom } from "../utils/store";
const Home = () => {
  const [currentUser] = useAtom(currentUserAtom); // Accessing the currentUser state using the jotai atom

  return (
    <>
      {/* Display Loading component if the loading state is true */}
      {currentUser.metadata.loading && <Loading />}

      {/* Render the Navbar */}
      <Navbar />

      {/* Main container for the home page content */}
      <div className="home-container">
        <div className="home-inner-container">
          <div className="home-text-center">
            {/* Display a welcome message with the username */}
            <h1 className="home-title">Welcome back, {currentUser.username}</h1>

            {/* Placeholder text for home page description */}
            <p className="home-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>

            {/* Button container for the "Get Started" button */}
            <div className="home-button-container">
              <a
                className="home-button"
                href="https://app.contentblocks.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
