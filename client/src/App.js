import React from "react";

import Header from "./components/layouts/Header";

import "./styles/reset.css";
import "./styles/style.css";
import Landing from "./components/layouts/Landing";

function App() {
  return (
    <div className="App">
      <Header />
      <Landing />
    </div>
  );
}

export default App;
