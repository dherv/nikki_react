import React, { FC } from "react";
import Dot from "./Dot";
import styled from "styled-components";

const DotWithWord: FC<{ typeOrColor: "words" | "grammars"; word: string }> = ({
  typeOrColor,
  word
}) => (
  <>
    <Dot typeOrColor={typeOrColor}></Dot>
    <StyledDotWithWordText>{word}</StyledDotWithWordText>
  </>
);

const StyledDotWithWordText = styled.span`
  margin-left: 1rem;
`;

export default DotWithWord;
