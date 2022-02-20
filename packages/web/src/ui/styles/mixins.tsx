import { css } from '@emotion/react';
import { returnBreakpoint } from './breakpoints';

export const media = {
  phone: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('phone')}) {
      ${css(...args)}
    }
  `,
  tablet: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('tablet')}) {
      ${css(...args)}
    }
  `,
  laptop: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('laptop')}) {
      ${css(...args)}
    }
  `,
  desktop: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('desktop')}) {
      ${css(...args)}
    }
  `,
  xl: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('xl')}) {
      ${css(...args)}
    }
  `,
  hover: (...args: [TemplateStringsArray]) => css`
    @media (hover: hover) {
      &:hover {
        ${css(...args)}
      }
    }
  `,
  canHover: (...args: [TemplateStringsArray]) => css`
    @media (hover: hover) {
      ${css(...args)}
    }
  `,
  noHover: (...args: [TemplateStringsArray]) => css`
    @media (hover: none) {
      ${css(...args)}
    }
  `,
};

export const absoluteCentered = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto !important;
`;

export const absoluteFullCentered = css`
  width: 100%;
  height: 100%;
  ${absoluteCentered};
`;

export const buttonInit = css`
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-appearance: none;
  border: 0;
  background-color: rgba(255, 255, 255, 0);
  text-decoration: none;
  cursor: pointer;
`;

export const buttonStyle = css`
  ${buttonInit};
  border: 2px solid var(--black);
  background-color: var(--gray-100);
  position: relative;
  display: block;
  padding: var(--base-unit) var(--space-md);
  font-size: var(--text-01);
  border-radius: 4px;
  text-align: center;
  box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset, 1px 1px 0px rgba(255, 255, 255, 0.25) inset,
    0px 0px 2px rgba(0, 0, 0, 0.25);
  text-decoration: none !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${media.hover`
    text-decoration: none !important;
  `}
`;

export const pixelScaleImage = css`
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;
