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