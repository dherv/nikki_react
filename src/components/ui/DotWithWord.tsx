import React, { FC } from "react";
import Dot from "./Dot";
import styled from "styled-components";

const DotWithWord: FC<{
  typeOrColor: "words" | "grammars";
  word: string;
  translation: string;
}> = ({ typeOrColor, word, translation }) => (
  <>
    <Dot typeOrColor={typeOrColor}></Dot>
    <StyledText>{word}</StyledText>
    <StyledAdditionalText>{translation}</StyledAdditionalText>
  </>
);

const StyledText = styled.span`
  margin-left: 1rem;
`;

const StyledAdditionalText = styled.span`
  display: inline-block;
  margin-left: 2rem;
  font-family: var(--font-text);
  font-weight: 300;
  color: var(--font-color-main);
`;

export default DotWithWord;
