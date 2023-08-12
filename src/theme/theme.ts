import { font } from "@/theme/font";
import { grey } from "@/theme/greys";
import { ThemeOptions, createTheme } from "@mui/material/styles";

const PRIMARY = "#ff4c7a";
const SECONDARY = "#00e19e";

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "inherit",
  },
  palette: {
    mode: "dark",
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: grey["100"],
      paper: grey["500"],
    },
    grey,
  },
  shape: {
    borderRadius: 8,
  },
  transitions: {
    duration: {
      shortest: 25,
      shorter: 50,
      short: 100,
      // most basic recommended timing
      standard: 150,
      // this is to be used in complex animations
      complex: 150,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          minWidth: "100px",
          borderRadius: "25px",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: {
          style: {
            display: "none",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderTopLeftRadius: theme.spacing(1),
          borderTopRightRadius: theme.spacing(1),
          borderColor: "white",
          borderStyle: "solid",
          borderBottomWidth: "2px",
          "&.Mui-selected": {
            borderWidth: "2px",
            borderBottomWidth: "0px",
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
};

export const theme = createTheme(themeOptions);
