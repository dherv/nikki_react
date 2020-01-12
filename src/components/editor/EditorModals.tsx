import React, { FC } from "react";
import ModalButtonSelect from "../modal/ModalButtonSelect";
import styled from "styled-components";

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

const StyledModalTypeContainer = styled.div`
  margin: 3rem 0;
`;

export const EditorModalTranslation: FC<{
  onClick: () => void;
  goBack: () => void;
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

      <StyledModalTranslationButtonContainer>
        <StyledModalTranslationButton onClick={goBack}>
          back
        </StyledModalTranslationButton>
        <StyledModalTranslationButton onClick={onClick}>
          Skip
        </StyledModalTranslationButton>
      </StyledModalTranslationButtonContainer>
    </StyledModalTranslationContainer>
  </>
);

const StyledModalTranslationSelection = styled.h4`
  margin: 2rem 0;
  font-weight: 600;
`;
const StyledModalTranslationContainer = styled.div`
  width: 90%;
  height: 100%;
`;
const StyledModalTranslationList = styled.ul`
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(196, 196, 196, 0.12);
`;
const StyledModalTranslationListItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #eae5e5;
  }
`;
const StyledModalTranslationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const StyledModalTranslationButton = styled.button`
  background-color: #26A69A
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  padding: .5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer
`;

export const EditorModalForm: FC<{ onClick: () => void; status: string }> = ({
  onClick,
  status
}) => (
  <>
    <h4>{status}</h4>
    <button onClick={() => onClick()}>Finish</button>
  </>
);
