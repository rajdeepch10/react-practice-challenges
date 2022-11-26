import React from "react";

const Symbol = (props) => {
  if (props.data !== null) {
    return <div className={props.data === 0 ? "circle" : "cross"}></div>;
  } else {
    return <div className={`empty ${props.index}`}></div>;
  }
};

export default Symbol;
