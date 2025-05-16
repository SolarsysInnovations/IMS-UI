import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface TextFieldProps {
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: boolean | undefined;
  helperText?: any;
  name?: string;
  type:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color';
  fullWidth?: boolean;
  required?: boolean;
  width?: string;
  sx?: any;
}

const TextFieldUi = ({
  sx,
  width,
  required,
  label,
  value,
  onChange,
  disabled,
  endAdornment,
  startAdornment,
  error,
  helperText,
  name,
  type,
  fullWidth,
  onPaste,
}: TextFieldProps) => {
  return (
    <TextField
      required={required}
      variant="outlined"
      size="small"
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={error}
      helperText={helperText}
      name={name}
      type={type}
      fullWidth={fullWidth || true}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
      }}
      inputProps={{
        onPaste: onPaste, // Apply onPaste directly to the input element
      }}
      sx={{
        width: `${width}`,
        borderRadius: '8px !important',
        '& .MuiOutlinedInput-root': {
          ...sx,
          borderRadius: '8px !important',
          overflow: 'hidden',
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
        },
        ' & .MuiFormLabel-root': {
          fontSize: '12px',
        },
        ' & .MuiOutlinedInput-root': {
          fontSize: '12px',
        },
        '& .css-1o5h54k-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
          fontSize: '13px',
        },
        '& input:-webkit-autofill': {
          'WebkitBoxShadow': '0 0 0 1000px white inset !important',
          'boxShadow': '0 0 0 1000px white inset !important',
          'WebkitTextFillColor': 'black !important',
        },
      }}
    />
  );
};

export default TextFieldUi;
