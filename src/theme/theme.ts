// theme.ts
import { alpha } from "@mui/material";
import { createTheme, filledInputClasses, inputLabelClasses, outlinedInputClasses, paperClasses, tableCellClasses } from "@mui/material";
import { common } from "@mui/material/colors";
import { error, info, neutral, success, warning } from "./colors";

const palette = {
  action: {
    active: neutral[500],
    disabled: alpha(neutral[900], 0.38),
    disabledBackground: alpha(neutral[900], 0.12),
    focus: alpha(neutral[900], 0.16),
    hover: alpha(neutral[900], 0.04),
    selected: alpha(neutral[900], 0.12),
  },
  background: {
    default: common.white,
    paper: common.white,
  },
  divider: "#F2F4F7",
  error,
  info,
  mode: "light",
  neutral,
  primary: {
    lightest: "#F5F7FF",
    light: "#EBEEFE",
    main: "#6366F1",
    dark: "#4338CA",
    darkest: "#312E81",
    contrastText: "#FFFFFF",
  },
  success,
  text: {
    primary: neutral[900],
    secondary: neutral[500],
    disabled: alpha(neutral[900], 0.38),
  },
  warning,
};

const muiTheme = createTheme();

const theme = createTheme({
  palette: {
    mode: 'light',
    common: {

    },
    primary: {
      light: "#9DA4AE",
      main: "#6366F1",
      dark: "#4338CA",
      contrastText: "#FFFFFF",

    },
    secondary: {
      main: '#f50057',
      dark: "#4338CA",
      contrastText: "#FFFFFF",
    },
    error: {
      // lightest: "#FEF3F2",
      light: "#FEE4E2",
      main: "#F04438",
      dark: "#B42318",
      // darkest: "#7A271A",
      contrastText: "#FFFFFF",
    },
    warning: {
      // lightest: "#FFFAEB",
      light: "#FEF0C7",
      main: "#F79009",
      dark: "#B54708",
      // darkest: "#7A2E0E",
      contrastText: "#FFFFFF",
    },
    info: {
      // lightest: "#ECFDFF",
      light: "#CFF9FE",
      main: "#06AED4",
      dark: "#0E7090",
      // darkest: "#164C63",
      contrastText: "#FFFFFF",
    },
    success: {
      // lightest: "#F0FDF9",
      light: "#3FC79A",
      main: "#10B981",
      dark: "#0B815A",
      // darkest: "#134E48",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#F8F9FA",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D2D6DB",
      400: "#9DA4AE",
      500: "#6C737F",
      600: "#4D5761",
      700: "#2F3746",
      800: "#1C2536",
      900: "#111927",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161",
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
    },
    action: {
      active: "#bdbdbd",
      hover: "#F3F4F6",
      hoverOpacity: 0.04,
      selected: "#FFFFFF",
      selectedOpacity: 0.08,
      disabled: "#e0e0e0",
      disabledBackground: "#FFFFFF",
      disabledOpacity: 0.10,
      focus: "#F3F4F6",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    }
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      // fontSize: "0.875rem",
      fontSize: "0.800rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },



    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    h1: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h6: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "1.125rem",
      lineHeight: 1.2,
    },
  },

  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          // backgroundColor: palette.primary.main,
          // "&:hover": {
          //   backgroundColor: palette.primary.dark,
          // },
          ':disabled': {
            backgroundColor: "#9da4ae8c"
          }
        },

        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: "0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px 16px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          backgroundColor: palette.primary.main,
          height: 3,
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
        },
      },
    },
    // ! -------------- text field start --------------
    // Overrides for MuiInputBase component
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 12, // Setting font size for input text
          fontWeight: 500, // Setting font weight for input text
          lineHeight: "24px", // Setting line height for input text
          "&::placeholder": {
            color: palette.text.secondary, // Placeholder text color
            opacity: 1, // Full opacity for placeholder text
          },
        },
      },
    },
    // Overrides for MuiInput component
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 12, // Setting font size for input text
          fontWeight: 500, // Setting font weight for input text
          lineHeight: "24px", // Setting line height for input text
          "&::placeholder": {
            color: palette.text.secondary, // Placeholder text color
          },
        },

      },
    },
    // Overrides for MuiFilledInput component
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent", // Transparent background
          borderRadius: 8, // Rounded corners
          borderStyle: "solid", // Solid border style
          borderWidth: 1, // Border width
          overflow: "hidden", // Prevent overflow
          borderColor: palette.neutral[200], // Border color
          transition: muiTheme.transitions.create(["border-color", "box-shadow"]), // Transition for border-color and box-shadow
          "&:hover": {
            // backgroundColor: palette.action.hover, // Background color on hover
          },
          "&:before": {
            display: "none", // Removing default underline
          },
          "&:after": {
            display: "none", // Removing default underline
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: "transparent", // Transparent background when disabled
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: "transparent", // Transparent background when focused
            borderColor: palette.primary.main, // Border color when focused
            boxShadow: `${palette.primary.main} 0 0 0 2px`, // Box-shadow when focused
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: palette.error.main, // Border color when error
            boxShadow: `${palette.error.main} 0 0 0 2px`, // Box-shadow when error
          },
        },
        input: {
          fontSize: 12, // Setting font size for input text
          fontWeight: 500, // Setting font weight for input text
          lineHeight: "24px", // Setting line height for input text
        },
      },
    },
    // Overrides for MuiOutlinedInput component
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover": {
            // backgroundColor: palette.action.hover, // Background color on hover
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.neutral[500], // Border color on hover
            },
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: "transparent", // Transparent background when focused
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.primary.main, // Border color when focused
              boxShadow: `${palette.primary.main} 0 0 0 2px`, // Box-shadow when focused
            },
          },
          [`&.${outlinedInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.error.main, // Border color when error
              boxShadow: `${palette.error.main} 0 0 0 2px`, // Box-shadow when error
            },
          },
        },
        input: {
          fontSize: 12, // Setting font size for input text
          fontWeight: 500, // Setting font weight for input text
          lineHeight: "24px", // Setting line height for input text
        },
        notchedOutline: {
          borderColor: palette.neutral[200], // Default border color
          transition: muiTheme.transitions.create(["border-color", "box-shadow"]), // Transition for border-color and box-shadow
        },
      },
    },
    // Overrides for MuiFormLabel component
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 12, // Setting font size for label text
          fontWeight: 500, // Setting font weight for label text
          [`&.${inputLabelClasses.filled}`]: {
            transform: "translate(12px, 18px) scale(1)", // Positioning label for filled input
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: "translate(0, -1.5px) scale(0.85)", // Positioning label when input is standard and shrunk
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: "translate(12px, 6px) scale(0.85)", // Positioning label when input is filled and shrunk
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: "translate(14px, -9px) scale(0.85)", // Positioning label when input is outlined and shrunk
            },
          },
        },
      },
    },
    // Overrides for MuiSelect component
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: 12, // Setting font size for select text
          fontWeight: 500, // Setting font weight for select text
          lineHeight: "24px", // Setting line height for select text
        },
        select: {
          fontSize: 12, // Setting font size for select text
          fontWeight: 500, // Setting font weight for select text
          lineHeight: "24px", // Setting line height for select text
        },
              },
    },
    // Overrides for MuiTextField component
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 12, // Setting font size for text field text
          fontWeight: 500, // Setting font weight for text field text
          lineHeight: "24px", // Setting line height for text field text
        },
      },
    },
    // ! ------------ text field end ui ---------------
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: "none",
          "& + &": {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: palette.divider,
          padding: "15px 16px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            backgroundColor: palette.neutral[50],
            color: palette.neutral[700],
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    // MuiTextField: {
    //   defaultProps: {
    //     variant: "filled",
    //   },
    // },
  },
});

export default theme;
