import type { List } from "ts-toolbelt";

export const ATTRIBUTE_LIST = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
] as const;

export type AttributeType = List.UnionOf<typeof ATTRIBUTE_LIST>;

export const CLASS_LIST: Record<string, Record<AttributeType, number>> = {
  Barbarian: {
    Strength: 14,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 9,
    Wisdom: 9,
    Charisma: 9,
  },
  Wizard: {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 14,
    Wisdom: 9,
    Charisma: 9,
  },
  Bard: {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 9,
    Wisdom: 9,
    Charisma: 14,
  },
};

export interface SkillDefinition {
  name: string;
  attributeModifier: AttributeType;
}

export const SKILL_LIST: SkillDefinition[] = [
  { name: "Acrobatics", attributeModifier: "Dexterity" },
  { name: "Animal Handling", attributeModifier: "Wisdom" },
  { name: "Arcana", attributeModifier: "Intelligence" },
  { name: "Athletics", attributeModifier: "Strength" },
  { name: "Deception", attributeModifier: "Charisma" },
  { name: "History", attributeModifier: "Intelligence" },
  { name: "Insight", attributeModifier: "Wisdom" },
  { name: "Intimidation", attributeModifier: "Charisma" },
  { name: "Investigation", attributeModifier: "Intelligence" },
  { name: "Medicine", attributeModifier: "Wisdom" },
  { name: "Nature", attributeModifier: "Intelligence" },
  { name: "Perception", attributeModifier: "Wisdom" },
  { name: "Performance", attributeModifier: "Charisma" },
  { name: "Persuasion", attributeModifier: "Charisma" },
  { name: "Religion", attributeModifier: "Intelligence" },
  { name: "Sleight of Hand", attributeModifier: "Dexterity" },
  { name: "Stealth", attributeModifier: "Dexterity" },
  { name: "Survival", attributeModifier: "Wisdom" },
];

export const SKILL_MODIFIER_MAP = new Map(
  SKILL_LIST.map((skill) => [skill.name, skill.attributeModifier]),
);
