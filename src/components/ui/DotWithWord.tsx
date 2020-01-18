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
// export to use it if needed in different modules
export const StyledDotWithWordListItem = styled.li`
  margin: 1rem 0;
`;

export default DotWithWord;
