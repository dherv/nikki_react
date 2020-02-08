import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { AsideRight, AsideRecentDailies } from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import { IWord } from "../types/interfaces";
import MainListItemWithPanel from "../components/layout/MainListItemWithPanel";
import DotWithWord from "../components/ui/DotWithWord";
import Api from "../api/Api";
import Utils from "../utils/Utils";

const Words = () => {
  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    Api.get("/words").then(data => {
      setWords(data);
    });
  }, []);

  // const displayAsideLeft = () => <AsideLeftDefault />;
  const displayAsideRight = () => <AsideRecentDailies />;
  const displayListItemPanel = (itemDetails: IWord) => {
    return (
      <>
        <p>{itemDetails.example}</p>
        <p>
          <span>Added on the {Utils.DateFormat(itemDetails.createdAt)}</span>
          {/* <span>used {itemDetails.timesUsed} times</span> */}
        </p>
      </>
    );
  };

  return (
    <Layout>
      {/* <AsideLeft title="tips">{displayAsideLeft()}</AsideLeft> */}
      <Main>
        <MainTitle>Words</MainTitle>
        <ul>
          {words.length > 0 &&
            words.map((w, i) => (
              <MainListItemWithPanel
                key={`${i}_${w.text}`}
                itemIndex={i}
                additionalText={w.translation}
                itemDetails={w}
                listItemContent={
                  <DotWithWord
                    typeOrColor="words"
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

export default Words;
