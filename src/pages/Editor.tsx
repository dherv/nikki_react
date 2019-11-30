import React from "react";
import Layout from "../components/layout/Layout";
import { Aside, Main, MainTitle } from "../styled/GlobalComponents";
import styled from "styled-components";

const Editor: React.FC = () => (
  <Layout>
    <Aside>left</Aside>
    <Main>
      <MainTitle>Editor</MainTitle>
      <TextArea></TextArea>
    </Main>
    <Aside>right</Aside>
  </Layout>
);

const TextArea = styled.textarea`
  width: 100%;
  min-height: 30vmax;
  padding: 2rem;
  font-family: var(--font-work);
  color: var(--font-color-dark);
  border-radius: 8px;
  border: 1px solid rgba(118, 118, 118, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  caret-color: rgba(118, 118, 118, 0.2);
  resize: none;
  outline: none;
`;

export default Editor;
