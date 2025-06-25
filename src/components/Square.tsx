import React from "react";
import type { SquareValue } from "../App";

type SquareProps = {
  value: SquareValue;
  index: number;
  onClick: (idx: number) => void;
  disabled: boolean;
  highlight: boolean;
  testid?: string;
};

/**
 * Square component: renders a responsive button for a board cell with a11y and feedback.
 */
// PUBLIC_INTERFACE
function Square({
  value,
  index,
  onClick,
  disabled,
  highlight,
  testid,
}: SquareProps) {
  // ARIA-labels for screen readers
  const label =
    value === null
      ? `Empty, position ${indexToPositionString(index)}`
      : `${value} at position ${indexToPositionString(index)}`;
  return (
    <button
      className={`square${highlight ? " highlight" : ""}`}
      aria-label={label}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={() => !disabled && onClick(index)}
      data-testid={testid}
      style={{
        width: "var(--square-size)",
        height: "var(--square-size)",
        fontSize: "2.7em",
        background: highlight
          ? "var(--win)"
          : value === null
          ? "#fff"
          : "var(--highlight)",
        color: value === "X" ? "var(--primary)" : value === "O" ? "var(--danger)" : "#333",
        border: "2px solid #ddd",
        borderRadius: "7px",
        cursor: disabled ? "default" : "pointer",
        outline: highlight ? "3px solid var(--win)" : undefined,
        transition: "background 0.22s, outline 0.15s",
        fontWeight: "bold",
      }}
    >
      {value}
    </button>
  );
}

/**
 * Return a human-friendly (1,1) position string for SR.
 */
function indexToPositionString(idx: number): string {
  const row = Math.floor(idx / 3) + 1;
  const col = (idx % 3) + 1;
  return `${row},${col}`;
}

export default Square;
