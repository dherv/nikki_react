import React, { FC } from "react";
import ModalButtonSelect from "../modal/ModalButtonSelect";

export const EditorModalType: FC<{
  onClick: (status: "words" | "grammars") => void;
}> = ({ onClick }) => (
  <div>
    <ModalButtonSelect color="#8558B1" onClick={() => onClick("words")}>
      Words
    </ModalButtonSelect>
    <ModalButtonSelect color="#F0D64D" onClick={() => onClick("grammars")}>
      Grammars
    </ModalButtonSelect>
  </div>
);

export const EditorModalTranslation: FC<{
  onClick: () => void;
  selection: string;
}> = ({ onClick, selection }) => (
  <>
    <h4> {selection}</h4>
    <button onClick={onClick}>Last</button>
  </>
);

export const EditorModalForm: FC<{ onClick: () => void; status: string }> = ({
  onClick,
  status
}) => (
  <>
    <h4>{status}</h4>
    <button onClick={() => onClick()}>Finish</button>
  </>
);
