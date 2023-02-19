import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputArray, setInputArray] = useState([1, 2]);
  const [joinedArray, setJoinedArray] = useState();

  const handleClick = (position, value) => {
    let indexToAdd = value;
    let currentArray = [...inputArray];
    if (position == "front") indexToAdd = indexToAdd;
    if (position == "back") indexToAdd = indexToAdd + 1;

    if (indexToAdd == -1) {
      currentArray.unshift(null);
    } else if (indexToAdd > currentArray.length) {
      currentArray.push(null);
    } else {
      currentArray.splice(indexToAdd, 0, null);
    }

    setInputArray([...currentArray]);
  };

  const handleChange = (e, index) => {
    e.preventDefault();
    let currentArray = [...inputArray];
    currentArray[index] = e.target[0].value;
    setInputArray([...currentArray]);
  };

  const handleButtonClick = (e) => {
    setJoinedArray(inputArray.join(","));
  };

  useEffect(() => {}, [inputArray]);

  return (
    <div className="App">
      <div className="arrayContainer">
        {inputArray.map((item, index) => (
          <div className="arrayItem" key={index} data-value={item}>
            {item === null ? (
              <>
                <form onSubmit={(e) => handleChange(e, index)}>
                  <input></input>
                  <input type="submit" hidden />
                </form>
              </>
            ) : null}
            {item !== null ? (
              <>
                <a
                  className="clicker"
                  href="#"
                  onClick={(e) => handleClick("front", index)}
                ></a>
                {item}
                <a
                  className="clicker"
                  href="#"
                  onClick={(e) => handleClick("back", index)}
                ></a>
              </>
            ) : null}
          </div>
        ))}
      </div>
      <button className="joinButton" onClick={(e) => handleButtonClick(e)}>
        Join Array
      </button>
      <div className="showResult">Joined Array: {joinedArray}</div>
    </div>
  );
}

export default App;
