import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Navbar: React.FC = () => (
  <List>
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
      <Title>Nikki 日記</Title>
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
  justify-content: space-around;
  padding: 1rem;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
`;

const StyledLink = styled(NavLink)`
  color: var(--font-color-main);
  &.active {
    color: var(--font-color-dark);
  }
`;

const Title = styled.h1`
  color: var(--font-color-dark);
`;
