import React, { FC, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Divider, IconButton } from "@material-ui/core";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles({
  root: {
    width: "calc(100% - 48px)",
  },
  content: {
    padding: 0,
  },
  actions: {
    padding: 0,
  },
});

const TranslaterCard: FC<{
  name: string;
  value: string | undefined;
  language: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ name, value, language, disabled, onChange }) => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardContent className={classes.content}>
        <Textarea
          name={name}
          value={value}
          placeholder={language}
          disabled={disabled}
          rows={5}
          onChange={(event) => onChange(event)}
        ></Textarea>
      </CardContent>

      <CardActions className={classes.actions}>
        <IconButton size="medium" color="primary">
          <VolumeUpOutlinedIcon></VolumeUpOutlinedIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

const Textarea = styled.textarea`
  border: none;
  padding: 12px;
`;

export default TranslaterCard;
