import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalSelect: React.FC<{
  title: string;
  clearModalSettings: () => void;
}> = ({ title, children, clearModalSettings }) => {
  const modalRoot = document.createElement("div");

  useLayoutEffect(() => {
    removeDOMModal();
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
    return () => {
      removeDOMModal();
    };
  });

  const removeDOMModal = () => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  };

  const closeModal = () => {
    clearModalSettings();
    // remove dom element on unmount
    removeDOMModal();
  };

  return ReactDOM.createPortal(
    <div className="modal" onClick={() => closeModal()}>
      <ModalContainer onClick={event => event.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <ModalChildrenContainer>{children}</ModalChildrenContainer>
      </ModalContainer>
    </div>,
    modalRoot
  );
};

const ModalTitle = styled.h5`
  font-size: 1.4rem;
  font-weight: 100;
  text-align: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  width: 650px;
  padding: 3rem;
  max-height: 90vh;
`;

const ModalChildrenContainer = styled.div``;

export default ModalSelect;
