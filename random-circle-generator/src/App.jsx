import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [circles, setCircles] = useState([]);
  const circlesRef = useRef(null);

  useEffect(() => {
    circlesRef.current = circles;
  }, [circles]);

  const handleClearLatest = (e) => {
    const currentCircles = circles;
    currentCircles.pop();
    setCircles([...currentCircles]);
  };

  let drawCircle = (e) => {
    if (e.target.id !== "controlButton" && e.target.id !== "controlButton2") {
      const currentCircles = circlesRef.current;
      const randXY = [e.x * Math.random(), e.y * Math.random()];
      currentCircles.push(randXY);
      setCircles([...currentCircles]);
    }
  };

  useEffect(() => {
    document
      .getElementById("playground")
      ?.addEventListener("click", drawCircle);

    return () => {
      document
        .getElementById("playground")
        ?.removeEventListener("click", drawCircle);
    };
  }, []);

  return (
    <div className="App">
      <div className="controls">
        <button id="controlButton" onClick={handleClearLatest}>
          Clear latest
        </button>{" "}
        <button
          id="controlButton2"
          onClick={() => {
            setCircles([]);
          }}
        >
          Reset
        </button>
      </div>
      <div className="playground" id="playground">
        {circles.map((circle) => {
          return (
            <div
              className="circle"
              style={{
                position: "absolute",
                top: circle[1] + "px",
                left: circle[0] + "px",
                border: "0.3rem solid black",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
