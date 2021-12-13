import { createTheme } from '@material-ui/core/styles'
const theme = createTheme(
  {
    typography: {
      "fontFamily": "\"'Noto Sans', sans-serif\"",
      "fontWeightBold": 100,
      "fontWeightMedium": 100,
      "fontWeightLight": "lighter",
    },
    palette: {
      background: {
        default: '#EEE',
      },
      primary: {
        main: "#111",
        dark: "#FFFFFF",
        light: "#111"
      },
      secondary: {
        main: "#777777"
      },
      text: {
        primary: "#333",
        secondary: "#666"
      },
    },
  }
)
export default theme