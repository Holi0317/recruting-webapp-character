import React from "react";
import { AttributeSlice } from "./slices/AttributeSlice.tsx";
import { ClassSlice } from "./slices/ClassSlice.tsx";

export function CharacterSheet() {
  return (
    <section className="character-container">
      <AttributeSlice />
      <ClassSlice />
    </section>
  );
}
