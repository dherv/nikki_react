import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Aside, Main, MainTitle } from "../styled/GlobalComponents";
import styled from "styled-components";
import ModalSelect from "../components/modal/ModalSelect";

const Editor: React.FC = () => {
  const [selection, setSelection] = useState<string | null>("");
  const [status, setModalStatus] = useState<"words" | "grammars" | "">("");
  const [step, setStep] = useState<number | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // selectionStart and selectionEnd are available on textarea
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
    const selection = event.target.value.slice(
      event.target.selectionStart,
      event.target.selectionEnd
    );
    setSelection(selection);
    setStep(1);
  };

  const handleClick = (status: "words" | "grammars") => {
    // set status as words
    setModalStatus(status);
    // open the translation modal
    setStep(2);
  };

  const clearModalSettings = () => {
    setSelection(null);
    setStep(null);
  };

  const displayModal = () => {
    // if there is a word selected open the modal
    if (selection) {
      let child = null;
      switch (step) {
        case 1:
          child = (
            <>
              {selection}
              <button onClick={() => handleClick("words")}>Words</button>
              <button onClick={() => handleClick("grammars")}>Grammars</button>
            </>
          );
          break;
        case 2:
          child = (
            <>
              Translation {selection} {status}
              <button onClick={() => setStep(3)}>Last</button>
            </>
          );
          break;
        case 3:
          child = (
            <>
              Finish {selection}
              <button onClick={() => clearModalSettings()}>Finish</button>
            </>
          );
          break;
      }
      return (
        <ModalSelect clearModalSettings={clearModalSettings}>
          <div
            onClick={event => event.stopPropagation()}
            style={{ backgroundColor: "#fff", width: 400, height: 400 }}
          >
            {child}
          </div>
        </ModalSelect>
      );
    } else {
      return null;
    }
  };

  return (
    <Layout>
      <Aside>left</Aside>
      <Main>
        <MainTitle>Editor</MainTitle>
        <TextArea
          onSelect={event =>
            handleSelect(event as React.ChangeEvent<HTMLTextAreaElement>)
          }
        ></TextArea>
      </Main>
      <Aside>right</Aside>
      {displayModal()}
    </Layout>
  );
};

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
