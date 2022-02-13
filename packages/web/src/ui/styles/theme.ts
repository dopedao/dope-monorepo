import { extendTheme } from '@chakra-ui/react';
import { withTheme } from '@emotion/react';

const desktopImageCss = [
  "#000000 url('/images/desktop/TONY.gif') center center / contain repeat-y fixed",
  "#d10913 url('/images/desktop/LAMBO.png') center center / cover repeat-y fixed",
  "#1d261c url('/images/desktop/limo-chopper.png') center / cover repeat-y",
  "#5f3084 url('/images/desktop/PAPER.png') center / 512px repeat",
  "#202221 url('/images/hustler/street_scene.png') center / cover no-repeat fixed",
  "#202221 url('/images/dope-wars-stacked-logo.png') center / 400px no-repeat fixed",
  "#202221 url('/images/dope-wars-smiley.png') center / 400px no-repeat fixed",
  "#000 url('/images/desktop/the-crew.jpg') center / cover no-repeat fixed",
  "#202221 url('/images/desktop/cny/kid_car.jpg') center / cover repeat fixed",
  "#000 url('/images/desktop/cny/chinatown_illustration.jpg') center / contain repeat-y fixed",
  "#333 url('/images/game/map/full.png') center / cover no-repeat fixed",
  "#333 url('/images/game/map/nyc-hustler-walk.gif') center / cover no-repeat fixed",
  // "#000000 url('/images/desktop/cny/dragon_dance.jpg') center center / contain repeat fixed",
  // "#202221 url('/images/desktop/cny/dragon.jpg') center / contain repeat-y fixed",
  // "#202221 url('/images/desktop/cny/tiger.jpg') center / contain repeat-x",
  // "#202221 url('/images/desktop/cny/fireworks_2.png') center / 1024px repeat",
  // "#202221 url('/images/desktop/cny/fireworks_1.gif') center / 512px repeat",
  // "#202221 url('/images/desktop/cny/dragon_hanging.png') center / 512px repeat",
  // "#202221 url('/images/desktop/cny/lanterns.png') center / cover repeat",
  // "#202221 url('/images/desktop/cny/lanterns_2.png') center / contain repeat",
  // "#202221 url('/images/desktop/cny/lanterns_3.png') center / cover repeat",
  // "#202221 url('/images/desktop/cny/overhead.png') center / cover repeat",

];
const randomImageIndex = Math.floor(Math.random() * desktopImageCss.length);
const randomDesktopImageCss = desktopImageCss[randomImageIndex];

export default extendTheme({
  styles: {
    global: {
      body: {
        background: randomDesktopImageCss,
      },
    },
  },
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    gray: {
      50: '#f7fafc',
      900: '#171923',
    },
  },
  components: {
    Input: {
      // There seems to be a bug with Chakra theme overriding
      // https://github.com/chakra-ui/chakra-ui/issues/2347
      // Found success setting variant="something-that-doesnt-exist"
      baseStyle: {
        field: {
          borderColor: '#000',
          borderWidth: '1px',
          background: '#fff',
          color: '#000',
          _placeholder: {
            color: '#878783',
          },
        },
      },
    },
    Button: {
      variants: {
        navBar: {
          display: 'flex',
          gap: '8px',
          fontSize: 'var(--text-small)',
          fontWeight: '400',
          color: 'white',
          _hover: {
            textDecoration: 'none',
          },
        },
        solid: {
          background: '#EDEFEE',
          border: '2px solid #000000',
          borderRadius: '4px',
          padding: '8px 12px',
          height: '32px',
          boxShadow:
            'inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)',
          fontSize: '1em',
          lineHeight: '1em',
          fontWeight: '400',
          _hover: {
            backgroundColor: 'var(--hover-bg)',
            color: '#fff',
            textDecoration: 'none',
          },
          _disabled: {
            _hover: {
              color: '#000',
            },
          },
        },
        linkBlack: {
          boxShadow: 'none',
          textShadow: 'none',
          outline: '0px',
          fontWeight: 'normal',
          color: '#000000',
          fontSize: '1em',
          width: 'auto',
          display: 'inline-block',
        },
        cny: {
          backgroundColor: 'var(--new-year-red)',
          color: '#ffffff',
          textShadow: '1px 1px 0px rgba(0, 0, 0, 0.66)',
          border: '2px solid #000000',
          borderRadius: '4px',
          padding: '8px 12px',
          height: '32px',
          boxShadow:
            'inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)',
          fontSize: '1em',
          lineHeight: '1em',
          fontWeight: '400',
          width: '100%',
          _hover: {
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
          },
          _disabled: {
            _hover: {
              backgroundColor: '#000 !important',
              color: '#fff',
              textDecoration: 'none',
            },
          },
        },
        primary: {
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          textShadow: '1px 1px 0px rgba(0, 0, 0, 0.66)',
          border: '2px solid #000000',
          borderRadius: '4px',
          padding: '8px 12px',
          height: '32px',
          boxShadow:
            'inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)',
          fontSize: '1em',
          lineHeight: '1em',
          fontWeight: '400',
          _hover: {
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
          },
          _disabled: {
            _hover: {
              backgroundColor: '#000 !important',
              color: '#000',
            },
          },
        },
      },
    },

    Table: {
      variants: {
        dope: {
          table: {
            borderCollapse: 'separate',
            tableLayout: 'fixed',
          },
          thead: {
            th: {
              position: 'sticky',
              top: 0,
              borderBottom: '2px solid #000',
              height: '44px',
            },
          },
          tfoot: {
            th: {
              position: ['auto', 'sticky'],
              bottom: '-1px',
              borderTop: '2px solid #000',
              textAlign: 'center',
              height: '44px',
              boxShadow: 'none',
              padding: '2px 16px',
              fontSize: '0.8em',
            },
          },
          th: {
            height: '34px',
            background: '#DEDEDD',
            textAlign: 'center',
            verticalAlign: 'middle',
            textShadow: 'none',
            padding: ['0px', '4px 8px'],
            whiteSpace: 'nowrap',
            boxShadow:
              'inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)',
            ':not(:last-child)': {
              borderRight: '2px solid #000',
            },
          },
          td: {
            padding: 0,
            verticalAlign: 'middle',
            textAlign: 'center',
            height: '40px',
          },
          tr: {
            cursor: 'pointer',
            background: '#EDEFEE',
            textAlign: 'center',
            _odd: {
              background: '#fff',
            },
            '&.selected': {
              background: 'var(--primary)',
              color: '#fff',
              path: {
                fill: '#fff',
              },
            },
          },
        },
      },
    },
  },
});
