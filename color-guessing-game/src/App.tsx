import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [colors, setColors] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([0, "white"]);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);

  useEffect(() => {
    const correctOption = Math.floor(Math.random() * 3);
    setCorrectAnswer([correctOption, colors[correctOption]]);
  }, [colors]);

  const resetColors = () => {
    const newColors = new Array(3).fill(1).map((item) => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    });
    const options = document.getElementsByClassName("options");
    for (let i = 0; i < options.length; i++) {
      options[i].style.backgroundColor = "grey";
    }
    setColors([...newColors]);
  };

  const guessed = (guessedColor) => {
    if (correctAnswer[1] == guessedColor) {
      setAnsweredCorrect(true);
      resetColors();
    } else {
      event.target.style.backgroundColor = "red";
    }
  };

  return (
    <div className="App">
      <button onClick={resetColors}>Reset Color</button>
      <div
        className="colorBlock"
        style={{ backgroundColor: correctAnswer[1] }}
      ></div>
      <div className="guessOptions">
        {colors.map((color) => {
          return (
            <button
              className="options"
              onClick={() => guessed(color)}
              style={{ backgroundColor: "grey" }}
            >
              {color}
            </button>
          );
        })}
      </div>
      <div
        id="correctGuess"
        style={{ display: answeredCorrect ? "block" : "none" }}
      >
        You won nothing!!
      </div>
    </div>
  );
}

export default App;
