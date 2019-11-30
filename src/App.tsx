import React from "react";
import "./App.css";
import { Normalize } from "styled-normalize";
import { GlobalStyle } from "./GlobalStyle";
import Editor from "./pages/Editor";

const App: React.FC = () => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Editor />
    </>
  );
};

export default App;
