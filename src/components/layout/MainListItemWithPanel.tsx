import React, { FC, useState } from "react";
import styled from "styled-components";
import {
  faAngleDoubleDown,
  faAngleDoubleUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IWord, IDaily } from "../../types/interfaces";

const MainListItemWithPanel: FC<{
  additionalText: string;
  itemDetails: IWord | IDaily;
  itemIndex: number;
  listItemContent?: React.ReactElement;
  listItemPanelContent: React.ReactElement;
}> = ({
  additionalText,
  itemDetails,
  itemIndex,
  listItemContent,
  listItemPanelContent
}) => {
  const [showIndexDetails, setShowIndexDetails] = useState<number | null>();
  return (
    <>
      <StyledListItem
        onClick={() =>
          showIndexDetails === itemIndex
            ? setShowIndexDetails(null)
            : setShowIndexDetails(itemIndex)
        }
      >
        <div>
          {listItemContent ? (
            listItemContent
          ) : (
            <>
              <StyledName>{itemDetails.name}</StyledName>
              <StyledAdditionalText>{additionalText}</StyledAdditionalText>
            </>
          )}
        </div>
        <StyledAngleDownIcon>
          {showIndexDetails === itemIndex ? (
            <FontAwesomeIcon icon={faAngleDoubleUp}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faAngleDoubleDown}></FontAwesomeIcon>
          )}
        </StyledAngleDownIcon>
      </StyledListItem>
      {showIndexDetails === itemIndex ? (
        <StyledPanel>{listItemPanelContent}</StyledPanel>
      ) : null}
    </>
  );
};

const StyledAngleDownIcon = styled.div`
  display: none;
  color: var(--font-color-main);
  opacity: 0.3;
  margin-left: auto;
`;

const StyledListItem = styled.li`
  display: flex;
  padding: 1rem 0;
  cursor: pointer;
  // prevent user-select on multiple click
  user-select: none;
  &:hover ${StyledAngleDownIcon} {
    display: block;
  }
`;

const StyledAdditionalText = styled.span`
  display: inline-block;
  margin-left: 2rem;
  font-family: var(--font-text);
  font-weight: 300;
  color: var(--font-color-main);
`;

const StyledPanel = styled.div`
  font-family: var(--font-text);
  color: var(--font-color-main);
  p {
    margin: 0.5rem 0;
    font-weight: 300;
  }
  span {
    font-size: 12px;
    font-weight: 300;
  }
`;

const StyledName = styled.span`
  color: var(--font-color-dark);
  font-weight: 600;
`;

export default MainListItemWithPanel;
