import React from "react";

type ResetButtonProps = {
  onReset: () => void;
  testid?: string;
};

/**
 * ResetButton: allows players to restart the game.
 */
// PUBLIC_INTERFACE
function ResetButton({ onReset, testid }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="reset-btn"
      aria-label="Reset game"
      data-testid={testid}
      style={{
        padding: "0.7em 2.2em",
        fontSize: "1.1em",
        background: "var(--primary)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "1.1em",
        fontWeight: 600,
        letterSpacing: "0.5px",
        boxShadow: "0 1px 5px #e5e7eb",
        transition: "background 0.18s",
      }}
    >
      Reset
    </button>
  );
}

export default ResetButton;
