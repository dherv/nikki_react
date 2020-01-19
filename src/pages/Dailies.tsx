import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import {
  AsideLeft,
  AsideRight,
  AsideLeftDefault,
  AsideRecentDailies
} from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import MainListItemWithPanel from "../components/layout/MainListItemWithPanel";
import { IDaily, IWord } from "../types/interfaces";
import DotWithWord from "../components/ui/DotWithWord";

const Dailies = () => {
  const sampleWords: Array<IWord> = [
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
  const sampleDailies: ReadonlyArray<IDaily> = [
    {
      name: "daily1",
      createdAt: "2020/01/01",
      text: "Daily 1 example sentence on click",
      words: sampleWords
    },
    {
      name: "daily2",
      createdAt: "2020/01/01",
      text: "Daily 2 example sentence on click",
      words: sampleWords
    }
  ];
  const displayAsideLeft = () => <AsideLeftDefault />;
  const displayAsideRight = () => <AsideRecentDailies />;
  const displayListItemPanel = (itemDetails: IDaily) => (
    <>
      <p>{itemDetails.text}</p>
      <StyledPanelList>
        {itemDetails.words.map((w, i) => (
          <StyledPanelListItem key={`${i}_${w.name}`}>
            <DotWithWord
              typeOrColor={w.type}
              word={w.name}
              translation={w.translation}
            />
          </StyledPanelListItem>
        ))}
      </StyledPanelList>
    </>
  );

  return (
    <Layout>
      <AsideLeft title="tips">{displayAsideLeft()}</AsideLeft>
      <Main>
        <MainTitle>Dailies</MainTitle>
        <ul>
          {sampleDailies.map((daily, i) => (
            <MainListItemWithPanel
              key={`${i}_${daily.name}`}
              itemIndex={i}
              additionalText={daily.createdAt}
              itemDetails={daily}
              listItemPanelContent={displayListItemPanel(daily)}
            ></MainListItemWithPanel>
          ))}
        </ul>
      </Main>
      <AsideRight title="recent" subtitle="words and grammars">
        {displayAsideRight()}
      </AsideRight>
    </Layout>
  );
};

const StyledPanelList = styled.ul`
  margin: 2rem 0;
`;
const StyledPanelListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

export default Dailies;
