import styled from "styled-components";
import { media } from "../styled/MediaQueries";

export const Aside = styled.aside`
  min-width: 150px;
  max-width: 300px;
  background-color: cyan;
  /* Now we have our methods on media and can use them instead of raw queries */
  ${media.desktop} {
    background: dodgerblue;
  }
  ${media.tablet} {
    display: none;
    background: mediumseagreen;
  }
  ${media.phone} {
    display: none;
    background: palevioletred;
  }
`;

export const Main = styled.main`
  width: 100%;
  padding: 0 2rem;
`;
export const MainTitle = styled.h2`
  font-size: 2rem;
  border-bottom: 1px solid var(--font-color-title);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
`;
