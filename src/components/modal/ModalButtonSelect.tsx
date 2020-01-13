import React, { FC } from "react";
import styled from "styled-components";

const ModalButtonSelect: FC<{
  color: string;
  onClick: () => void;
}> = ({ children, color, onClick }) => {
  return (
    <SVG
      onClick={() => onClick()}
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
    >
      <g>
        <SVGCircle color={color} cx="75" cy="75" r="75"></SVGCircle>
        <SVGText
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {children}
        </SVGText>
      </g>
    </SVG>
  );
};

const SVG = styled.svg`
  shape-rendering: geometricPrecision;
  text-rendering: geometricPrecision;
  image-rendering: auto;
  fil-rule: evenodd;
  clip-rule: evenodd;
  cursor: pointer;
  margin: 0 32px;
`;

const SVGCircle = styled.circle<{ color: string }>`
  fill: ${props => props.color};
`;

const SVGText = styled.text`
  fill: #fff;
  font-weight: 600;
  font-size: 1.25rem;
`;

export default ModalButtonSelect;
