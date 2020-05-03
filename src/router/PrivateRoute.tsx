import { Route, Redirect, RouteProps } from "react-router-dom";
import React, { FC } from "react";
import jwt from "jsonwebtoken";

type decoded = {
  username: string;
  sub: number;
  iat: number;
  exp: number;
};

const auth = {
  authenticate() {
    const token = localStorage.getItem("token");
    const secret = process.env.REACT_APP_JWT_SECRET;
    if (token && secret) {
      return jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          console.error(error);
          return false;
        }
        const { username } = decoded as decoded;
        localStorage.setItem("username", username);
        return true;
      });
    } else {
      return false;
    }
  },
  signout() {
    localStorage.clear();
  },
};

interface PrivateRouteProps extends RouteProps {
  // make the component prop required instead of optional
  component: React.ComponentType<any>;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      auth.authenticate() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
