import React from "react";
import { FaHistory } from "react-icons/fa";
import Square from "./Square";

function Board({
  openSidebar,
  winner,
  player,
  squares,
  handleClick,
  resetGame,
  lineWinner,
}) {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        winner={lineWinner.includes(i)}
      />
    );
  };

  const status = winner ? `${winner} is the winner` : `Next player: ${player}`;

  return (
    <>
      <div className="status">
        <h2>{status}</h2>
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="sidebar-toggle" onClick={openSidebar}>
        <FaHistory />
      </button>
      <button onClick={resetGame} className="btn">
        Reset game
      </button>
    </>
  );
}

export default Board;
