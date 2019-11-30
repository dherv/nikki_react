import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }) => (
  <>
    <Navbar></Navbar>
    {children}
  </>
);
export default Layout;
