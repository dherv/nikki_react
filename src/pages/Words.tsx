import React from "react";
import Layout from "../components/layout/Layout";
import {
  AsideLeft,
  AsideRight,
  AsideLeftDefault,
  AsideRecentDailies
} from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import { IWord } from "../types/interfaces";
import MainListItemWithPanel from "../components/layout/MainListItemWithPanel";
import DotWithWord from "../components/ui/DotWithWord";

const Words = () => {
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
        <MainTitle>Words</MainTitle>
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
      <AsideRight title="recent dailies">{displayAsideRight()}</AsideRight>
    </Layout>
  );
};

export default Words;
