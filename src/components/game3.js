import React, { useEffect, useState } from "react";
import "../styles/game.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

const Game3 = () => {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [btndis, setBtnDis] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showcorr, setShowCorr] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const url = window.location.href;
    const arr = url.split("/");
    // eslint-disable-next-line
    setUserId(arr[4]);
  }, [userId]);

  // console.log(userId);

  useEffect(() => {
    if (showcorr) {
      const timer = setTimeout(() => {
        setShowCorr(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showcorr]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.toUpperCase();
    setInputValue(formattedValue);
  };

  const handlesubmit = () => {
    setShowCorr(true);
    if (inputValue === "WASP") {
      setBtnDis(true);
      setCorrect(true);
    } else {
      setBtnDis(false);
      setCorrect(false);
    }
  };

  const handleNext = () => {
    const updateUser = async () => {
      const userDoc = doc(db, "users", userId);
      const newField = { level: Number(4) };
      const newTime = { time2: Number(time) };
      await updateDoc(userDoc, newField);
      await updateDoc(userDoc, newTime);
    };
    updateUser();
    nav(`/game/${userId}/4`);
  };

  const handleQuit = () => {
    nav(`/home/${userId}`);
  };

  return (
    <>
      <div className="gamebody">
        <div className="heading1">
          <h1>
            <i> &#9733; RIDDLE 3 &#9733;</i>
          </h1>
          <h1 className="he">{formatTime(time)}</h1>
        </div>
        <div className="gamecontent">
          <p>
          I am small yet fierce, my wings a blur,
          My power immense, my courage pure.
          My name a bug, yet I'm so much more,
          A hero of the Avengers, whom foes abhor.
          Who am I, in yellow and black attire,
          My might and bravery, all villains admire?
          <br></br><a href='https://www.bing.com/images/search?view=detailV2&ccid=Fjfhqnyv&id=E474C1815FDCFF9A1D4A6F38D99CAC04AF964C7A&thid=OIP.Fjfhqnyv1Vk0eNtpcE5UnwHaL9&mediaurl=https%3a%2f%2fwallpapersmug.com%2fdownload%2f950x1534%2f7f59dc%2fwasp-marvel-comics-art.jpg&exph=1534&expw=950&q=the+wasp+marvel&simid=607996739138694861&FORM=IRPRST&ck=049D50A8FA0F2E5A351340B6CF9B0206&selectedIndex=0' target='_blank'>
            Reference link
          </a>
          </p>

          <input
            id="input-field"
            type="text"
            value={inputValue}
            placeholder="__ __ __ __"
            onChange={handleInputChange}
            autoComplete="off"
          />

          <button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "blue",
              marginLeft:'25%',
              fontSize:'20px'
            }}
            onClick={handlesubmit}
          >
            Submit
          </button>

          <div
            className="answer"
            style={
              correct
                ? {
                    fontSize: "20px",
                    marginLeft:'-30%',
                    color: "green",
                  }
                : {
                    fontSize: "20px",
                    marginLeft:'-40%',
                    color: "red",
                    // background: "red",
                  }
            }
          >
            {showcorr
              ? correct
                ? "Correct answer you can proceed"
                : " wrong answer "
              : ""}
          </div>
        </div>

        <div className="btn">
          <button
            className="left-button"
            style={{ width: "10%" }}
            onClick={handleQuit}
          >
            Quit
          </button>
          <button
            className="right-button"
            style={
              btndis ? { width: "10%" } : { width: "10%", background: "gray" }
            }
            disabled={!btndis}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Game3;
