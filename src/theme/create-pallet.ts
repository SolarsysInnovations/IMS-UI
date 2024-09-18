import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, indigo, info, neutral, success, warning } from "./colors";

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
  light: "#EBEEFE",
  secondary: "#6366F1",
  success,
  text: {
    primary: neutral[900],
    secondary: neutral[500],
    disabled: alpha(neutral[900], 0.38),
  },
  warning,
};

export default palette;
