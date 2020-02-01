import React from "react";
import styled from "styled-components";
export default class Utils {
  static DateFormat(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  static TextTruncate(text: string) {
    const StyledTextTruncate = styled.span`
      white-space: nowrap;
      text-overflow: ellipsis;
    `;
    return <StyledTextTruncate>{text}</StyledTextTruncate>;
  }
}
