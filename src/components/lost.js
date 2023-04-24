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
        <h1 style={{ textAlign: "center"}}>
          <i>You Lost</i>
          <br />
        </h1>
        <p style={{ textAlign: "center", lineHeight:'40px', fontSize:'20px'}}>
        Unfortunately, you were not able to locate the treasure in time. 
        The fate of the world now rests in the hands of those who can rise up to the challenge. 
        Will you be the ones to save us?
        </p>
      </div>
      <div className="btn" style={{ width: "500px" , marginLeft:'-10%'}}>
        <button onClick={navigateToLand}> &#8592; Go Back</button>
      </div>
    </div>
  );
};

export default Lost;
