import { Global, css } from '@emotion/react';
import { media, buttonStyle } from './mixins';
import { returnBreakpoint } from './breakpoints';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          @font-face {
            font-family: 'ChicagoFLF';
            src: url('/fonts/ChicagoFLF.ttf');
            font-style: normal;
          }

          /* COLORS */
          --black: #000;
          --white: #fff;
          --gray: #dededd;
          --bg-color: #000;
          --overlay: rgba(0, 0, 0, 0.85);
          --overlay-light: rgba(0, 0, 0, 0.35);
          --border-black: 1px solid var(--black);
          --border-light: 1px solid #dbdbdb;

          /* FONTS */
          --font-a: ChicagoFLF, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
            Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
          --font-b: Courier, monospace;

          /* SPACING */
          --base-unit: 8px;
          --space-sm: calc(var(--base-unit) * 2);
          --space-md: calc(var(--base-unit) * 3);
          --space-lg: calc(var(--base-unit) * 5);

          /* TYPOGRAPHY */
          --text-01: 1.125em;
          --text-02: 1.25em;
          --text-03: 1.5em;
          --text-04: 2em;
          --text-05: 2.25em;

          /* LAYOUT */
          --header-z: 100;
          --content-width-md: 960px;
          --content-width-lg: ${returnBreakpoint('desktop')};
          --content-width-xl: ${returnBreakpoint('xl')};
        }

        /* MEDIA QUERY MIXIN */
        ${media.laptop`
          :root {
            --base-unit: 10px;
            --text-05: calc(var(--base-unit) * 6);
          }
        `}

        ${media.xl`
          :root {
            --base-unit: 11px;
            --text-05: calc(var(--base-unit) * 7);
          }
        `}

        /* DEFAULTS */
        // Make sure Next.js page and everything inside is 100% height
        html,
        body,
        main,
        body > div:first-of-type,
        div#__next,
        div#__next > div {
          height: 100%;
        }

        html,
        body {
          overscroll-behavior-y: none;
        }

        body {
          background-color: var(--bg-color);
          font-size: 14px;
        }

        body.wait,
        body.wait * {
          cursor: wait;
        }

        /* LAYOUT */
        body * {
          font-family: var(--font-a) !important;
        }

        main {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        header,
        footer {
          font-size: var(--text-02);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          a {
            text-decoration: none;
            color: var(--black);
            &.active {
              text-decoration: underline;
            }
            ${media.hover`
              text-decoration: underline;
            `}
          }
        }

        /* TYPOGRPAHY */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          clear: both;
        }
        h1 {
          font-size: var(--text-05) !important;
          line-height: 1;
          margin-bottom: 0.5em !important;
        }
        h2 {
          font-size: var(--text-03) !important;
        }
        h3 {
          font-size: var(--text-02) !important;
        }
        h4 {
          font-weight: 900 !important;
        }
        a {
          font-weight: 400;
        }
        a.textLink,
        .markdownContainer a {
          text-decoration: underline !important;
          color: #3523fe !important;
        }
        p,
        ol,
        ul {
          padding-bottom: var(--space-sm);
          line-height: 1.5;
        }

        /* CUSTOM */
        .button {
          ${buttonStyle};
        }
      `}
    />
  );
}
