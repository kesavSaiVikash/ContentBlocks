import React, { useEffect } from "react";
import { Navbar, Loading } from "../components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUserAtom } from "../utils/store";

const Home = () => {
  const navigate = useNavigate();
  const [currentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    if (!currentUser.session) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      {currentUser.metadata.loading && <Loading />}
      <Navbar />
      <div className="home-container">
        <div className="home-inner-container">
          <div className="home-text-center">
            <h1 className="home-title">Welcome back, {currentUser.username}</h1>
            <p className="home-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
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
