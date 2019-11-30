import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Normalize } from "styled-normalize";
import { GlobalStyle } from "./GlobalStyle";
import Editor from "./pages/Editor";
import Dailies from "./pages/Dailies";
import Words from "./pages/Words";
import Grammars from "./pages/Grammars";

const App: React.FC = () => {
  return (
    <Router>
      <Normalize />
      <GlobalStyle />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Dailies />
        </Route>
        <Route exact path="/editor">
          <Editor />
        </Route>
        <Route exact path="/words">
          <Words />
        </Route>
        <Route exact path="/grammars">
          <Grammars />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
