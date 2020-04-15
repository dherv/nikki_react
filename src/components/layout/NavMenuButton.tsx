import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { FC } from "react";

const NavMenuButton: FC<{
  openDrawer: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}> = ({ openDrawer }) => {
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={event => openDrawer(event)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default NavMenuButton;
