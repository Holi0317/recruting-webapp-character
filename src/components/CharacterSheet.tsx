import React from "react";
import { AttributeSlice } from "./slices/AttributeSlice.tsx";
import { ClassSlice } from "./slices/ClassSlice.tsx";
import { SkillSlice } from "./slices/SkillSlice.tsx";

export function CharacterSheet() {
  return (
    <section className="character-container">
      <AttributeSlice />
      <ClassSlice />
      <SkillSlice />
    </section>
  );
}
