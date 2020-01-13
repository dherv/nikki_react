import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Main, MainTitle } from "../styled/GlobalComponents";
import styled from "styled-components";
import ModalSelect from "../components/modal/ModalSelect";
import {
  EditorModalType,
  EditorModalTranslation,
  EditorModalForm
} from "../components/editor/EditorModals";
import { AsideLeft, AsideRight } from "../components/layout/Asides";
import Dot from "../components/ui/Dot";
import { ISelection } from "../interfaces/interfaces";

const Editor: React.FC = () => {
  const [selection, setSelection] = useState<string | null>("");
  const [status, setModalStatus] = useState<"words" | "grammars" | "">("");
  const [step, setStep] = useState<number | null>(null);
  const [translation, setTranslation] = useState<string>("");
  const [saved, setSaved] = useState<ISelection[]>([]);

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

  const handleTranslation = (translation: string) => {
    setTranslation(translation);
    setStep(3);
  };

  const clearModalSettings = () => {
    setSelection(null);
    setTranslation("");
    setStep(null);
  };

  const saveSelection = (toSave: {
    name: string;
    translation: string;
    sentence: string;
    explanation?: string;
    type: string;
  }) => {
    // take selection and translation and inputs
    const addToSaved = {
      ...toSave,
      status
    };

    let savedCopy = [...saved].map(a => ({ ...a }));
    const newSavedArray = [...savedCopy, addToSaved];

    setSaved(newSavedArray);
    setTranslation("");

    clearModalSettings();
  };

  const displayModal = () => {
    // if there is a word selected open the modal
    if (selection) {
      let child = null;
      let title = "";
      switch (step) {
        case 1:
          child = <EditorModalType onClick={handleClick} />;
          title = "Choose the selection type";
          break;
        case 2:
          child = (
            <EditorModalTranslation
              selection={selection}
              goBack={setStep}
              onClick={handleTranslation}
            />
          );
          title = "Select the translation";
          break;
        case 3:
          child = (
            <EditorModalForm
              status={status}
              passedTranslation={translation}
              passedSelection={selection}
              onClick={saveSelection}
              goBack={setStep}
            />
          );
          title = "Edit the form";
          break;
      }
      return (
        <ModalSelect title={title} clearModalSettings={clearModalSettings}>
          {child}
        </ModalSelect>
      );
    } else {
      return null;
    }
  };

  const displayAsideRight = () => {
    return saved.map(s => (
      <AsideRightListItem>
        <Dot typeOrColor={s.type}></Dot>
        <AsideRightListItemText>{s.name}</AsideRightListItemText>
      </AsideRightListItem>
    ));
  };

  return (
    <Layout>
      <AsideLeft title="tips">left</AsideLeft>
      <Main>
        <MainTitle>Editor</MainTitle>
        <TextArea
          onSelect={event =>
            handleSelect(event as React.ChangeEvent<HTMLTextAreaElement>)
          }
        ></TextArea>
      </Main>
      <AsideRight title="current selection">
        <ul>{displayAsideRight()}</ul>
      </AsideRight>
      {displayModal()}
    </Layout>
  );
};

const AsideRightListItem = styled.li`
  margin: 1rem 0;
`;
const AsideRightListItemText = styled.span`
  margin-left: 1rem;
`;
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
