import React, { useState, FC, useEffect, ChangeEvent, MouseEvent } from "react";
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
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import AddIcon from "@material-ui/icons/Add";
import useDebounce from "../../hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
  actions: {
    justifyContent: "flex-end",
  },
  card: {
    width: 600,
    overflow: "visible",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%",
    },
  },
}));

const Translater: FC<{
  addToTextAndSelection: (source: string, target: string) => void;
  addToSelectionOnly: (source: string, target: string) => void;
  addToTextOnly: (targetText: string) => void;
  selection?: string;
}> = ({
  selection,
  addToTextAndSelection,
  addToSelectionOnly,
  addToTextOnly,
}) => {
  const [sourceLanguageText, setSourceLanguageText] = useState<string>("");
  const [targetLanguageText, setTargetLanguageText] = useState<string>("");
  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [currentFocus, setCurrentFocus] = useState<"source" | "target">(
    "source"
  );
  const [isSearching, setIsSearching] = useState(false);
  const debounceText = useDebounce(textToTranslate, 500);
  const [audio, setAudio] = useState<any>();
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

  function playAudio(audio: any) {
    try {
      audio.load();
      audio.play();
    } catch (err) {
      console.log(err);
    }
  }

  const handlePlaySound = async () => {
    // hack: play audio on click to prevent browser autoplay blocking on async calls
    let audio = new Audio();
    audio.play();
    if (targetLanguageText) {
      Api.post("/speech", {
        text: targetLanguageText,
        languageCode: targetLanguage,
        voiceType: "Wavenet",
      }).then(({ Location }) => {
        if (audio) {
          audio.src = `${Location}?v=${Date.now()}`;
          playAudio(audio);
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

  const handleAddToSelectionOnly = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (sourceLanguageText && targetLanguageText) {
      return addToSelectionOnly(sourceLanguageText, targetLanguageText);
    }
    return;
  };

  const handleAddToTextOnly = () => {
    // check taht selection is not active
    if (!selection) {
      addToTextOnly(targetLanguageText);
    }
    // add to text
  };

  const handleAddToTextAndSelection = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (sourceLanguageText && targetLanguageText) {
      return addToTextAndSelection(sourceLanguageText, targetLanguageText);
    }
  };

  useEffect(() => {
    if (selection && selection.length > 0) {
      setCurrentFocus("target");
      console.log("TARGET LANGUAGE", selection);
      setTargetLanguageText(selection);
      setTextToTranslate(selection);
    }
  }, [selection]);

  useEffect(() => {
    if (currentFocus === "target") {
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
    <Card variant="outlined" className={classes.card}>
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
          <IconButton onClick={handleAddToTextOnly}>
            <ImportContactsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="add to selection">
          <IconButton onClick={handleAddToSelectionOnly}>
            <PlaylistAddOutlinedIcon />
          </IconButton>
        </Tooltip>
        {!selection && (
          <Tooltip title="add to text and selection">
            <IconButton onClick={handleAddToTextAndSelection}>
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

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
export default Translater;
