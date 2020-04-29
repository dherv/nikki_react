import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/Layout";
import { IDaily } from "../types/interfaces";
import FirebaseContext from "../contexts/FirebaseContext";
import FirebaseService from "../firebase/firebase.module";
import styled from "styled-components";
import {
  Hidden,
  Dialog,
  DialogContent,
  Divider,
  ListItemText,
  List,
  ListItem,
} from "@material-ui/core";

const Dailies = () => {
  const [dailies, setDailies] = useState<{ id: string; data: IDaily }[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogCurrentDaily, setDialogCurrentDaily] = useState<{
    id: string;
    data: IDaily;
  } | null>();
  const [words, setWords] = useState<{ text: string; translation: string }[]>(
    []
  );
  const db = useContext(FirebaseContext) as FirebaseService;

  const handleOpenDialog = (d: { id: string; data: IDaily }) => {
    setDialogCurrentDaily(d);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogCurrentDaily(null);
  };

  const callbackDailies = (docs: firebase.firestore.DocumentData[]) => {
    setDailies(docs.map((d) => ({ id: d.id, data: d.data() })));
  };

  const callbackWords = (docs: firebase.firestore.DocumentData[]) => {
    setWords(
      docs.map((d) => {
        const data = d.data();
        const { text, translation } = data;
        return { text, translation };
      })
    );
  };

  useEffect(() => {
    db.snapshot("dailies", callbackDailies);
  }, [db]);

  useEffect(() => {
    if (dialogCurrentDaily) {
      db.snapshot("words", callbackWords, [
        "dailyId",
        "==",
        `dailies/${dialogCurrentDaily.id}`,
      ]);
    }
  }, [db, dialogCurrentDaily]);

  const content = dialogCurrentDaily ? (
    <List>
      <ListItem>
        <ListItemText
          primary={dialogCurrentDaily.data.text}
          secondary={dialogCurrentDaily.data.date}
        />
      </ListItem>
      <Divider />
      {words.map((w) => (
        <ListItem>
          <ListItemText primary={w.translation} secondary={w.text} />
        </ListItem>
      ))}
    </List>
  ) : null;

  return (
    <Layout title="dailies">
      <List>
        {dailies.map((d, i) => (
          <ListItem onClick={() => handleOpenDialog(d)}>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={d.data.text}
              secondary={d.data.date}
              style={{ width: "calc(100vw - 4rem)", maxWidth: 500 }}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
      <Hidden smUp implementation="js">
        {dialogCurrentDaily ? (
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={openDialog}
            maxWidth="xl"
            fullWidth={true}
            onBackdropClick={handleCloseDialog}
            transitionDuration={{ enter: 500, exit: 100 }}
          >
            <DialogContent dividers>{content}</DialogContent>
          </Dialog>
        ) : null}
      </Hidden>
      <Hidden smDown implementation="js">
        <ListContainer> {content}</ListContainer>
      </Hidden>
    </Layout>
  );
};

const ListContainer = styled.div`
  margin: 0 auto;
  width: 500px;
`;

export default Dailies;
