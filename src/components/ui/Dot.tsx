import React, { FC, useState, useEffect } from "react";

const Dot: FC<{ typeOrColor: "words" | "grammars" }> = ({ typeOrColor }) => {
  const [fill, setFill] = useState<string | undefined>("");
  useEffect(() => {
    const mapTypeColor = new Map([
      ["words", "#8558B1"],
      ["grammars", "#F0D64D"]
    ]);

    if (mapTypeColor.has(typeOrColor)) {
      setFill(mapTypeColor.get(typeOrColor));
    } else {
      setFill(fill);
    }
  }, [typeOrColor, fill]);
  return (
    <svg
      width="12px"
      height="12px"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill={fill} cx="6" cy="6" r="6" />
    </svg>
  );
};

export default Dot;
