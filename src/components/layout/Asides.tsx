import React, { FC } from "react";
import { StyledAside } from "../../styled/GlobalComponents";
import styled from "styled-components";
import {
  StyledAsideDescriptionList,
  StyledAsideDescriptionTitle,
  StyledAsideDescription,
  StyledAsideStatistics,
  StyledAsideStatisticsContainer,
  StyledAsideStatisticsIcon,
  StyledAsideStatisticsSpan
} from "./AsidesStyles";
import {
  faBatteryHalf,
  faFont,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

export const AsideRight: FC<{ title: string; subtitle?: string }> = ({
  children,
  title,
  subtitle
}) => {
  return (
    <StyledAside>
      <StyledAsideTitle>{title}</StyledAsideTitle>
      <StyledAsideSubtitle>{subtitle}</StyledAsideSubtitle>
      {children}
    </StyledAside>
  );
};

export const AsideLeft: FC<{ title: string }> = ({ children, title }) => {
  return (
    <StyledAside>
      <StyledAsideTitleLeft>{title}</StyledAsideTitleLeft>
      {children}
    </StyledAside>
  );
};

export const AsideLeftDefault: FC<{}> = () => (
  <div>
    <StyledAsideDescriptionList>
      <StyledAsideDescriptionTitle>Weak Words</StyledAsideDescriptionTitle>
      <StyledAsideDescription>word1</StyledAsideDescription>
      <StyledAsideDescription>word1</StyledAsideDescription>
      <StyledAsideDescription>word1</StyledAsideDescription>
      <StyledAsideDescriptionTitle>Mastered Words</StyledAsideDescriptionTitle>
      <StyledAsideDescription>word1</StyledAsideDescription>
      <StyledAsideDescription>word1</StyledAsideDescription>
      <StyledAsideDescription>word1</StyledAsideDescription>
      <StyledAsideDescriptionTitle>Weak Grammars</StyledAsideDescriptionTitle>
      <StyledAsideDescription>grammar1</StyledAsideDescription>
      <StyledAsideDescription>grammar1</StyledAsideDescription>
      <StyledAsideDescription>grammar1</StyledAsideDescription>
      <StyledAsideDescriptionTitle>
        Mastered Grammars
      </StyledAsideDescriptionTitle>
      <StyledAsideDescription>grammar1</StyledAsideDescription>
      <StyledAsideDescription>grammar1</StyledAsideDescription>
      <StyledAsideDescription>grammar1</StyledAsideDescription>
    </StyledAsideDescriptionList>
    <StyledAsideStatistics>
      <StyledAsideStatisticsContainer>
        <StyledAsideStatisticsIcon icon={faBatteryHalf} />
        <StyledAsideStatisticsSpan>75%</StyledAsideStatisticsSpan>
      </StyledAsideStatisticsContainer>
      <StyledAsideStatisticsContainer>
        <StyledAsideStatisticsIcon icon={faFont} />
        <StyledAsideStatisticsSpan>78 words</StyledAsideStatisticsSpan>
      </StyledAsideStatisticsContainer>
      <StyledAsideStatisticsContainer>
        <StyledAsideStatisticsIcon icon={faCheckCircle} />
        <StyledAsideStatisticsSpan>78 words</StyledAsideStatisticsSpan>
      </StyledAsideStatisticsContainer>
    </StyledAsideStatistics>
  </div>
);

export const AsideRecentDailies: FC<{ content: React.ReactElement }> = ({
  content
}) => <StyledAsideContent>{content}</StyledAsideContent>;

const StyledAsideTitle = styled.h5`
  font-size: 1.25rem;
  text-transform: capitalize;
`;
const StyledAsideSubtitle = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-family: var(--font-text);
  color: var(--font-color-main);
  text-transform: capitalize;
`;
const StyledAsideContent = styled.div`
  margin: 3rem 0;
`;
const StyledAsideTitleLeft = styled(StyledAsideTitle)`
  font-weight: 600
  font-size: 18px;
  color: #484848
`;
