import React, {
  useState,
  FC,
  useEffect,
  ChangeEvent,
  useRef,
  FocusEvent,
} from "react";
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
  const [sourceLanguageText, setSourceLanguageText] = useState<string>("");
  const [targetLanguageText, setTargetLanguageText] = useState<string>("");
  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [currentFocus, setCurrentFocus] = useState<"source" | "target">(
    "source"
  );
  const classes = useStyles();
  const targetLanguage = "no";
  const sourceLanguage = "en";

  const handleFocus = (name: "source" | "target") => {
    setCurrentFocus(name);
  };

  const translateText = (text: string, focus: "source" | "target") => {
    if (text.length > 0) {
      const translationWay = {
        text: text,
        sourceLanguageCode:
          focus === "source" ? sourceLanguage : targetLanguage,
        targetLanguageCode:
          focus === "source" ? targetLanguage : sourceLanguage,
      };
      console.log(translationWay);
      Api.post("/translate", {
        ...translationWay,
      }).then(({ translation }) => setTranslation(translation));
    }
  };

  const handlePlaySound = () => {
    if (targetLanguageText) {
      Api.post("/speech", { text: targetLanguageText }).then((res) => {
        const audio = new Audio(`${res.Location}?v=${Date.now()}`);
        if (audio) {
          audio.load();
          audio.play();
        }
      });
    }
  };

  const handleChangeSource = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value === "") {
      setTranslation("");
      setTargetLanguageText("");
    }
    setCurrentFocus(event.target.name as any);
    setTextToTranslate(event.target.value);
    setSourceLanguageText(event.target.value);
  };

  const handleChangeTarget = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value === "") {
      setTranslation("");
      setSourceLanguageText("");
    }
    setCurrentFocus(event.target.name as any);
    setTextToTranslate(event.target.value);
    setTargetLanguageText(event.target.value);
  };

  useEffect(() => {
    if (selection && selection.length > 0) {
      setCurrentFocus("target");
      setTargetLanguageText(selection);
      setTextToTranslate(selection);
    }
  }, [selection]);

  useEffect(() => {
    if (textToTranslate && textToTranslate.length > 0) {
      translateText(textToTranslate, currentFocus);
    }
  }, [textToTranslate]);

  useEffect(() => {
    if (currentFocus === "target") {
      console.log("here", translation);
      setSourceLanguageText(translation);
    } else {
      setTargetLanguageText(translation);
    }
  }, [translation]);

  return (
    <Card variant="outlined">
      <CardContent>
        <TranslaterContainer>
          <TranslaterCard
            language="English"
            onChange={handleChangeSource}
            name="source"
            value={sourceLanguageText}
            onFocus={handleFocus}
          ></TranslaterCard>
          <TranslaterCard
            language="Japanese"
            name="target"
            value={targetLanguageText}
            // disabled={!!sourceLanguageText}
            onChange={handleChangeTarget}
            onFocus={handleFocus}
          ></TranslaterCard>
        </TranslaterContainer>
      </CardContent>
      <Divider></Divider>
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
                if (sourceLanguageText && targetLanguageText) {
                  const source = selection
                    ? targetLanguageText
                    : sourceLanguageText;
                  const target = selection
                    ? sourceLanguageText
                    : targetLanguageText;
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
                  if (sourceLanguageText && targetLanguageText) {
                    const source = targetLanguageText;
                    const target = sourceLanguageText;
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
