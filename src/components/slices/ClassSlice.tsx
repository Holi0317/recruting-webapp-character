import React, { useContext } from "react";
import { useStore } from "zustand";
import { CharacterContext } from "../../store/context.ts";
import { AttributeType, CLASS_LIST } from "../../consts.ts";

function classSatisfied(
  attributeValue: Record<AttributeType, number>,
  requirement: Record<AttributeType, number>,
): boolean {
  return Object.entries(requirement).every(
    ([attr, req]) => attributeValue[attr] >= req,
  );
}

export function ClassSlice() {
  const store = useContext(CharacterContext);
  if (!store) throw new Error("Missing CharacterContext.Provider in the tree");

  const values = useStore(store, (s) => s.attributeValue);

  return (
    <div style={{ gridArea: "class" }}>
      <h2>Class</h2>
      {Object.entries(CLASS_LIST).map(([cls, attrReq]) => (
        <details key={cls}>
          <summary
            style={{
              color: classSatisfied(values, attrReq) ? "#7BA23F" : "#CB1B45",
            }}
          >
            {classSatisfied(values, attrReq) ? "✅" : ""} {cls}
          </summary>

          <ul>
            {Object.entries(attrReq).map(([attr, req]) => (
              <li key={`${cls}-${attr}`}>
                {attr}: {req},{" "}
                <span
                  style={{
                    color: values[attr] >= req ? "#7BA23F" : "#CB1B45",
                  }}
                >
                  Δ = {values[attr] - req}
                </span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
