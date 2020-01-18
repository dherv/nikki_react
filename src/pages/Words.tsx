import React from "react";
import Layout from "../components/layout/Layout";
import { AsideLeft, AsideRight } from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import DotWithWord, {
  StyledDotWithWordListItem
} from "../components/ui/DotWithWord";
import styled from "styled-components";

interface IWord {
  name: string;
  translation: string;
  type: "words" | "grammars";
}
const Words = () => {
  const sampleWords: ReadonlyArray<IWord> = [
    { name: "word1", translation: "word1", type: "grammars" },
    { name: "word2", translation: "word2", type: "words" }
  ];
  const displayAsideLeft = () => <div></div>;
  const displayAsideRight = () => <div></div>;
  return (
    <Layout>
      <AsideLeft title="tips">{displayAsideLeft()}</AsideLeft>
      <Main>
        <MainTitle>Words</MainTitle>
        <ul>
          {sampleWords.map((w, i) => (
            <StyledDotWithWordListItem key={`${i}_${w.name}`}>
              <DotWithWord typeOrColor={w.type} word={w.name}></DotWithWord>
              <StyledWordAdditional>{w.translation}</StyledWordAdditional>
            </StyledDotWithWordListItem>
          ))}
        </ul>
      </Main>
      <AsideRight title="current selection">{displayAsideRight()}</AsideRight>
    </Layout>
  );
};

const StyledWordAdditional = styled.span`
  display: inline-block;
  margin-left: 2rem;
  font-family: var(--font-text);
  color: var(--font-color-main);
  font-weight: 100;
`;

export default Words;
