import React from "react";
import type { BoardState, Player } from "../App";

type GameStatusProps = {
  board: BoardState;
  winner: Player | "draw" | null;
  getNextPlayer: (b: BoardState) => Player;
  testid?: string;
};

/**
 * GameStatus: displays the current status of play, next turn, or result.
 */
// PUBLIC_INTERFACE
function GameStatus({
  board,
  winner,
  getNextPlayer,
  testid,
}: GameStatusProps) {
  let message: React.ReactNode;

  if (winner === "draw") {
    message = (
      <span style={{ color: "var(--draw)", fontWeight: 500 }}>
        It's a draw!
      </span>
    );
  } else if (winner === "X" || winner === "O") {
    message = (
      <span style={{ color: "var(--win)", fontWeight: 500 }}>
        Player {winner} wins!
      </span>
    );
  } else {
    const next = getNextPlayer(board);
    message = (
      <span>
        Next Turn:{" "}
        <b
          style={{
            color: next === "X" ? "var(--primary)" : "var(--danger)",
            letterSpacing: "2px",
          }}
        >
          {next}
        </b>
      </span>
    );
  }

  return (
    <div
      className="status-message"
      role="status"
      aria-live="polite"
      data-testid={testid}
      style={{
        minHeight: "1.7em",
        marginBottom: "0.7em",
        textAlign: "center",
        fontSize: "1.2em",
      }}
    >
      {message}
    </div>
  );
}

export default GameStatus;
