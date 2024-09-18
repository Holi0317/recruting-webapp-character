import { createContext } from "react";
import type { CharacterStore } from "./root.ts";

export const CharacterContext = createContext<CharacterStore | null>(null);
