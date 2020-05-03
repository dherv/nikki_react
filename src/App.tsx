import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Normalize } from "styled-normalize";
import { GlobalStyle } from "./styled/GlobalStyle";
import Editor from "./pages/Editor";
import Dailies from "./pages/Dailies";
import Words from "./pages/Words";
import Fallback from "./pages/Fallback";
import Auth from "./pages/Auth";
import PrivateRoute from "./router/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Normalize />
      <GlobalStyle />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/login">
          <Auth />
        </Route>
        <Route exact path="/">
          <Redirect to="/editor" />
        </Route>
        <PrivateRoute exact path="/dailies" component={Dailies} />
        <PrivateRoute exact path="/editor" component={Editor} />
        <PrivateRoute exact path="/words" component={Words} />
        <PrivateRoute exact path="/fallback" component={Fallback} />
      </Switch>
    </Router>
  );
};

export default App;
