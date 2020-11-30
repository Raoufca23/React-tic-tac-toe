import React from "react";

function Square({ value, onClick, winner }) {
  return (
    <button className={`${winner ? "winner" : ""} square`} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
