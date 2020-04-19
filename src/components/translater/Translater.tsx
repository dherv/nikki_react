import React, { useState, FC, useEffect, ChangeEvent } from "react";
import Api from "../../api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import TranslaterCard from "./TranslaterCard";
import {
  Paper,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Divider,
  IconButton,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import PlusOneRoundedIcon from "@material-ui/icons/PlusOneRounded";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  actions: {
    justifyContent: "space-between",
  },
});

const Translater: FC<{
  addToTextAndSelection: (source: string, target: string) => void;
  addToSelection: (source: string, target: string) => void;
  selection?: string;
}> = ({ selection, addToTextAndSelection, addToSelection }) => {
  const [sourceLanguage, setSourceLanguage] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string | undefined>("");
  const [translationInProgress, setTranslationInProgess] = useState<boolean>(
    false
  );
  const classes = useStyles();

  useEffect(() => {
    setTargetLanguage(selection);
    setSourceLanguage("");
    setTranslationInProgess(false);
  }, [selection]);

  const handleTranslate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTranslationInProgess(true);
    const translationWay = {
      text: selection ? targetLanguage : sourceLanguage,
      sourceLanguageCode: selection ? "no" : "en",
      targetLanguageCode: selection ? "en" : "no",
    };
    Api.post("/translate", {
      ...translationWay,
    }).then(({ translation }) =>
      selection
        ? setSourceLanguage(translation)
        : setTargetLanguage(translation)
    );
  };

  const handlePlaySound = () => {
    if (targetLanguage) {
      Api.post("/speech", { text: targetLanguage }).then((res) => {
        const audio = new Audio(`${res.Location}?v=${Date.now()}`);
        if (audio) {
          audio.load();
          audio.play();
        }
      });
    }
  };

  const handleChangeSource = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setSourceLanguage(event.target.value);
  const handleChangeTarget = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setTargetLanguage(event.target.value);
  return (
    <Card variant="outlined">
      {/* <div>
        <textarea
          name="source"
          value={sourceLanguage}
          disabled={!!selection}
          onChange={({ target }) => setSourceLanguage(target.value)}
        ></textarea>
        <FontAwesomeIcon
          icon={faVolumeUp}
          onClick={handlePlaySound}
        ></FontAwesomeIcon>
      </div> */}
      {/* <div>
        <textarea
          name="target"
          value={targetLanguage}
          disabled={!!sourceLanguage}
          onChange={({ target }) => setTargetLanguage(target.value)}
        ></textarea>
        <FontAwesomeIcon
          icon={faVolumeUp}
          onClick={handlePlaySound}
        ></FontAwesomeIcon>
      </div> */}
      <CardContent>
        <TranslaterContainer>
          <TranslaterCard
            language="English"
            disabled={!!selection}
            onChange={handleChangeSource}
            name="source"
            value={sourceLanguage}
          ></TranslaterCard>
          <TranslaterCard
            language="Japanese"
            name="target"
            value={targetLanguage}
            disabled={!!sourceLanguage}
            onChange={handleChangeTarget}
          ></TranslaterCard>
        </TranslaterContainer>
      </CardContent>
      <Divider></Divider>
      {/* {!translationInProgress ? (
        <button type="button" onClick={(event) => handleTranslate(event)}>
          translate
        </button>
      ) : ( */}
      <CardActions className={classes.actions}>
        <div>
          <Tooltip title="swap languages">
            <IconButton>
              <SwapHorizOutlinedIcon></SwapHorizOutlinedIcon>
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="add to text">
            <IconButton>
              <ImportContactsOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="add to selection">
            <IconButton
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                if (sourceLanguage && targetLanguage) {
                  const source = selection ? targetLanguage : sourceLanguage;
                  const target = selection ? sourceLanguage : targetLanguage;
                  return addToSelection(source, target);
                }
                return;
              }}
            >
              <PlaylistAddOutlinedIcon />
            </IconButton>
          </Tooltip>
          {!selection && (
            <Tooltip title="add to text and selection">
              <IconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  if (sourceLanguage && targetLanguage) {
                    const source = targetLanguage;
                    const target = sourceLanguage;
                    return addToTextAndSelection(source, target);
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </CardActions>
      {/* )} */}
    </Card>
  );
};

const TranslaterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
export default Translater;
