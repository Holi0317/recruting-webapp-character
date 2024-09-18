import React, { useRef } from "react";
import { createCharacterStore } from "./root.ts";
import { CharacterContext } from "./context.ts";

export function CharacterProvider({ children }: React.PropsWithChildren<{}>) {
  const store = useRef(createCharacterStore()).current;

  return (
    <CharacterContext.Provider value={store}>
      {children}
    </CharacterContext.Provider>
  );
}
