import { Global, css } from '@emotion/react';
import { media, buttonStyle } from './mixins';
import { returnBreakpoint } from './breakpoints';

const desktopImageCss = [
  "#000000 url('/images/desktop/TONY.gif') center center / contain repeat-y fixed",
  "#d10913 url('/images/desktop/LAMBO.png') center center / cover repeat-y fixed",
  "#1d261c url('/images/desktop/limo-chopper.png') center / cover repeat-y",
  "#5f3084 url('/images/desktop/PAPER.png') center / 512px repeat",
  "#202221 url('/images/hustler/street_scene.png') center / cover no-repeat fixed",
  "#202221 url('/images/dope-wars-stacked-logo.png') center / 400px no-repeat fixed",
  "#202221 url('/images/dope-wars-smiley.png') center / 400px no-repeat fixed",
  "#333 url('/images/game/map/full.png') center / cover no-repeat fixed",
  "#333 url('/images/game/map/nyc-hustler-walk.gif') center / cover no-repeat fixed",
];
const randomImageIndex = Math.floor(Math.random() * desktopImageCss.length);
const randomDesktopImageCss = desktopImageCss[randomImageIndex];

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

          @font-face {
            font-family: 'Dope-Display';
            src: url('/fonts/Dope-Display.ttf');
            font-style: normal;
          }

          @font-face {
            font-family: 'Dope-Condensed';
            src: url('/fonts/Dope-Condensed.ttf');
            font-style: normal;
          }

          @font-face {
            font-family: 'Dope';
            src: url('/fonts/Dope-Regular.ttf');
            font-style: normal;
          }

          --desktop-background-image: ${randomDesktopImageCss};

          /* COLORS */
          --black: #000;
          --white: #fff;
          --gray-00: #edefee;
          --gray-100: #dededd;
          --gray-200: #bfb9bd;
          --gray-300: #a8a9ae;
          --gray-400: #878783;
          --gray-500: #767674;
          --gray-600: #5d5354;
          --gray-700: #434345;
          --gray-800: #202221;
          --gray-900: #141011;
          --bg-color: #000;
          --hover-bg: #434345;
          --primary: #3523fe;
          --success-green: #9bffcb;
          --new-year-red: #e02514;
          --overlay: rgba(0, 0, 0, 0.85);
          --overlay-light: rgba(0, 0, 0, 0.35);
          --border-black: 1px solid var(--black);
          --border-light: 1px solid #dbdbdb;
          --hustler-background-offwhite: #edefee;
          --hustler-background-blue: #97adcc;
          --hustler-background-gray: #434345;
          --hustler-background-yellow: #f1d8ab;
          --hustler-background-pink: #f2c4c5;
          --hustler-background-green: #b6ccc3;

          /* FONTS */
          --font-a: ChicagoFLF, Dope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
          --font-b: Courier, monospace;

          /* SPACING */
          --base-unit: 8px;
          --space-sm: calc(var(--base-unit) * 2);
          --space-md: calc(var(--base-unit) * 3);
          --space-lg: calc(var(--base-unit) * 5);

          /* TYPOGRAPHY */
          --text-smallest: 0.75em;
          --text-small: 0.9em;
          --text-00: 1em;
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
          background: #202221 url('/images/dope-wars-stacked-logo.png') top / 400px no-repeat fixed !important;
          font-size: 12px;
          ${media.tablet`
            font-size: 14px;
            background: var(--desktop-background-image) !important;
          `}
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
          font-size: var(--text-00);
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
              background-color: var(--hover-bg);
              color: #fff;
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
          line-height: 1 !important;
          margin-bottom: 0.5em !important;
        }
        h2 {
          font-size: var(--text-03) !important;
        }
        h3 {
          font-size: var(--text-02) !important;
        }
        h4 {
          font-size: var(--text-01) !important;
          font-weight: 400 !important;
        }
        a {
          font-weight: 400;
          cursor: pointer;
          cursor: hand;
        }
        a.textLink {
          text-decoration: underline !important;
          color: var(--primary) !important;
        }
        a.primary {
          color: var(--primary);
        }
        ,
        a.cny {
          color: var(--new-year-red);
        }
        ,
        a.underline {
          text-decoration: underline !important;
        }
        ,
        p,
        ol,
        ul {
          padding-bottom: var(--space-sm);
          line-height: 1.5;
        }

        ul.normal {
          list-style-type: square;
          margin-left: 1.5em;
        }

        .small {
          font-size: var(--text-small);
        }
        .smallest {
          font-size: var(--text-smallest);
        }
        em {
          background-color: rgba(255, 252, 63, 0.5);
        }
        /* CUSTOM */
        .button {
          ${buttonStyle};
        }

        .noWrap {
          white-space: nowrap;
        }

        hr.onColor {
          border-top: 2px solid rgba(0, 0, 0, 0.15);
          margin-top: 8px;
          margin-bottom: 16px;
        }

        //  For reservoir dialogs to fix line height
        div[role='dialog'] p {
          padding: 0 !important;
        }

        .markdown {
          background-color: var(--gray-00);
          overflow-y: scroll;
          font-size: 1.33em;
          width: 100%;
          justify-content: center;
          padding: 32px;
          max-width: 786px;
          ${media.tablet`
            font-size: 1.125em;
          `}
          .markdown {
            max-width: 640px;
          }
          p,
          div,
          h2,
          h3,
          h4,
          em,
          strong,
          bold,
          ul,
          li,
          a {
            font-family: Courier, monospace !important;
          }

          a {
            text-decoration: underline !important;
            color: var(--primary) !important;
          }

          h2,
          h3,
          h4 {
            font-weight: 600;
          }
          h2,
          h3 {
            margin-top: 16px;
            margin-bottom: 16px;
          }
          h4 {
            margin-bottom: 8px;
          }
          img[src*='#float-left'] {
            width: 50%;
            float: left;
            margin: 16px;
            margin-left: 0;
          }
          img[src*='#full-bleed'] {
            width: 100%;
            margin-bottom: 16px;
            margin-top: 16px;
          }
          hr {
            border-top: 2px dashed #bfb9bd;
            margin-top: 32px;
            margin-bottom: 32px;
          }
          ul {
            list-style-type: square;
            margin-left: 1.5em;
          }
        }
      `}
    />
  );
}
