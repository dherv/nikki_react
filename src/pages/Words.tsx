import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  AsideLeft,
  AsideRight,
  AsideLeftDefault,
  AsideRecentDailies
} from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import DotWithWord from "../components/ui/DotWithWord";
import styled from "styled-components";
import {
  faAngleDoubleDown,
  faAngleDoubleUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IWord {
  name: string;
  translation: string;
  type: "words" | "grammars";
  createdAt: string;
  example: string;
  timesUsed: number;
}
const Words = () => {
  const [showIndexDetails, setShowIndexDetails] = useState<number | null>();
  const sampleWords: ReadonlyArray<IWord> = [
    {
      name: "word1",
      translation: "word1",
      type: "grammars",
      createdAt: "2020/01/01",
      example: "Word 1 example sentence on click",
      timesUsed: 3
    },
    {
      name: "word2",
      translation: "word2",
      type: "words",
      createdAt: "2020/01/01",
      example: "Word 2 example sentence on click",
      timesUsed: 3
    }
  ];
  const displayAsideLeft = () => <AsideLeftDefault />;
  const displayAsideRight = () => <AsideRecentDailies />;
  return (
    <Layout>
      <AsideLeft title="tips">{displayAsideLeft()}</AsideLeft>
      <Main>
        <MainTitle>Words</MainTitle>
        <ul>
          {sampleWords.map((w, i) => (
            <>
              <StyledWordListItem
                key={`${i}_${w.name}`}
                onClick={() =>
                  showIndexDetails === i
                    ? setShowIndexDetails(null)
                    : setShowIndexDetails(i)
                }
              >
                <div>
                  <DotWithWord typeOrColor={w.type} word={w.name}></DotWithWord>
                  <StyledWordAdditional>{w.translation}</StyledWordAdditional>
                </div>

                <StyledWordAngleDownIcon>
                  {showIndexDetails === i ? (
                    <FontAwesomeIcon icon={faAngleDoubleUp}></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon icon={faAngleDoubleDown}></FontAwesomeIcon>
                  )}
                </StyledWordAngleDownIcon>
              </StyledWordListItem>

              {showIndexDetails === i ? (
                <StyledWordDetails>
                  <p>{w.example}</p>
                  <p>
                    <span>Added on the {w.createdAt}</span>{" "}
                    <span>used {w.timesUsed} times</span>
                  </p>
                </StyledWordDetails>
              ) : null}
            </>
          ))}
        </ul>
      </Main>
      <AsideRight title="recent dailies">{displayAsideRight()}</AsideRight>
    </Layout>
  );
};

const StyledWordDetails = styled.div`
  font-family: var(--font-text);
  color: var(--font-color-main);
  p {
    margin: 0.5rem 0;
  }
  span {
    font-size: 12px;
    font-weight: 300;
  }
`;

const StyledWordAngleDownIcon = styled.div`
  display: none;
  color: var(--font-color-main);
  opacity: 0.3;
  margin-left: auto;
`;

const StyledWordListItem = styled.li`
  display: flex;
  padding: 1rem 0;
  cursor: pointer;
  // prevent user-select on multiple click
  user-select: none;
  &:hover ${StyledWordAngleDownIcon} {
    display: block;
  }
`;

const StyledWordAdditional = styled.span`
  display: inline-block;
  margin-left: 2rem;
  font-family: var(--font-text);
  color: var(--font-color-main);
`;

export default Words;
