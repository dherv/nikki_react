import styled from "styled-components";
import { media } from "../styled/MediaQueries";

export const StyledAside = styled.aside`
  min-width: 250px;
  max-width: 300px;
  padding: 1rem 2rem;

  /* Now we have our methods on media and can use them instead of raw queries */
  ${media.desktop} {
    display: none;
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
