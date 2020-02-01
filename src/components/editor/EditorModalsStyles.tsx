import styled from "styled-components";

// Modals
export const StyledModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// Modal Type
export const StyledModalTypeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
`;

// Modal Translation
export const StyledModalTranslationContainer = styled.div`
  height: 100%;
`;
export const StyledModalTranslationList = styled.ul`
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(196, 196, 196, 0.12);
`;
export const StyledModalTranslationListItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #eae5e5;
  }
`;
export const StyledModalTranslationSelection = styled.h4`
  margin: 2rem 0 1rem 0;
  font-weight: 600;
`;

// Modal Form
export const StyledFormInput = styled.input`
  margin: 1rem 0;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 1px solid #cecece;
  outline: none;
`;
export const StyledModalFormTitleContainer = styled.div`
  margin: 2rem 0;
`;
export const StyledModalFormTitle = styled.h4`
  display: inline;
  margin-left: 8px;
  text-transform: capitalize;
  font-weight: 600;
`;
export const StyledModalForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;
