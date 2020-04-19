import React, { useState, useEffect, useRef, useContext } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { AsideRight, AsideLeftDefault } from "../components/layout/Asides";
import { ISelection } from "../types/interfaces";
import DotWithWord from "../components/ui/DotWithWord";
import Api from "../api/Api";
import Translate from "../components/translate/Translate";
import FirebaseContext from "../contexts/FirebaseContext";

const Editor: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [selection, setSelection] = useState<string>("");
  const [saved, setSaved] = useState<ISelection[]>([]);
  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState<
    boolean
  >(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const textUntouched = useRef(true);
  const db = useContext(FirebaseContext);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    textUntouched.current = false;
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
        words: saved,
      };
      return Api.post("/dailies", daily).then((response) =>
        console.log({ response })
      );
    } else {
      return setShowValidationErrorMessage(true);
    }
  };

  const addToTextAndSelection = (source: string, target: string) => {
    const toSave: ISelection = {
      text: source,
      translation: target,
    };
    setSaved([...saved, toSave]);
    setText(`${text} ${source}`);
  };

  const addToSelection = (source: string, target: string) => {
    const toSave: ISelection = {
      text: target,
      translation: source,
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

  const callbackAdd = (id: string) => {
    // set current id
    setCurrentItemId(id);
  };

  const callbackUpdate = (document: any) => {
    // update text and current id
    const data = document.data();
    console.log(data);
    setCurrentItemId(document.id);
    setText(data.text);
  };

  const checkDocumentOrCreate = () => {
    // create doc if date does not exist yet
    db.checkDocumentOrCreate(text, callbackAdd, callbackUpdate);
  };

  useEffect(() => {
    return checkDocumentOrCreate();
  }, []);

  useEffect(() => {
    console.log(textUntouched.current);
    if (text.length > 0 && !textUntouched.current) {
      db.updateItem(text, currentItemId);
    }
  }, [text, currentItemId, db]);
  return (
    <Layout>
      <EditorContainer>
        <TextArea
          style={{ height: "100%" }}
          onSelect={(event) =>
            handleSelect(event as React.ChangeEvent<HTMLTextAreaElement>)
          }
          onChange={(event) =>
            handleText(event as React.ChangeEvent<HTMLTextAreaElement>)
          }
          value={text}
          placeholder="type your text here"
        ></TextArea>
        <StyledValidationErrorMessage visible={showValidationErrorMessage}>
          Please enter at least 10 characters
        </StyledValidationErrorMessage>
        {/* <StyledButton onClick={handleSave}>Save</StyledButton> */}
      </EditorContainer>
      <AsideRight title="current selection">{displayAsideRight()}</AsideRight>
    </Layout>
  );
};

const EditorContainer = styled.div`
  min-width: 50%;
  margin-left: 32px;
`;

const StyledValidationErrorMessage = styled.p<{ visible: boolean }>`
  color: #dc3545;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  margin: 2rem 0;
`;
const StyledDotWithWordListItem = styled.li`
  margin: 1rem 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  // min-height: 30vmax;
  padding: 2rem;
  font-family: var(--font-text);
  color: var(--font-color-dark);
  // border-radius: 8px;
  // border: 1px solid rgba(118, 118, 118, 0.2);
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  caret-color: rgba(118, 118, 118, 0.2);
  resize: none;
  outline: none;
  line-height: 1.5;
`;

export default Editor;
