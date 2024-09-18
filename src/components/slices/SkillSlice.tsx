import React, { useContext } from "react";
import { useStore } from "zustand";
import { CharacterContext } from "../../store/context.ts";
import { PlusMinus } from "../PlusMinus.tsx";
import { SKILL_MODIFIER_MAP } from "../../consts.ts";

export function SkillSlice() {
  const store = useContext(CharacterContext);
  if (!store) throw new Error("Missing CharacterContext.Provider in the tree");

  const allowance = useStore(store, (s) => s.skillPointAllowance);
  const remaining = useStore(store, (s) => s.skillPointRemaining);
  const points = useStore(store, (s) => s.skillPoints);
  const attributeModifier = useStore(store, (s) => s.attributeModifier);
  const skillValues = useStore(store, (s) => s.skillValues);
  const updateSkillPoint = useStore(store, (s) => s.updateSkillPoint);

  return (
    <div style={{ gridArea: "skills" }}>
      <h2>Skills</h2>

      <p>Total skill points: {allowance}</p>
      <p>Remaining skill points: {remaining}</p>

      {Object.entries(points).map(([skill, point]) => (
        <div key={skill}>
          {skill}: {point} (Mod: {SKILL_MODIFIER_MAP.get(skill)} @{" "}
          {attributeModifier[SKILL_MODIFIER_MAP.get(skill)!]})
          <PlusMinus
            onPlus={() => updateSkillPoint(skill, 1)}
            onMinus={() => updateSkillPoint(skill, -1)}
          />
          Total: {skillValues[skill]}
        </div>
      ))}
    </div>
  );
}
