import React, { useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import NavMenu from "./NavMenu";
import { Typography } from "@material-ui/core";

const Layout: React.FC<{
  title?: string;
  render?: (listOpen: any, closeList: any) => JSX.Element;
}> = ({ children, title, render }) => {
  const [drawerState, setDrawerState] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };

  const toggleList = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setListOpen(open);
  };

  const openDrawer = () => toggleDrawer(true);
  const closeDrawer = () => toggleDrawer(false);
  const openList = () => toggleList(true);
  const closeList = () => toggleList(false);

  const toggleDrawerWithType = () => {
    const type = !drawerState;
    return toggleDrawer(type);
  };

  return (
    <Container>
      <NavMenu
        toggleDrawer={toggleDrawerWithType()}
        closeDrawer={closeDrawer()}
        open={drawerState}
      ></NavMenu>
      {render && render(listOpen, closeList())}
      <Navbar openDrawer={openDrawer()} toggleList={openList()}></Navbar>
      <Main>
        {title ? (
          <Typography
            style={{ padding: "0 1rem" }}
            component="h4"
            variant="h4"
            color="primary"
            gutterBottom
          >
            {title}
          </Typography>
        ) : null}
        <MainContainer>{children}</MainContainer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "nav navbar"
    "nav main";
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  min-height: 100vh;
  overflow: hidden;
`;
const Main = styled.main`
  grid-area: main
  margin-top: 4rem;
  padding: 1rem 2rem;
  overflow: auto
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export default Layout;
