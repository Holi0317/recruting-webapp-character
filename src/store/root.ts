import { create } from "zustand";
import { createComputed } from "zustand-computed";
import { AttributeType, SKILL_LIST, SKILL_MODIFIER_MAP } from "../consts.ts";

interface CharacterState {
  attributeValue: Record<AttributeType, number>;
  updateAttributeValue: (attr: AttributeType, diff: 1 | -1) => void;

  skillPoints: Record<string, number>;
  updateSkillPoint: (skill: string, diff: 1 | -1) => void;
}

interface CharacterComputed {
  attributeModifier: Record<AttributeType, number>;

  skillPointAllowance: number;
  skillPointsConsumed: number;
  skillPointRemaining: number;
  skillValues: Record<string, number>;
}

const computed = createComputed((state: CharacterState): CharacterComputed => {
  const attributeModifier = Object.fromEntries(
    Object.entries(state.attributeValue).map(([attr, val]) => [
      attr,
      Math.floor((val - 10) / 2),
    ]),
  ) as Record<AttributeType, number>;

  const skillPointAllowance = Math.max(
    0,
    10 + 4 * attributeModifier.Intelligence,
  );

  let skillPointsConsumed = 0;
  for (const point of Object.values(state.skillPoints)) {
    skillPointsConsumed += point;
  }

  return {
    attributeModifier,

    skillPointAllowance,
    skillPointsConsumed,
    skillPointRemaining: skillPointAllowance - skillPointsConsumed,
    skillValues: Object.fromEntries(
      Object.entries(state.skillPoints).map(([skill, point]) => [
        skill,
        point + attributeModifier[SKILL_MODIFIER_MAP.get(skill)!],
      ]),
    ),
  };
});

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

      skillPoints: Object.fromEntries(SKILL_LIST.map(({ name }) => [name, 0])),
      updateSkillPoint: (skill, diff) =>
        set((state) => ({
          skillPoints: {
            ...state.skillPoints,
            [skill]: state.skillPoints[skill] + diff,
          },
        })),
    })),
  );
}

export type CharacterStore = ReturnType<typeof createCharacterStore>;
