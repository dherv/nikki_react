import React from "react";
import Authentication from "@bit/dherv.main.authentication";
import { useHistory } from "react-router-dom";

const Auth = () => {
  let history = useHistory();

  return (
    <Authentication
      backgroundColor="#fff"
      title="Nikki"
      environment="production"
      callback={() => history.push("/")}
    ></Authentication>
  );
};

export default Auth;
