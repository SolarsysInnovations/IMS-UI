import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userRole } from '../../constants/data';
import { Roles } from '../../constants/Enums';

interface ValueProps {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  options: ValueProps[];
  labelText?: string;
  value?: ValueProps | null;
  onChange: (value: ValueProps | null) => void;
  error?: boolean;
  helperText?: any;
  width?: string;
  button?: boolean;
  onMouseDown?: () => void;
  defaultValue?: any;
  applySmallSizeStyle?: boolean;
  required?: boolean;
  disabled?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

export default function SelectDropdown({
  applySmallSizeStyle = false,
  defaultValue,
  disabled,
  onMouseDown,
  button,
  width,
  error,
  helperText,
  options,
  value,
  labelText,
  required,
  variant,
  onChange
}: SelectDropdownProps) {
  return (
    <Autocomplete

      disabled={disabled}
      defaultValue={defaultValue}
      size='small'
      disablePortal
      id="combo-box-demo"
      options={options}
      value={value || null}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      sx={{
        ...(applySmallSizeStyle && {
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            paddingTop: "0px",
            paddingBottom: "1px",
            paddingLeft: "6px",
            width: "130px",
          },
        }),
        width: `${width}`,
        borderRadius: "8px",
        '& .MuiOutlinedInput-root': {
          borderRadius: "8px",
          overflow: "hidden",
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
          '&:hover': {
            backgroundColor: `action.hover`,
          },
        },
        "& .MuiFormLabel-root": {
          fontSize: "12px"
        },
        '& .MuiAutocomplete-input': {
          fontSize: "12px"
        },
        '& .css-144qjki-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: "12px"
        },
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          required={required}
          variant='outlined'
          sx={{ fontSize: "12px !important" }}
          label={labelText}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} style={{
          backgroundColor: option.value === value?.value ? '#e3f2fd' : 'inherit',
          fontWeight: option.value === value?.value ? 'bold' : 'normal',
          padding: '8px', // Adjust padding to make sure text is visible
        }}>
          <Typography
            sx={{
              fontSize: "12px",
            }}
          >
            {option.label}
          </Typography>
        </li>
      )}
      PaperComponent={({ children }) => (
        <Paper>
          {children}
          {button && (
            <Button
              color="primary"
              fullWidth
              sx={{ justifyContent: "flex-start", pl: 2 }}
              onMouseDown={onMouseDown}
            >
              {(Roles.STANDARDUSER !== userRole) ? "+ Add New" : ""}
            </Button>
          )}
        </Paper>
      )}
    />
  );
}
