import { create } from "zustand";
import { createComputed } from "zustand-computed";
import { AttributeType } from "../consts";

interface CharacterState {
  attributeModifier: Record<AttributeType, number>;
  updateAttributeModifier: (attr: AttributeType, diff: 1 | -1) => void;
}

interface CharacterComputed {
  attributeStrength: Record<AttributeType, number>;
}

const computed = createComputed(
  (state: CharacterState): CharacterComputed => ({
    attributeStrength: Object.fromEntries(
      // FIXME: The algo is wrong
      Object.entries(state.attributeModifier).map(([attr, mod]) => [
        attr,
        mod + 10,
      ]),
    ) as Record<AttributeType, number>,
  }),
);

export function createCharacterStore() {
  return create<CharacterState>()(
    computed((set) => ({
      attributeModifier: {
        Strength: 0,
        Dexterity: 0,
        Constitution: 0,
        Intelligence: 0,
        Wisdom: 0,
        Charisma: 0,
      },

      updateAttributeModifier: (attr, diff) =>
        set((state) => ({
          attributeModifier: {
            ...state.attributeModifier,
            [attr]: state.attributeModifier[attr] + diff,
          },
        })),
    })),
  );
}

export type CharacterStore = ReturnType<typeof createCharacterStore>;
