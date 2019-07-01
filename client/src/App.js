import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./utils/PrivateRoute";

import Header from "./components/layouts/Header";
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// import ForumMain from "./components/forum/ForumMain";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import CreatePost from "./components/posts/CreatePost";
import CreateComment from "./components/posts/CreateComment";
import CurrentProfile from "./components/profile/CurrentProfile";
// import Motors from "./components/forum/Motors";
// import Pumps from "./components/forum/Pumps";
// import AnotherStuff from "./components/forum/AnotherStuff";

import "./styles/reset.css";
import "./styles/style.css";
import "./styles/media-query.css";

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <div className="main">
            {/* <Route exact path="/forum" component={ForumMain} /> */}
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route
                exact
                path="/profile/:user_id"
                component={CurrentProfile}
              />
            </Switch>
            <Switch>
              <Route exact path="/post" component={CreatePost} />
              <Route exact path="/post/all" component={Posts} />
              <Route exact path="/post/:post_id" component={CreateComment} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
