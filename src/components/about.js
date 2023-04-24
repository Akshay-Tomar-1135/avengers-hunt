import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feature.css";
const About = () => {
  const nav = useNavigate();
  const navigateToLand = () => {
    nav("/");
  };

  return (
    <div className="asd">
      <div className="ma">
        <h1 style={{ textAlign: "center" }}>
          <i>About Me</i>
          <br />
          &#128102;
        </h1>
        <p style={{ textAlign: "center"}}>Hi &#128075; I am Akshay Tomar, is a skilled developer with a passion for creating innovative solutions that improve people's lives. I have honed my technical skills in  various programming languages, tools and frameworks. I am creative problem solver with a keen eye for detail and a collaborative approach to teamwork. When I am not coding, I enjoys reading books, watching movies, etc.
        </p>
      </div>
      <div className="btn">
        <button onClick={navigateToLand}> &#8592; Go Back</button>
      </div>
    </div>
  );
};

export default About;
