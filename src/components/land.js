import React from "react";
import "../styles/land.css";
import Img from "../styles/logo1.png";
import { useNavigate } from "react-router-dom";

const Land = () => {
  const nav = useNavigate();

  const navigateToAuth = () => {
    nav("/auth");
  };

  const navigateToAbout = () => {
    nav("/about");
  };

  const navigateToFeat = () => {
    nav("/feature");
  };

  const navigateToLead = () => {
    nav("/leader");
  };

  return (
    <>
      <div className="header">
        <ul>
          <li onClick={navigateToAbout}>About</li>
          <li onClick={navigateToFeat}>Features</li>
          <li>
            <img
              src={Img}
              alt="LOGO"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                marginTop: "0px",
              }}
            />
          </li>
          <li onClick={navigateToAuth}>Login</li>
          <li onClick={navigateToLead}>Leader Board</li>
        </ul>
      </div>
      <main>
        <p>
        Join the Avengers on a thrilling treasure hunt adventure and uncover the ultimate treasure that will save the world!
        </p>
        <button onClick={navigateToAuth}>Play Now</button>
      </main>
    </>
  );
};

export default Land;
