import React, { FC } from "react";
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
  onClick: () => void;
  goBack: (stepNumber: number) => void;
  selection: string;
}> = ({ onClick, goBack, selection }) => (
  <>
    <StyledModalTranslationSelection>
      {selection}
    </StyledModalTranslationSelection>
    <StyledModalTranslationContainer>
      <StyledModalTranslationList>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
        <StyledModalTranslationListItem>test</StyledModalTranslationListItem>
      </StyledModalTranslationList>
      <StyledModalButtonContainer>
        <StyledModalButton onClick={() => goBack(1)}>back</StyledModalButton>
        <StyledModalButton onClick={onClick}>Skip</StyledModalButton>
      </StyledModalButtonContainer>
    </StyledModalTranslationContainer>
  </>
);

export const EditorModalForm: FC<{
  onClick: () => void;
  goBack: (stepNumber: number) => void;
  status: string;
}> = ({ onClick, status, goBack }) => {
  let child = null;
  switch (status) {
    case "grammars":
      child = (
        <StyledModalForm>
          <StyledFormInput
            id="selection"
            type="text"
            placeholder="Word"
          ></StyledFormInput>
          <StyledFormInput
            id="translation"
            type="text"
            placeholder="Translation"
          ></StyledFormInput>
          <StyledFormInput
            id="sentence"
            type="text"
            placeholder="Example Sentence"
          ></StyledFormInput>
          <StyledFormInput
            as="textarea"
            id="explanation"
            placeholder="Explanation"
            rows={3}
          ></StyledFormInput>
        </StyledModalForm>
      );
      break;
    default:
      child = (
        <StyledModalForm>
          <StyledFormInput
            id="selection"
            type="text"
            placeholder="Word"
          ></StyledFormInput>
          <StyledFormInput
            id="translation"
            type="text"
            placeholder="Translation"
          ></StyledFormInput>
          <StyledFormInput
            id="sentence"
            type="text"
            placeholder="Example Sentence"
          ></StyledFormInput>
        </StyledModalForm>
      );
      break;
  }
  return (
    <>
      <StyledModalFormTitleContainer>
        <Dot fill={status === "grammars" ? "#F0D64D" : "#8558B1"}></Dot>
        <StyledModalFormTitle>{status}</StyledModalFormTitle>
      </StyledModalFormTitleContainer>
      {child}
      <StyledModalButtonContainer>
        <StyledModalButton onClick={() => goBack(2)}>back</StyledModalButton>
        <StyledModalButton onClick={onClick}>Save</StyledModalButton>
      </StyledModalButtonContainer>
    </>
  );
};
