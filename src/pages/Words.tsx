import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/Layout";
import FirebaseContext from "../contexts/FirebaseContext";
import FirebaseService from "../firebase/firebase.module";
import { List, ListItem, ListItemText } from "@material-ui/core";

const Words = () => {
  const [words, setWords] = useState<{ text: string; translation: string }[]>(
    []
  );
  const db = useContext(FirebaseContext) as FirebaseService;

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
    db.snapshot("words", callbackWords);
  }, [db]);

  return (
    <Layout title="words">
      <List>
        {words.map((w, i) => (
          <ListItem>
            <ListItemText primary={w.translation} secondary={w.text} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export default Words;
