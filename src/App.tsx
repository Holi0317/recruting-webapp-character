import React from "react";
import "./App.css";
import { CharacterProvider } from "./store/provider.tsx";
import { CharacterSheet } from "./components/CharacterSheet.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

      <section className="App-section">
        <CharacterProvider>
          <CharacterSheet />
        </CharacterProvider>
      </section>
    </div>
  );
}

export default App;
