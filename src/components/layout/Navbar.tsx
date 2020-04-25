import React from "react";
import NavMenuButton from "./NavMenuButton";
import { useLocation } from "react-router-dom";
import ViewListIcon from "@material-ui/icons/ViewList";
import {
  IconButton,
  Hidden,
  AppBar,
  Toolbar,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
  },
  listIcon: {
    marginLeft: "auto",
  },
}));

const Navbar: React.FC<{
  openDrawer: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  toggleList: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}> = ({ openDrawer, toggleList }) => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <AppBar color="inherit">
      <Toolbar variant="dense" className={classes.toolbar}>
        <Hidden smUp implementation="js">
          <NavMenuButton openDrawer={openDrawer}></NavMenuButton>
        </Hidden>
        {location.pathname === "/editor" ? (
          <Hidden mdUp implementation="js">
            <IconButton
              size="small"
              color="primary"
              className={classes.listIcon}
              onClick={(event) => toggleList(event)}
            >
              <ViewListIcon></ViewListIcon>
            </IconButton>
          </Hidden>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
