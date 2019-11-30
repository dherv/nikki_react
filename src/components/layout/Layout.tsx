import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

const Layout: React.FC<{}> = ({ children }) => (
  <>
    <Navbar></Navbar>
    <Container>{children}</Container>
  </>
);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`;
export default Layout;
