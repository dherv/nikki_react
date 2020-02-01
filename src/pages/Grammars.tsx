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

const Grammars = () => {
  const sampleWords: Array<IWord> = [
    {
      text: "grammar1",
      translation: "grammar1",
      type: "grammars",
      createdAt: "2020/01/01",
      example: "Word 1 example sentence on click",
      timesUsed: 3
    },
    {
      text: "grammar2",
      translation: "grammar2",
      type: "grammars",
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
        <MainTitle>Grammars</MainTitle>
        <ul>
          {sampleWords.map((w, i) => (
            <MainListItemWithPanel
              key={`${i}_${w.text}`}
              itemIndex={i}
              additionalText={w.translation}
              itemDetails={w}
              listItemContent={
                <DotWithWord
                  typeOrColor={w.type}
                  word={w.text}
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
