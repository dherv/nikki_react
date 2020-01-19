import React from "react";
import Layout from "../components/layout/Layout";
import {
  AsideLeft,
  AsideRight,
  AsideLeftDefault,
  AsideRecentDailies
} from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import { IWord, IDaily } from "../types/interfaces";
import MainListItemWithPanel from "../components/layout/MainListItemWithPanel";
import DotWithWord from "../components/ui/DotWithWord";
import {
  StyledAsideListItem,
  StyledAsideListItemRecentDailies
} from "../components/layout/AsidesStyles";

const Grammars = () => {
  const sampleWords: Array<IWord> = [
    {
      name: "grammar1",
      translation: "grammar1",
      type: "grammars",
      createdAt: "2020/01/01",
      example: "Word 1 example sentence on click",
      timesUsed: 3
    },
    {
      name: "grammar2",
      translation: "grammar2",
      type: "grammars",
      createdAt: "2020/01/01",
      example: "Word 2 example sentence on click",
      timesUsed: 3
    }
  ];
  const recentDailies: ReadonlyArray<IDaily> = [
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
  const displayAsideRight = () => (
    <AsideRecentDailies
      content={
        <ul>
          {recentDailies.map(d => (
            <StyledAsideListItemRecentDailies>
              <h4>{d.createdAt}</h4>
              <h5>{d.name}</h5>
              <p>{d.text}</p>
              <ul>
                {d.words.map(w => (
                  <StyledAsideListItem>
                    <DotWithWord
                      typeOrColor={w.type}
                      word={w.name}
                      translation={w.translation}
                    />
                  </StyledAsideListItem>
                ))}
              </ul>
            </StyledAsideListItemRecentDailies>
          ))}
        </ul>
      }
    />
  );
  const displayListItemPanel = (itemDetails: IWord) => {
    return (
      <>
        <p>{itemDetails.example}</p>
        <p>
          <span>Added on the {itemDetails.createdAt}</span>{" "}
          <span>used {itemDetails.timesUsed} times</span>
        </p>
      </>
    );
  };
  return (
    <Layout>
      <AsideLeft title="tips">{displayAsideLeft()}</AsideLeft>
      <Main>
        <MainTitle>Grammars</MainTitle>
        <ul>
          {sampleWords.map((w, i) => (
            <MainListItemWithPanel
              key={`${i}_${w.name}`}
              itemIndex={i}
              additionalText={w.translation}
              itemDetails={w}
              listItemContent={
                <DotWithWord
                  typeOrColor={w.type}
                  word={w.name}
                  translation={w.translation}
                />
              }
              listItemPanelContent={displayListItemPanel(w)}
            ></MainListItemWithPanel>
          ))}
        </ul>
      </Main>
      <AsideRight title="recent" subtitle="dailies">
        {displayAsideRight()}
      </AsideRight>
    </Layout>
  );
};

export default Grammars;
