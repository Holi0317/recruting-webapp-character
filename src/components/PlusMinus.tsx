import React from "react";

interface PlusMinusProps {
  onPlus: () => void;
  onMinus: () => void;
}

export function PlusMinus(props: PlusMinusProps) {
  return (
    <>
      <button onClick={() => props.onPlus()}>+</button>
      <button onClick={() => props.onMinus()}>-</button>
    </>
  );
}
