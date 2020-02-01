import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import {
  AsideLeft,
  AsideRight,
  AsideLeftDefault
} from "../components/layout/Asides";
import { Main, MainTitle } from "../styled/GlobalComponents";
import MainListItemWithPanel from "../components/layout/MainListItemWithPanel";
import { IDaily } from "../types/interfaces";
import DotWithWord from "../components/ui/DotWithWord";
import Api from "../api/Api";
import Utils from "../utils/Utils";

const Dailies = () => {
  const [dailies, setDailies] = useState<IDaily[]>([]);

  useEffect(() => {
    Api.get("/dailies").then((data: IDaily[]) => {
      const dailies = data.map(d => {
        const { words, grammars } = d;
        d.words = words.map(w => {
          w.type = "words";
          return w;
        });
        d.grammars = grammars.map(g => {
          g.type = "grammars";
          return g;
        });
        return d;
      });
      setDailies(dailies);
    });
  }, []);

  const displayAsideLeft = () => <AsideLeftDefault />;
  const displayAsideRight = () => null;

  const displayListItemPanel = (itemDetails: IDaily) => (
    <>
      <p>{itemDetails.body}</p>
      <StyledPanelList>
        {[...itemDetails.words, ...itemDetails.grammars].map((w, i) => (
          <StyledPanelListItem key={`${i}_${w.text}`}>
            <DotWithWord
              typeOrColor={w.type}
              word={w.text}
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
          {dailies.map((d, i) => (
            <MainListItemWithPanel
              key={`${i}_${d.title}`}
              itemIndex={i}
              additionalText={Utils.DateFormat(d.createdAt)}
              itemDetails={d}
              listItemPanelContent={displayListItemPanel(d)}
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
