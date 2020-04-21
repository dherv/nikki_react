import React, { FC, ChangeEvent, MouseEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";

const useStyles = makeStyles({
  root: {
    width: "calc(100% - 48px)",
  },
  content: {
    padding: 0,
  },
  actions: {
    padding: 0,
    height: 48,
  },
});

const TranslaterCard: FC<{
  name: "source" | "target";
  value: string | undefined;
  language: string;
  sound: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: (name: "source" | "target") => void;
  playSound?: (event: MouseEvent<HTMLButtonElement>) => void;
}> = ({ name, value, language, sound, onChange, onFocus, playSound }) => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardContent className={classes.content}>
        <Textarea
          name={name}
          value={value}
          placeholder={language}
          rows={5}
          onChange={(event) => onChange(event)}
          onFocus={(event) => {
            if (
              event.target.name === "source" ||
              event.target.name === "target"
            ) {
              onFocus(name);
            }
          }}
        ></Textarea>
      </CardContent>

      <CardActions className={classes.actions}>
        {sound ? (
          <IconButton size="medium" color="primary" onClick={playSound}>
            <VolumeUpOutlinedIcon></VolumeUpOutlinedIcon>
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  );
};

const Textarea = styled.textarea`
  border: none;
  padding: 12px;
`;

export default TranslaterCard;
