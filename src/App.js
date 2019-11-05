import React from "react";
import "./App.css";
import Battle from "./Battle";

class User {
  hp;
  constructor() {}
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Battle />
      </header>
    </div>
  );
}

export default App;
