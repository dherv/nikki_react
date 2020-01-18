import React from "react";
import Layout from "../components/layout/Layout";
import {
  AsideLeft,
  AsideRight,
  AsideLeftDefault,
  AsideRecentDailies
} from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import MainListItemWithPanel from "../components/layout/MainListItemWithPanel";
import { IDaily } from "../types/interfaces";

const Dailies = () => {
  const sampleDailies: ReadonlyArray<IDaily> = [
    {
      name: "daily1",
      createdAt: "2020/01/01",
      text: "Daily 1 example sentence on click"
    },
    {
      name: "daily2",
      createdAt: "2020/01/01",
      text: "Daily 2 example sentence on click"
    }
  ];
  const displayAsideLeft = () => <AsideLeftDefault />;
  const displayAsideRight = () => <AsideRecentDailies />;
  const displayListItemPanel = (itemDetails: IDaily) => (
    <p>{itemDetails.text}</p>
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
      <AsideRight title="recent dailies">{displayAsideRight()}</AsideRight>
    </Layout>
  );
};

export default Dailies;
