import React, { useContext } from "react";
import { CharacterContext } from "../../store/context.ts";
import { useStore } from "zustand";
import { PlusMinus } from "../PlusMinus.tsx";
import { AttributeType } from "../../consts.ts";

export function AttributeSlice() {
  const store = useContext(CharacterContext);
  if (!store) throw new Error("Missing CharacterContext.Provider in the tree");
  const values = useStore(store, (s) => s.attributeValue);
  const modifiers = useStore(store, (s) => s.attributeModifier);
  const update = useStore(store, (s) => s.updateAttributeValue);

  return (
    <div style={{ gridArea: "attribute" }}>
      <h2>Attributes</h2>
      {Object.entries(values).map(([attr, val]) => (
        <div>
          {attr}: {val} (Modifier: {modifiers[attr]}){" "}
          <PlusMinus
            onPlus={() => update(attr as AttributeType, 1)}
            onMinus={() => update(attr as AttributeType, -1)}
          />
        </div>
      ))}
    </div>
  );
}
