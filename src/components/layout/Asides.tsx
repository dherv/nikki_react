import React, { FC } from "react";
import { StyledAside } from "../../styled/GlobalComponents";
import styled from "styled-components";

export const AsideRight: FC<{ title: string }> = ({ children, title }) => {
  return (
    <StyledAside>
      <StyledAsideTitle>{title}</StyledAsideTitle>
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

const StyledAsideTitle = styled.h4`
  font-size: 1.25rem;
  text-transform: capitalize;
`;

const StyledAsideTitleLeft = styled(StyledAsideTitle)`
  font-weight: 600
  font-size: 18px;
  color: #484848
`;
