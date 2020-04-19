import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/Layout";
import { Main, MainTitle } from "../styled/GlobalComponents";
import { IDaily } from "../types/interfaces";
import FirebaseContext from "../contexts/FirebaseContext";

const Dailies = () => {
  const [dailies, setDailies] = useState<IDaily[]>([]);
  const db = useContext(FirebaseContext);

  const callback = (type: string, data: IDaily, id: string) => {
    if (type === "added") {
      setDailies((prev) => [...prev, data]);
    }
  };

  useEffect(() => {
    // const db = dbFactory(callback);
    db.snapshot(callback);
  }, [db]);

  // useEffect(() => {
  //   Api.get("/dailies").then((data: IDaily[]) => {
  //     const dailies = data.map((d) => {
  //       const { words, grammars } = d;
  //       d.words = words.map((w) => {
  //         w.type = "words";
  //         return w;
  //       });
  //       d.grammars = grammars.map((g) => {
  //         g.type = "grammars";
  //         return g;
  //       });
  //       return d;
  //     });
  //     setDailies(dailies);
  //   });
  // }, []);

  // const displayAsideLeft = () => <AsideLeftDefault />;
  // const displayAsideRight = () => null;

  // const displayListItemPanel = (itemDetails: IDaily) => (
  //   <>
  //     <p>{itemDetails.text}</p>
  //     <StyledPanelList>
  //       {[...itemDetails.words, ...itemDetails.grammars].map((w, i) => (
  //         <StyledPanelListItem key={`${i}_${w.text}`}>
  //           <DotWithWord
  //             typeOrColor={w.type}
  //             word={w.text}
  //             translation={w.translation}
  //           />
  //         </StyledPanelListItem>
  //       ))}
  //     </StyledPanelList>
  //   </>
  // );

  return (
    <Layout>
      {/* <AsideLeft title="tips">{displayAsideLeft()}</AsideLeft> */}
      <Main>
        <MainTitle>Dailies</MainTitle>
        <ul>
          {dailies.map((d, i) => (
            <h5 key={i}>{d.text}</h5>
            // <MainListItemWithPanel
            //   key={`${i}_${d.id}`}
            //   itemIndex={i}
            //   additionalText={Utils.DateFormat(d.createdAt)}
            //   itemDetails={d}
            //   listItemPanelContent={displayListItemPanel(d)}
            // ></MainListItemWithPanel>
          ))}
        </ul>
      </Main>
      {/* <AsideRight title="recent" subtitle="words and grammars">
        {displayAsideRight()}
      </AsideRight> */}
    </Layout>
  );
};

// const StyledPanelList = styled.ul`
//   margin: 2rem 0;
// `;
// const StyledPanelListItem = styled.li`
//   display: flex;
//   align-items: center;
//   margin: 1rem 0;
// `;

export default Dailies;
