import React, { useEffect, useState } from "react";
import { images } from "../styles/images";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

function Game5() {
  const nav = useNavigate();

  const BLANK_CARD =
    "https://i.pinimg.com/originals/d3/4d/07/d34d0752a010c2bd0f7bbbabae695b65.jpg";

  const [userId, setUserId] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenIds, setCardsChosenIds] = useState([]);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(120);
  const [openCards, setOpenCards] = useState([]);
  const [btndis, setBtnDis] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function createCardBoard() {
    const imagesGenerated = images?.concat(...images);
    console.log(imagesGenerated);
    const shuffledArray = shuffleArray(imagesGenerated);
    setImagesArray(shuffledArray);
  }

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds === 0) {
      nav(`/lost/${userId}`);
    }
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

  function flipImage(image, index) {
    if (cardsChosenIds?.length === 1 && cardsChosenIds[0] === index) {
      return;
    }

    if (cardsChosen?.length < 2) {
      setCardsChosen((cardsChosen) => cardsChosen?.concat(image));
      setCardsChosenIds((cardsChosenIds) => cardsChosenIds?.concat(index));

      if (cardsChosen?.length === 1) {
        if (cardsChosen[0] === image) {
          setPoints((points) => points + 2);
          console.log(points);
          if (points === 10) {
            setBtnDis(true);
          }
          setOpenCards((openCards) =>
            openCards?.concat([cardsChosen[0], image])
          );
        }
        setTimeout(() => {
          setCardsChosenIds([]);
          setCardsChosen([]);
        }, 700);
      }
    }
  }

  function isCardChosen(image, index) {
    return cardsChosenIds?.includes(index) || openCards?.includes(image);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    createCardBoard();
  }, []);

  const handleNext = () => {
    const updateUser = async () => {
      const userDoc = doc(db, "users", userId);
      const newField = { level: Number(1) };
      await updateDoc(userDoc, newField);
    };
    updateUser();
    nav(`/vic/${userId}`);
  };

  const handleQuit = () => {
    nav(`/home/${userId}`);
  };

  return (
    <div className="gamebody" style={{backgroundColor:"white"}}>
      <h1 className="he">{formatTime(time)}</h1>
      <div className="heading1">
        <h1>
          <i> &#9733; RIDDLE 5 &#9733;</i>
        </h1>
        {points <= 10 && (
          <h2
            style={{
              display: "inline-block",
              marginTop: "5%",
              marginLeft:"-5%",
              color: "black",
              fontSize:"30px",
              // background: "black",
              // opacity: ".7",
              textShadow:"0 2px 5px blue",
              // padding: "5px",
            }}
          >
            choose similar images
          </h2>
        )}
        {points >= 12 && (
          <h2
            style={{
              display: "inline-block",
              marginTop: "5%",
              marginLeft:"-5%",
              color: "white",
              background: "green",
              opacity: ".7",
              padding: "5px",
              borderRadius: "20px",
            }}
          >
            You can proceed !!!
          </h2>
        )}
      </div>

      <div
        className="row no-gutters"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          marginTop: "-30%",
          marginLeft:"-100%",
          height: "800px",
          width: "800px",
        }}
      >
        {imagesArray?.map((image, index) => {
          return (
            <div
              className="imagecontent"
              key={index}
              onClick={() => flipImage(image, index)}
              style={{
                flex: "1 0 21%",
              }}
            >
              <img
                src={isCardChosen(image, index) ? image : BLANK_CARD}
                alt=""
                className="image"
                style={{
                  width: "calc(100% - 10px)",
                  height: "150px",
                  border: "5px groove brown",
                  borderRadius: "10px",
                  margin: "10px",
                  padding: "5px",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="btn" style={{ marginTop: "-150px" }}>
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
  );
}
export default Game5;
