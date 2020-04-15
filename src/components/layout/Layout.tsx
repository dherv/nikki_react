import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import NavMenu from "./NavMenu";

const Layout: React.FC<{}> = ({ children }) => {
  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    console.log("called");
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    console.log(open);

    setDrawerState(open);
  };

  const openDrawer = () => toggleDrawer(true);
  const closeDrawer = () => toggleDrawer(false);
  return (
    <Container>
      <NavMenu closeDrawer={closeDrawer()} open={drawerState}></NavMenu>
      <Navbar openDrawer={openDrawer()}></Navbar>
      <Main style={{ gridArea: "main" }}>{children}</Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "nav navbar"
    "nav main";
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content min-content 1fr;
  min-height: 100vh;
`;
const Main = styled.main`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`;
export default Layout;
