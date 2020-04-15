import React from "react";
import styled from "styled-components";
import NavMenuButton from "./NavMenuButton";

const Navbar: React.FC<{
  openDrawer: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}> = ({ openDrawer }) => {
  return (
    <Container>
      <List>
        <NavMenuButton openDrawer={openDrawer}></NavMenuButton>
      </List>
    </Container>
  );
};

const Container = styled.div`
  grid-area: navbar;
  position: sticky;
  top: 0;
  z-index: 50;
`;
const List = styled.ul`
  display: flex;
  align-items: center;
  // justify-content: space-around;
  padding: 0.5rem 2rem;
`;

export default Navbar;
