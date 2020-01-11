import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom";

const ModalSelect: React.FC<{ clearModalSettings: () => void }> = ({
  children,
  clearModalSettings
}) => {
  const modalRoot = document.createElement("div");

  useLayoutEffect(() => {
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  const closeModal = () => {
    clearModalSettings();
    // remove dom element on unmount
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal" onClick={() => closeModal()}>
      {children}
    </div>,
    modalRoot
  );
};

export default ModalSelect;
