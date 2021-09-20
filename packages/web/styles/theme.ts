import { extendTheme } from "@chakra-ui/react"

const desktopImageCss = [
  "#000000 url('/images/desktop/TONY.gif') center center / contain repeat-y fixed",
  "#d10913 url('/images/desktop/LAMBO.png') center center / cover repeat-y fixed",
  "#5f3084 url('/images/desktop/PAPER.png') center / 512px repeat",
  "#202221 url('/images/dope-wars-stacked-logo.png') center / 400px no-repeat fixed",
  "#202221 url('/images/dope-wars-smiley.png') center / 400px no-repeat fixed",
]
const randomImageIndex = Math.floor(Math.random() * desktopImageCss.length);
const randomDesktopImageCss = desktopImageCss[randomImageIndex];

export default extendTheme({
  styles: {
    global: {
      body: {
        background: randomDesktopImageCss
      },
    },
  },
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    gray: {
      50: "#f7fafc",
      900: "#171923",
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          background: "#EDEFEE",
          border: "2px solid #000000",
          borderRadius: "4px",
          boxShadow: "inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)",
          height: "28px",
          fontSize: "12px",
          fontWeight: "400",
        }
      }
    },
    Table: {
      variants: {
        dope: {
          thead: {
            borderBottom: "2px solid #000",
          },
          th: {
            height: "34px",
            background: "#DEDEDD",
            textAlign: "center",
            verticalAlign: "middle",
            padding: 0,
            boxShadow: "inset -3px -3px 0px rgba(0, 0, 0, 0.25), inset 3px 3px 0px rgba(255, 255, 255, 0.25)",
            ':not(:last-child)': {
              borderRight: "2px solid #000",
            }
          },
          td: {
            padding: 0,
            verticalAlign: "middle",
            fontSize: "13px",
            textAlign: "center",
            height: "40px",
          },
          tr: {
            cursor: "pointer",
            background: "#EDEFEE",
            textAlign: "center",
            _odd: {
              background: "#fff"
            },
            '&.selected': {
              background: "#3523FE",
              color: "#fff",
              path: {
                fill: "#fff"
              }
            }
          }
        }
      }
    }
  }
})