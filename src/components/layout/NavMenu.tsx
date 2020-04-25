import React, { FC } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { IconButton, Hidden } from "@material-ui/core";
import Logo from "./Logo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ViewDayIcon from "@material-ui/icons/ViewDay";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    list: {
      width: 256,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      backgroundColor: "#fff",
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: "#fff",
      color: "#ecec",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: "#fff",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    footer: {
      color: "#ecec",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(1, 2),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      color: "#ecec",
    },
  })
);

const links = [
  {
    icon: <CreateIcon fontSize="small" />,
    url: "/editor",
    name: "Editor",
  },
  {
    icon: <ViewDayIcon fontSize="small" />,
    url: "/dailies",
    name: "Dailies",
  },
  {
    icon: <TextFieldsIcon fontSize="small" />,
    url: "/words",
    name: "Words",
  },
];

const NavMenu: FC<{
  closeDrawer: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  toggleDrawer: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  open: boolean;
  container?: any;
}> = ({ closeDrawer, toggleDrawer, open }) => {
  const classes = useStyles();

  const handleDrawerToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    closeDrawer(event);
  };

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <LogoContainer>
          <Logo></Logo>
        </LogoContainer>
        <Title>Nikki</Title>
      </div>
      <Divider />
      <List>
        {links.map(({ icon, url, name }) => (
          <NavListItem to={url} key={url}>
            <ListItemIcon
              style={{
                height: 20,
                width: 20,
                color: "#484848",
              }}
            >
              {icon}
            </ListItemIcon>
            <NavMenuText primary={name} />
          </NavListItem>
        ))}
      </List>
      <Divider />
      <div className={classes.footer}>
        <IconButton
          disableRipple
          size="medium"
          color="primary"
          onClick={toggleDrawer}
        >
          {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
    </>
  );
  return (
    <nav>
      {/* js implementation has the benefit of not rendering any content at all unless the breakpoint is met. */}
      <Hidden smUp implementation="js">
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: false, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          variant="permanent"
          open={open}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const LogoContainer = styled.div`
  padding: 0 20px;
  align-items: center;
  display: flex;
  height: 48px;
`;
const Title = styled.h1`
  font-family: "Gotu", sans-serif;
  color: #fff;
  margin-left: 12px;
  font-size: 1.5rem;
  height: 18px;
`;
const NavListItem = styled(Link)`
  display: flex;
  align-items: center;
  height: 56px;
  padding-left: 24px;
  padding-right: 44px;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
const NavMenuText = styled(ListItemText)`
  align-items: center;
  span {
    color: #484848;
    display: flex;
    text-decoration: none;
    transition: background-color 0.15s ease;
    font-size: 14px;
    line-height: 20px;
    font-weight: 800;
  }
`;

export default NavMenu;
