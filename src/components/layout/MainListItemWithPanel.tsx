import React, { FC, useState } from "react";
import styled from "styled-components";
import {
  faAngleDoubleDown,
  faAngleDoubleUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IWord } from "../../types/interfaces";

const MainListItemWithPanel: FC<{
  additionalText: string;
  itemDetails: IWord;
  itemIndex: number;
}> = ({ children, additionalText, itemDetails, itemIndex }) => {
  const [showIndexDetails, setShowIndexDetails] = useState<number | null>();
  return (
    <>
      <StyledMainListItemWithPanel
        onClick={() =>
          showIndexDetails === itemIndex
            ? setShowIndexDetails(null)
            : setShowIndexDetails(itemIndex)
        }
      >
        <div>
          {children}
          <StyledWordAdditional>{additionalText}</StyledWordAdditional>
        </div>
        <StyledWordAngleDownIcon>
          {showIndexDetails === itemIndex ? (
            <FontAwesomeIcon icon={faAngleDoubleUp}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faAngleDoubleDown}></FontAwesomeIcon>
          )}
        </StyledWordAngleDownIcon>
      </StyledMainListItemWithPanel>
      {showIndexDetails === itemIndex ? (
        <StyledWordDetails>
          <p>{itemDetails.example}</p>
          <p>
            <span>Added on the {itemDetails.createdAt}</span>{" "}
            <span>used {itemDetails.timesUsed} times</span>
          </p>
        </StyledWordDetails>
      ) : null}
    </>
  );
};

const StyledWordAngleDownIcon = styled.div`
  display: none;
  color: var(--font-color-main);
  opacity: 0.3;
  margin-left: auto;
`;

const StyledMainListItemWithPanel = styled.li`
  display: flex;
  padding: 1rem 0;
  cursor: pointer;
  // prevent user-select on multiple click
  user-select: none;
  &:hover ${StyledWordAngleDownIcon} {
    display: block;
  }
`;

const StyledWordAdditional = styled.span`
  display: inline-block;
  margin-left: 2rem;
  font-family: var(--font-text);
  color: var(--font-color-main);
`;

const StyledWordDetails = styled.div`
  font-family: var(--font-text);
  color: var(--font-color-main);
  p {
    margin: 0.5rem 0;
  }
  span {
    font-size: 12px;
    font-weight: 300;
  }
`;

export default MainListItemWithPanel;
