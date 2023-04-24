import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feature.css";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Lost = () => {
  const [userId, setUserId] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const arr = url.split("/");
    // eslint-disable-next-line
    setUserId(arr[4]);
  }, [userId]);

  const navigateToLand = () => {
    const updateUser = async () => {
      const userDoc = doc(db, "users", userId);
      const newField = { level: Number(1) };
      await updateDoc(userDoc, newField);
    };
    updateUser();
    nav(`/home/${userId}`);
  };

  return (
    <div className="asd">
      <div className="ma">
        <h1 style={{ textAlign: "center" }}>
          <i>
            You are now a <br /> Avenger
          </i>
          <br />
        </h1>
        <p style={{ textAlign: "center", lineHeight:"40px" }}>
        Congratulations, Rookie Avenger! You have successfully completed the treasure hunt 
        and saved the world from impending doom. Your bravery and marvelous skills have made you true hero. 
        You have proven that anything is possible when we believe in ourselves. <br />
          <a
            href="https://youtu.be/FQ1Y0C0qbMA"
            target="_blank"
            style={{
              color: "green",
              textDecoration: "none",
              // background: "red",
              textAlign: "center",
            }}
          >
            Here, Claim your triumph !!!
          </a>
        </p>
      </div>
      <div className="btn" style={{ width: "500px" }}>
        <button onClick={navigateToLand}> &#8592; Go Home</button>
      </div>
    </div>
  );
};

export default Lost;
