import React, { useEffect, FC, useContext, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../contexts/FirebaseContext";
import FirebaseService from "../../firebase/firebase.module";
import { ISelection, IDaily } from "../../types/interfaces";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      zIndex: 49,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  id: string;
  container?: any;
  open: boolean;
  closeList: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const SelectionList: FC<ResponsiveDrawerProps> = ({
  id,
  container,
  open,
  closeList,
}) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [listItems, setListItems] = useState<
    {
      title: string;
      subtitle: string;
    }[]
  >([]);
  const db = useContext(FirebaseContext) as FirebaseService;

  const handleDrawerToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    closeList(event);
  };

  useEffect(() => {
    const callback = (docs: firebase.firestore.DocumentData[]) => {
      const formattedDocs = docs.map((d) => {
        const { translation, text } = d.data();
        return { title: translation, subtitle: text };
      });
      setListItems(formattedDocs);
    };
    db.snapshot("words", callback, ["dailyId", "==", `dailies/${id}`]);
  }, [id]);

  useEffect(() => {
    setMobileOpen(open);
  }, [open]);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {listItems.map(({ title, subtitle }) => (
        <List className={classes.root}>
          <ListItem>
            <ListItemText primary={title} secondary={subtitle} />
          </ListItem>
        </List>
      ))}
    </div>
  );

  return (
    <>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          anchor="right"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default SelectionList;
