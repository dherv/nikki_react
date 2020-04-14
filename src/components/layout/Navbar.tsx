import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navbar: React.FC = () => (
  <List>
    <li style={{ display: "flex", alignItems: "center" }}>
      <Logo />
      <Title>Nikki</Title>
    </li>
    <li>
      <StyledLink exact to="/">
        Dailies
      </StyledLink>
    </li>
    <li>
      <StyledLink exact to="/editor">
        Editor
      </StyledLink>
    </li>

    <li>
      <StyledLink exact to="/words">
        Words
      </StyledLink>
    </li>
    {/* <li>
      <StyledLink exact to="/grammars">
        Grammars
      </StyledLink>
    </li> */}
  </List>
);
export default Navbar;

const List = styled.ul`
  display: flex;
  align-items: center;
  // justify-content: space-around;
  padding: 1rem;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
`;

const StyledLink = styled(NavLink)`
  color: var(--font-color-main);
  padding: 0 2rem;
  &.active {
    color: var(--font-color-dark);
  }
`;

const Title = styled.h1`
  font-family: "Caveat Brush", cursive;
  color: #26a69a;
  padding: 0 2rem 0 1rem;
`;
