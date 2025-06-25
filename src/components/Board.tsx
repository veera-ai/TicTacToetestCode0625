import React from "react";
import Square from "./Square";
import type { Player, SquareValue, BoardState } from "../App";

type BoardProps = {
  board: BoardState;
  onPlay: (index: number) => void;
  winner: Player | "draw" | null;
  testid?: string;
};

/**
 * Board renders a 3x3 grid of squares for the tic tac toe game.
 * Handles focus management and accessibility.
 */
// PUBLIC_INTERFACE
function Board({ board, onPlay, winner, testid }: BoardProps) {
  // For keyboard navigation, tabIndex is managed for only empty squares
  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe Board"
      data-testid={testid}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, var(--square-size))",
        gridTemplateRows: "repeat(3, var(--square-size))",
        gap: "8px",
        margin: "0.8em 0",
        userSelect: "none",
      }}
    >
      {board.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          index={idx}
          onClick={onPlay}
          disabled={!!winner || value !== null}
          highlight={calcWinHighlight(winner, board, idx)}
          testid={`square-${idx}`}
        />
      ))}
    </div>
  );
}

/**
 * If there's a win, highlight winning squares.
 * Returns true if the idx is part of the win line.
 */
function calcWinHighlight(
  winner: Player | "draw" | null,
  board: BoardState,
  idx: number
): boolean {
  if (!winner || winner === "draw") return false;
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
  return lines.some(
    (line) =>
      line.includes(idx) &&
      line.every((i) => board[i] === winner)
  );
}

export default Board;
