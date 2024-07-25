import { InputAdornment, TextField, filledInputClasses, inputLabelClasses, outlinedInputClasses } from "@mui/material";
import React, { } from "react";

interface TextFieldProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: boolean | undefined;
  helperText?: string | undefined | boolean;
  name?: string;
  type?: string;
  fullWidth?: boolean;
}

const TextFieldLarge = ({ label, value, onChange, disabled, endAdornment, startAdornment, error, helperText, name, type, fullWidth }: TextFieldProps) => {

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={error}
      helperText={helperText}
      name={name}

      type={type}
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position='start'>{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position='end'>{endAdornment}</InputAdornment>
        ) : undefined,
      }}

      sx={{
        '& .MuiInputBase-root': {
          '&::placeholder': {
            opacity: 1,
          },
        },
        '& .MuiInputBase-input': {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
          '&::placeholder': {
            color: `text.secondary`,
          },
        },
        '& .MuiFilledInput-root': {
          backgroundColor: "transparent",
          borderRadius: "8px !important",
          borderStyle: "solid",
          borderWidth: 1,
          overflow: "hidden",
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
          '&:hover': {
            backgroundColor: `action.hover`,

          },
          '&:before': {
            display: "none",
          },
          '&:after': {
            display: "none",
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: "transparent",
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: "transparent",
            borderWidth: 2,
            boxSizing: "content-box",
            borderColor: `primary.main`,
            '& .MuiTypography-root': {
              color: "#6366F1",
            },
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: ` error.main`,
            boxShadow: `error.main 0 0 0 2px`,
          },
        },
        '& .MuiOutlinedInput-root': {
          '&:hover': {
            // borderWidth: 4,
            outlineColor: `primary.main`,
            outlineWidth: 4,
            backgroundColor: `action.hover`,
            '& .MuiOutlinedInput-notchedOutline': {
              // borderColor: `primary.main`,
            },
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: "transparent",
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `primary.main`,
              boxShadow: `primary.main 0 0 0 2px`,
            },
          },
          [`&.${outlinedInputClasses.error}`]: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `error.main`,
              boxShadow: `error.main 0 0 0 2px`,
            },
          },
        },
        '& .MuiFormLabel-root': {
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.filled}`]: {
            transform: "translate(12px, 18px) scale(1)",
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: "translate(0, -1.5px) scale(0.85)",
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: "translate(12px, 6px) scale(0.85)",
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: "translate(14px, -9px) scale(0.85)",
            },
          },
        },
      }}
    />

  );
};

export default TextFieldLarge;
