import { create } from "zustand";
import { createComputed } from "zustand-computed";
import { AttributeType } from "../consts";

interface CharacterState {
  attributeValue: Record<AttributeType, number>;
  updateAttributeValue: (attr: AttributeType, diff: 1 | -1) => void;
}

interface CharacterComputed {
  attributeModifier: Record<AttributeType, number>;
}

const computed = createComputed(
  (state: CharacterState): CharacterComputed => ({
    attributeModifier: Object.fromEntries(
      Object.entries(state.attributeValue).map(([attr, val]) => [
        attr,
        Math.floor((val - 10) / 2),
      ]),
    ) as Record<AttributeType, number>,
  }),
);

export function createCharacterStore() {
  return create<CharacterState>()(
    computed((set) => ({
      attributeValue: {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      },

      updateAttributeValue: (attr, diff) =>
        set((state) => ({
          attributeValue: {
            ...state.attributeValue,
            [attr]: state.attributeValue[attr] + diff,
          },
        })),
    })),
  );
}

export type CharacterStore = ReturnType<typeof createCharacterStore>;
