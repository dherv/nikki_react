import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Main, MainTitle, StyledButton } from "../styled/GlobalComponents";
import styled from "styled-components";
import {
  AsideLeft,
  AsideRight,
  AsideLeftDefault
} from "../components/layout/Asides";
import { ISelection } from "../types/interfaces";
import DotWithWord from "../components/ui/DotWithWord";
import Api from "../api/Api";
import Translate from "../components/translate/Translate";

const Editor: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [selection, setSelection] = useState<string>("");
  const [saved, setSaved] = useState<ISelection[]>([]);
  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState<
    boolean
  >(false);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    if (showValidationErrorMessage && event.target.value.length >= 10) {
      setShowValidationErrorMessage(false);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // selectionStart and selectionEnd are available on textarea
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
    const selection = event.target.value.slice(
      event.target.selectionStart,
      event.target.selectionEnd
    );
    setSelection(selection);
  };

  const handleSave = () => {
    if (text.length > 10) {
      const daily = {
        text,
        words: saved
      };
      return Api.post("/dailies", daily).then(response =>
        console.log({ response })
      );
    } else {
      return setShowValidationErrorMessage(true);
    }
  };

  const addToTextAndSelection = (source: string, target: string) => {
    const toSave: ISelection = {
      text: source,
      translation: target
    };
    setSaved([...saved, toSave]);
    setText(`${text} ${source}`);
  };

  const addToSelection = (source: string, target: string) => {
    const toSave: ISelection = {
      text: source,
      translation: target
    };
    setSaved([...saved, toSave]);
  };

  const displayAsideRight = () => {
    return (
      <div>
        <ul>
          {saved.map((s, i) => (
            <StyledDotWithWordListItem key={`${i}_${s.text}`}>
              <DotWithWord
                typeOrColor="words"
                word={s.text}
                translation={s.translation}
              ></DotWithWord>
            </StyledDotWithWordListItem>
          ))}
        </ul>
      </div>
    );
  };

  const displayAsideLeft = () => (
    <AsideLeftDefault>
      <Translate
        addToTextAndSelection={(source, target) =>
          addToTextAndSelection(source, target)
        }
        addToSelection={(source, target) => addToSelection(source, target)}
        selection={selection}
      ></Translate>
    </AsideLeftDefault>
  );

  return (
    <Layout>
      <AsideLeft title="translate">{displayAsideLeft()}</AsideLeft>
      <Main>
        <MainTitle>Editor</MainTitle>
        <TextArea
          onSelect={event =>
            handleSelect(event as React.ChangeEvent<HTMLTextAreaElement>)
          }
          onChange={event =>
            handleText(event as React.ChangeEvent<HTMLTextAreaElement>)
          }
          value={text}
        ></TextArea>

        <StyledValidationErrorMessage visible={showValidationErrorMessage}>
          Please enter at least 10 characters
        </StyledValidationErrorMessage>

        <StyledButton onClick={handleSave}>Save</StyledButton>
      </Main>
      <AsideRight title="current selection">{displayAsideRight()}</AsideRight>
    </Layout>
  );
};

const StyledValidationErrorMessage = styled.p<{ visible: boolean }>`
  color: #dc3545;
  opacity: ${props => (props.visible ? 1 : 0)};
  margin: 2rem 0;
`;
const StyledDotWithWordListItem = styled.li`
  margin: 1rem 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 30vmax;
  padding: 2rem;
  font-family: var(--font-text);
  color: var(--font-color-dark);
  border-radius: 8px;
  border: 1px solid rgba(118, 118, 118, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  caret-color: rgba(118, 118, 118, 0.2);
  resize: none;
  outline: none;
  line-height: 1.5;
`;

export default Editor;
