import { create } from "zustand";
import { SKILL_LIST } from "../consts";
import { CharacterState, computed } from "./root";


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

            updateAttributeValue: (attr, diff) => set((state) => ({
                attributeValue: {
                    ...state.attributeValue,
                    [attr]: state.attributeValue[attr] + diff,
                },
            })),

            skillPoints: Object.fromEntries(SKILL_LIST.map(({ name }) => [name, 0])),
            updateSkillPoint: (skill, diff) => {
                return set((state) => ({
                    skillPoints: {
                        ...state.skillPoints,
                        [skill]: state.skillPoints[skill] + diff,
                    },
                }));
            },
        }))
    );
}

