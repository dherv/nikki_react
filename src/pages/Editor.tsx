import React, { useState, useEffect, useRef, useContext } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { ISelection } from "../types/interfaces";
import FirebaseContext from "../contexts/FirebaseContext";
import Translater from "../components/translater/Translater";
import FirebaseService from "../firebase/firebase.module";
import SelectionList from "../components/selection/SelectionList";
import { Hidden, Dialog, IconButton } from "@material-ui/core";
import TranslateOutlinedIcon from "@material-ui/icons/TranslateOutlined";

const Editor: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [selection, setSelection] = useState<string>("");
  const [saved, setSaved] = useState<ISelection[]>([]);
  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState<
    boolean
  >(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const textUntouched = useRef(true);
  const db = useContext(FirebaseContext) as FirebaseService;

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

  const handleAddToTextAndSelection = (
    sourceText: string,
    targetText: string
  ) => {
    handleAddToSelectionOnly(sourceText, targetText);
    handleAddToTextOnly(targetText);
  };

  const handleAddToSelectionOnly = (sourceText: string, targetText: string) => {
    const toSave: ISelection = {
      text: sourceText,
      translation: targetText,
      dailyId: `dailies/${currentItemId}`,
    };
    console.log({ toSave });

    // add to firebase with correct id
    db.addItem("words", toSave);
    // setSaved([...saved, toSave]);
  };

  const handleAddToTextOnly = (targetText: string) => {
    setText(`${text} ${targetText}`);
  };

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
    db.checkDocumentOrCreate("dailies", text, callbackAdd, callbackUpdate);
  };

  useEffect(() => {
    return checkDocumentOrCreate();
  }, []);

  useEffect(() => {
    if (text.length > 0 && !textUntouched.current) {
      db.updateItem("dailies", text, currentItemId);
    }
  }, [text, currentItemId, db]);

  const mainComponent = (
    <EditorContainer>
      <TextAreaContainer>
        <TextArea
          onSelect={(event) =>
            handleSelect(event as React.ChangeEvent<HTMLTextAreaElement>)
          }
          onChange={(event) =>
            handleText(event as React.ChangeEvent<HTMLTextAreaElement>)
          }
          value={text}
          placeholder="type your text here"
        ></TextArea>

        <Hidden smUp implementation="js">
          <IconButton
            style={{
              marginLeft: "auto",
              position: "absolute",
              right: 16,
              bottom: 16,
            }}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <TranslateOutlinedIcon></TranslateOutlinedIcon>
          </IconButton>
        </Hidden>
      </TextAreaContainer>
      <Hidden xsDown implementation="js">
        <Translater
          addToTextAndSelection={handleAddToTextAndSelection}
          addToSelectionOnly={handleAddToSelectionOnly}
          addToTextOnly={handleAddToTextOnly}
          selection={selection}
        ></Translater>
      </Hidden>
      <Hidden smUp implementation="js">
        <Dialog
          onBackdropClick={() => setOpenDialog(false)}
          aria-labelledby="simple-dialog-title"
          open={openDialog}
          maxWidth="xl"
          fullWidth={true}
          keepMounted
        >
          <Translater
            addToTextAndSelection={handleAddToTextAndSelection}
            addToSelectionOnly={handleAddToSelectionOnly}
            addToTextOnly={handleAddToTextOnly}
            selection={selection}
          ></Translater>
        </Dialog>
      </Hidden>
    </EditorContainer>
  );

  return (
    <Layout
      render={(listOpen: any, closeList: any) => (
        <SelectionList
          id={currentItemId}
          open={listOpen}
          closeList={closeList}
        ></SelectionList>
      )}
    >
      {mainComponent}
    </Layout>
  );
};

const EditorContainer = styled.div`
  width: 100%;
  height: 100%
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 50%;
  @media (min-width: 960px) {
    margin-right: 250px;
  }
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
`;
const TextArea = styled.textarea`
  padding: 0.5rem;
  width: 100%;
  font-family: var(--font-text);
  color: var(--font-color-dark);
  border: none;
  caret-color: rgba(118, 118, 118, 0.2);
  resize: none;
  outline: none;
  line-height: 1.5;

  @media (min-width: 500px) {
    min-height: 100%;
    padding: 1rem;
  }
`;

export default Editor;
