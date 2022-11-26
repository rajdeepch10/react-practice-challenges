import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import Symbol from "./symbol";

function App() {
  const [filled, setFilled] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [lastFilled, setLastFilled] = useState(null);
  const [winner, setWinner] = useState();

  const docListener = useCallback(
    (e) => {
      if (
        e.target.children[0].classList.contains("empty") &&
        (winner !== undefined || winner !== null)
      ) {
        const currentFilled = filled;
        const toBeFilled = lastFilled === null ? 0 : lastFilled === 1 ? 0 : 1;
        currentFilled[parseInt(e.target.children[0].classList[1])] = toBeFilled;
        console.info(toBeFilled);
        setLastFilled(toBeFilled);
        setFilled(currentFilled);
      }
    },
    [filled, lastFilled, winner]
  );

  useEffect(() => {
    if (winner !== null && winner !== undefined) {
      const currentFilled = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      console.info("winner set");
      setFilled(currentFilled);
    }
  }, [winner]);

  useEffect(() => {}, []);

  useEffect(() => {
    window.addEventListener("click", docListener);
    console.info(lastFilled);
    const currentFilled = filled;
    const firstRow = [];
    const secondRow = [];
    const thirdRow = [];

    currentFilled.forEach((item, index) => {
      if (index < 3) {
        firstRow.push(item);
      } else if (index < 6) {
        secondRow.push(item);
      } else {
        thirdRow.push(item);
      }
    });
    let alertMessage = "";
    if (firstRow[0] !== null) {
      if (firstRow[0] === firstRow[1] && firstRow[0] === firstRow[2]) {
        alertMessage = firstRow[0] === 0 ? "Circle Wins" : "Cross Wins";
        window.removeEventListener("click", docListener);
      }
      if (firstRow[0] === secondRow[1] && firstRow[0] === thirdRow[2]) {
        alertMessage = firstRow[0] === 0 ? "Circle Wins" : "Cross Wins";
        window.removeEventListener("click", docListener);
      }
    }
    if (secondRow[0] !== null) {
      if (secondRow[0] === secondRow[1] && secondRow[0] === secondRow[2]) {
        alertMessage = secondRow[0] === 0 ? "Circle Wins" : "Cross Wins";
        window.removeEventListener("click", docListener);
      }
    }
    if (thirdRow[0] !== null) {
      if (thirdRow[0] === thirdRow[1] && thirdRow[0] === thirdRow[2]) {
        alertMessage = thirdRow[0] === 0 ? "Circle Wins" : "Cross Wins";
        window.removeEventListener("click", docListener);
      }
      if (thirdRow[0] === secondRow[1] && thirdRow[0] === firstRow[2]) {
        alertMessage = thirdRow[0] === 0 ? "Circle Wins" : "Cross Wins";
        window.removeEventListener("click", docListener);
      }
    }

    for (let i = 0; i < 3; i++) {
      if (firstRow[i] !== null) {
        if (firstRow[i] === secondRow[i] && secondRow[i] === thirdRow[i]) {
          alertMessage = firstRow[i] === 0 ? "Circle Wins" : "Cross Wins";
          window.removeEventListener("click", docListener);
        }
      }
    }
    setWinner(alertMessage === "" ? null : alertMessage);
    console.info({ firstRow, secondRow, thirdRow });
  }, [lastFilled]);

  return (
    <div className="App">
      <div className="winner">{winner ?? "Game ongoing"}</div>
      <div className="board">
        {filled.map((item, index) => {
          return (
            <div className={index % 3 === 0 ? "tile tile-begin" : "tile"}>
              <Symbol data={item} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
