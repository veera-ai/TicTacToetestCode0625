import React, { useState } from "react";
import Board from "./components/Board";
import GameStatus from "./components/GameStatus";
import ResetButton from "./components/ResetButton";
import "./App.css";

// Types for square, board, etc.
export type Player = "X" | "O";
export type SquareValue = Player | null;
export type BoardState = SquareValue[];

// Initialize empty board
const emptyBoard: BoardState = Array(9).fill(null);

function getNextPlayer(board: BoardState): Player {
  // Count X and O to determine whose turn
  const xCount = board.filter((v) => v === "X").length;
  const oCount = board.filter((v) => v === "O").length;
  return xCount === oCount ? "X" : "O";
}

/**
 * Returns "X" | "O" if winner, or "draw" if there's a draw, or null otherwise.
 */
export function calculateGameResult(board: BoardState): Player | "draw" | null {
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
  for (const [a, b, c] of lines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  if (board.every((sq) => sq !== null)) return "draw";
  return null;
}

// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState<BoardState>(emptyBoard);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);

  // Handles a square click
  const handlePlay = (index: number) => {
    if (board[index] !== null || winner) return;
    const next = getNextPlayer(board);
    const newBoard = [...board];
    newBoard[index] = next;
    setBoard(newBoard);
    setWinner(calculateGameResult(newBoard));
  };

  const handleReset = () => {
    setBoard(emptyBoard);
    setWinner(null);
  };

  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <GameStatus
        board={board}
        winner={winner}
        getNextPlayer={getNextPlayer}
        testid="gamestatus"
      />
      <Board
        board={board}
        onPlay={handlePlay}
        winner={winner}
        testid="board"
      />
      <ResetButton onReset={handleReset} testid="reset-btn" />
    </main>
  );
}

export default App;
