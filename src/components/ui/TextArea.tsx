import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface TextAreaUiProps {
  label?: string;
  helperText?: string | undefined | boolean;
  rows?: number;
  defaultValue?: string;
  size?: "small" | "medium" | undefined;
  error?: boolean | undefined;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; variant?: "outlined" | "standard" | "filled";
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "password" | "number" | "email" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color";
}
export default function TextAreaUi({ type, error, disabled = false, required = false, variant, onChange, value, size, defaultValue, label, helperText, rows }: TextAreaUiProps) {
  return (
    <Box
      component="form"
      sx={{
        borderRadius: "8px !important",
        '& .MuiOutlinedInput-root': {
          fontSize: "13px",
          borderRadius: "8px !important",
          overflow: "hidden",
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
          '&:hover': {
            backgroundColor: `action.hover`,
          },
        },
        '& .css-144qjki-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: "13px",
        },
        '& .css-100yy4f-MuiInputBase-root-MuiInput-root': {
          fontSize: "13px",
        },
        '& .css-1i1n0be-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: "13px",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type={type}
        disabled={disabled}
        required={required}
        onChange={onChange}
        size={size || "small"}
        helperText={helperText}
        error={error}
        fullWidth
        id="outlined-basic" label={label}
        variant={variant || "outlined"}
        multiline
        rows={rows}
        defaultValue={defaultValue}
        value={value}
      />
    </Box>
  );
}