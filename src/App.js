import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <>
      <button className="squre" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}

function Board({ xIsNext, squares, onPlay, moves }) {
  function handleClick(i) {
    if (whoIsWinner(squares) || squares[i]) {
      return;
    }
    const nextSqures = squares.slice();
    if (xIsNext) {
      nextSqures[i] = "X";
    } else {
      nextSqures[i] = "O";
    }

    onPlay(nextSqures);
  }
  const winner = whoIsWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="board">
        <strong>Tic tac toe Game</strong>
        <br />
        <br />
        <b>{status}</b>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>

        <div className="Gotomove-board">
          <b className="Gotomove">GoTo :</b>
          <br />
          {moves}
        </div>
      </div>

      <div className="footer">
        <footer>
          <p>Developer: Shivam sharma , hello.shivamzee@gmail.com</p>
        </footer>
      </div>
    </>
  );
}

//Main component of game
export default function TicTacToeGame(params) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Move " + move;
    } else {
      description = "Go to game start";
    }
    //This is jump to move button
    return (
      <b key={move}>
        <button className="movebutton" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </b>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          moves={moves}
        />
      </div>
    </div>
  );
}

function whoIsWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

////////////////////////////////////////////////////////////////
