import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  styles: {
    // global: {
    //   body: {
    //     background: randomDesktopImageCss,
    //   },
    // },
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
      baseStyle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        position: 'relative',
      },
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
          // for icons
          svg: {
            path: {
              fill: 'black',
            }
          },
          _hover: {
            backgroundColor: 'var(--hover-bg)',
            color: '#fff',
            textDecoration: 'none',
            // for icons
            svg: {
              path: {
                fill: '#fff',
              }
            },
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
          svg: {
            path: {
              fill: 'black',
            }
          },
          _hover: {
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
            svg: {
              path: {
                fill: '#fff',
              }
            },
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
        small: {
          table: {
            fontSize: 'var(--text-small)',
            width: '100%',
          },
          td: {
            padding: '2px',
            _first: {
              width: '25%',
            },
          },
        },
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
