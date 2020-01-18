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
import { IWord } from "../types/interfaces";
import MainListItemWithPanel from "../components/layout/MainListItemWithPanel";

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
  return (
    <Layout>
      <AsideLeft title="tips">{displayAsideLeft()}</AsideLeft>
      <Main>
        <MainTitle>Words</MainTitle>
        <ul>
          {sampleWords.map((w, i) => (
            <>
              <MainListItemWithPanel
                key={`${i}_${w.name}`}
                itemIndex={i}
                additionalText={w.translation}
                itemDetails={w}
              >
                <DotWithWord typeOrColor={w.type} word={w.name}></DotWithWord>
              </MainListItemWithPanel>
            </>
          ))}
        </ul>
      </Main>
      <AsideRight title="recent dailies">{displayAsideRight()}</AsideRight>
    </Layout>
  );
};

export default Words;
