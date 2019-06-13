import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/layouts/Header";
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./styles/reset.css";
import "./styles/style.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <div className="main">
            <Route path="/register" component={Register} />

            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
