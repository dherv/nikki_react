import React from "react";
import styled from "styled-components";

const Navbar: React.FC = () => (
  <List>
    <li>
      <Link href="#">Dailies</Link>
    </li>
    <li>
      <Link href="#">Editor</Link>
    </li>
    <li>
      <Title>Nikki 日記</Title>
    </li>
    <li>
      <Link href="#">Words</Link>
    </li>
    <li>
      <Link href="#">Grammars</Link>
    </li>
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

const Link = styled.a`
  color: var(--font-color-main);
`;

const Title = styled.h1`
  color: var(--font-color-editor);
`;
