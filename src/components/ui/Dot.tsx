import React, { FC } from "react";

const Dot: FC<{ fill: string }> = ({ fill }) => (
  <svg
    width="12px"
    height="12px"
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle fill={fill} cx="6" cy="6" r="6" />
  </svg>
);

export default Dot;
