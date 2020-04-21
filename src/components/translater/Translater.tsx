import React, { useState, FC, useEffect, ChangeEvent } from "react";
import Api from "../../api/Api";
import styled from "styled-components";
import TranslaterCard from "./TranslaterCard";
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import AddIcon from "@material-ui/icons/Add";
import useDebounce from "../../hooks/useDebounce";

const useStyles = makeStyles({
  actions: {
    justifyContent: "flex-end",
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
  const [isSearching, setIsSearching] = useState(false);
  const debounceText = useDebounce(textToTranslate, 500);

  const classes = useStyles();
  const targetLanguage = "ja-JP";
  const sourceLanguage = "en-US";

  const handleFocus = (name: "source" | "target") => {
    setCurrentFocus(name);
  };

  const handleTranslation = (
    text: string,
    focus: "source" | "target"
  ): Promise<{ translation: string }> => {
    const translationWay = {
      text: text,
      sourceLanguageCode: focus === "source" ? sourceLanguage : targetLanguage,
      targetLanguageCode: focus === "source" ? targetLanguage : sourceLanguage,
    };
    return Api.post("/translate", {
      ...translationWay,
    }).then((response) => {
      return response;
    });
  };

  const handlePlaySound = () => {
    if (targetLanguageText) {
      Api.post("/speech", {
        text: targetLanguageText,
        languageCode: targetLanguage,
        voiceType: "Wavenet",
      }).then((res) => {
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
    if (currentFocus === "target") {
      console.log("here", translation);
      setSourceLanguageText(translation);
    } else {
      setTargetLanguageText(translation);
    }
  }, [translation]);

  useEffect(() => {
    if (debounceText) {
      setIsSearching(true);
      handleTranslation(textToTranslate, currentFocus).then(
        ({ translation }) => {
          setIsSearching(false);
          setTranslation(translation);
        }
      );
    } else {
      setTranslation("");
    }
  }, [debounceText]);

  return (
    <Card variant="outlined">
      <CardContent>
        <TranslaterContainer>
          <TranslaterCard
            name="source"
            language="English"
            sound={false}
            value={sourceLanguageText}
            onChange={handleChangeSource}
            onFocus={handleFocus}
          ></TranslaterCard>
          <TranslaterCard
            name="target"
            language="Japanese"
            sound={true}
            value={targetLanguageText}
            onChange={handleChangeTarget}
            onFocus={handleFocus}
            playSound={handlePlaySound}
          ></TranslaterCard>
        </TranslaterContainer>
      </CardContent>
      <Divider></Divider>
      <CardActions className={classes.actions}>
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
