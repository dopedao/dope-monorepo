import { extendTheme } from "@chakra-ui/react"

export default extendTheme({
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
          table: {
            border: "2px solid #000",
          },
          thead: {
            border: "2px solid #000",
            height: "28px",
            fontSize: "14px",
          },
          th: {
            background: "#DEDEDD",
            padding: "5px 0",
            textAlign: "center",
            boxShadow: "inset -3px -3px 0px rgba(0, 0, 0, 0.25), inset 3px 3px 0px rgba(255, 255, 255, 0.25)",
            borderRight: "2px solid #000",
          },
          td: {
            textAlign: "center",
          },
          tr: {
            height: "32px",
            background: "#EDEFEE",
            _odd: {
              background: "#fff"
            }
          }
        }
      }
    }
  }
})