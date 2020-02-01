import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import {
  AsideLeft,
  AsideRight,
  AsideLeftDefault,
  AsideRecentDailies
} from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import { IGrammar } from "../types/interfaces";
import MainListItemWithPanel from "../components/layout/MainListItemWithPanel";
import DotWithWord from "../components/ui/DotWithWord";
import Api from "../api/Api";
import Utils from "../utils/Utils";

const Grammars = () => {
  const [grammars, setGrammars] = useState<IGrammar[]>([]);

  useEffect(() => {
    Api.get("/grammars").then((data: IGrammar[]) => {
      setGrammars(data);
    });
  }, []);

  const displayAsideLeft = () => <AsideLeftDefault />;
  const displayAsideRight = () => <AsideRecentDailies />;

  const displayListItemPanel = (itemDetails: IGrammar) => {
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
      <AsideLeft title="tips">{displayAsideLeft()}</AsideLeft>
      <Main>
        <MainTitle>Grammars</MainTitle>
        <ul>
          {grammars.map((g, i) => (
            <MainListItemWithPanel
              key={`${i}_${g.text}`}
              itemIndex={i}
              additionalText={g.translation}
              itemDetails={g}
              listItemContent={
                <DotWithWord
                  typeOrColor="grammars"
                  word={g.text}
                  translation={g.translation}
                />
              }
              listItemPanelContent={displayListItemPanel(g)}
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
