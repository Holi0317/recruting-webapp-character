import React, { useContext } from "react";
import { CharacterContext } from "../../store/context.ts";
import { useStore } from "zustand";
import { PlusMinus } from "../PlusMinus.tsx";
import { AttributeType } from "../../consts.ts";

export function AttributeSlice() {
  const store = useContext(CharacterContext);
  if (!store) throw new Error("Missing CharacterContext.Provider in the tree");
  const modifiers = useStore(store, (s) => s.attributeModifier);
  const strength = useStore(store, (s) => s.attributeStrength);
  const update = useStore(store, (s) => s.updateAttributeModifier);

  return (
    <div>
      <h2>Attributes</h2>
      {Object.entries(modifiers).map(([attr, mod]) => (
        <div>
          {attr}: {strength[attr]} (Modifier: {mod}){" "}
          <PlusMinus
            onPlus={() => update(attr as AttributeType, 1)}
            onMinus={() => update(attr as AttributeType, -1)}
          />
        </div>
      ))}
    </div>
  );
}
