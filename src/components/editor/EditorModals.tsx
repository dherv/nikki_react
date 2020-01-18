import React, { FC, useState, ChangeEvent } from "react";
import ModalButtonSelect from "../modal/ModalButtonSelect";
import Dot from "../ui/Dot";
import {
  StyledModalTypeContainer,
  StyledModalTranslationSelection,
  StyledModalTranslationContainer,
  StyledModalTranslationList,
  StyledModalTranslationListItem,
  StyledModalButtonContainer,
  StyledModalButton,
  StyledModalForm,
  StyledFormInput,
  StyledModalFormTitleContainer,
  StyledModalFormTitle
} from "./EditorModalsStyles";
import { ISelection } from "../../types/interfaces";

export const EditorModalType: FC<{
  onClick: (status: "words" | "grammars") => void;
}> = ({ onClick }) => (
  <StyledModalTypeContainer>
    <ModalButtonSelect color="#8558B1" onClick={() => onClick("words")}>
      Words
    </ModalButtonSelect>
    <ModalButtonSelect color="#F0D64D" onClick={() => onClick("grammars")}>
      Grammars
    </ModalButtonSelect>
  </StyledModalTypeContainer>
);

export const EditorModalTranslation: FC<{
  onClick: (translation: string) => void;
  goBack: (stepNumber: number) => void;
  selection: string;
}> = ({ onClick, goBack, selection }) => (
  <>
    <StyledModalTranslationSelection>
      {selection}
    </StyledModalTranslationSelection>
    <StyledModalTranslationContainer>
      <StyledModalTranslationList>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
        <StyledModalTranslationListItem onClick={() => onClick("test")}>
          test
        </StyledModalTranslationListItem>
      </StyledModalTranslationList>
      <StyledModalButtonContainer>
        <StyledModalButton onClick={() => goBack(1)}>back</StyledModalButton>
        <StyledModalButton onClick={() => onClick("")}>Skip</StyledModalButton>
      </StyledModalButtonContainer>
    </StyledModalTranslationContainer>
  </>
);

export const EditorModalForm: FC<{
  onClick: ({
    name,
    translation,
    sentence,
    explanation,
    type
  }: ISelection) => void;
  goBack: (stepNumber: number) => void;
  status: "words" | "grammars";
  passedTranslation: string;
  passedSelection: string;
}> = ({ onClick, status, passedSelection, passedTranslation, goBack }) => {
  const [name, setName] = useState<string>(passedSelection);
  const [translation, setTranslation] = useState<string>(passedTranslation);
  const [sentence, setSentence] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");

  let child = null;

  switch (status) {
    case "grammars":
      child = (
        <StyledModalForm>
          <StyledFormInput
            id="name"
            name="name"
            type="text"
            placeholder="Word"
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></StyledFormInput>
          <StyledFormInput
            id="translation"
            name="translation"
            type="text"
            placeholder="Translation"
            value={translation}
            onChange={({ target }) => setTranslation(target.value)}
          ></StyledFormInput>
          <StyledFormInput
            id="sentence"
            name="sentence"
            type="text"
            placeholder="Example Sentence"
            onChange={({ target }) => setSentence(target.value)}
          ></StyledFormInput>
          <StyledFormInput
            as="textarea"
            id="explanation"
            name="explanation"
            placeholder="Explanation"
            rows={3}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setExplanation(event.target.value)
            }
          ></StyledFormInput>
        </StyledModalForm>
      );
      break;
    default:
      child = (
        <StyledModalForm>
          <StyledFormInput
            id="name"
            name="name"
            type="text"
            placeholder="Word"
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></StyledFormInput>
          <StyledFormInput
            id="translation"
            name="translation"
            type="text"
            placeholder="Translation"
            value={translation}
            onChange={({ target }) => setTranslation(target.value)}
          ></StyledFormInput>
          <StyledFormInput
            id="sentence"
            name="sentence"
            type="text"
            placeholder="Example Sentence"
            onChange={({ target }) => setSentence(target.value)}
          ></StyledFormInput>
        </StyledModalForm>
      );
      break;
  }
  return (
    <>
      <StyledModalFormTitleContainer>
        <Dot typeOrColor={status}></Dot>
        <StyledModalFormTitle>{status}</StyledModalFormTitle>
      </StyledModalFormTitleContainer>
      {child}
      <StyledModalButtonContainer>
        <StyledModalButton onClick={() => goBack(2)}>back</StyledModalButton>
        <StyledModalButton
          onClick={() =>
            onClick({ name, translation, sentence, explanation, type: status })
          }
        >
          Save
        </StyledModalButton>
      </StyledModalButtonContainer>
    </>
  );
};
