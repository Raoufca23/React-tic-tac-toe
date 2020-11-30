import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [nextPlayer, setNextPlayer] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [lineWinner, setLineWinner] = useState([]);
  const current = history[stepNumber];

  const player = nextPlayer ? "X" : "O";

  const handleClick = (i) => {
    const histories = history.slice(0, stepNumber + 1);
    const current = histories[histories.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = player;
    setHistory([...history, { squares }]);
    setNextPlayer(!nextPlayer);
    setStepNumber(histories.length);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(current.squares);

  useEffect(() => {
    if (stepNumber !== 0) {
      const indexes = history[stepNumber].squares
        .map((item, index) => (item === winner ? index : ""))
        .filter(String);
      setLineWinner(indexes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  const jumpTo = (step) => {
    setNextPlayer(step % 2 === 0);
    setStepNumber(step);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setNextPlayer(true);
    setLineWinner([]);
  };

  const moves = history.map((step, move) => {
    if (move === 0) {
      return false;
    }
    const desc = move && "Go to move #" + move;
    return (
      <li key={move}>
        <button className="btn" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          openSidebar={() => openSidebar()}
          handleClick={(i) => handleClick(i)}
          squares={current.squares}
          player={player}
          winner={winner}
          resetGame={resetGame}
          lineWinner={lineWinner}
        />
      </div>
      <div className="game-info">
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={closeSidebar}
          moves={moves}
        />
      </div>
    </div>
  );
}

export default App;
