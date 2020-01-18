import React, { FC } from "react";
import Dot from "./Dot";
import styled from "styled-components";

const DotWithWord: FC<{ typeOrColor: "words" | "grammars"; word: string }> = ({
  typeOrColor,
  word
}) => (
  <>
    <Dot typeOrColor={typeOrColor}></Dot>
    <StyledText>{word}</StyledText>
  </>
);

const StyledText = styled.span`
  margin-left: 1rem;
`;

export default DotWithWord;
