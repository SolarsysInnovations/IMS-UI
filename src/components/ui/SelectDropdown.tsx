import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ValueProps {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  options: ValueProps[];
  labelText?: string;
  value?: ValueProps | null; // Change the type of value prop
  onChange: (value: ValueProps | null) => void; // Add onChange event handler
  error?: boolean | undefined;
  helperText?: string | undefined | boolean;
  width?: string;
  button?: boolean;
  onMouseDown?: () => void;
  defaultValue?: any;
  applySmallSizeStyle?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export default function SelectDropdown({ applySmallSizeStyle = false, defaultValue, disabled, onMouseDown, button, width, error, helperText, options, value, labelText, required, onChange }: SelectDropdownProps) {
  return (
    <Autocomplete
      sx={{

        ...(applySmallSizeStyle && {
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            paddingTop: "0px",
            paddingBottom: "1px",
            paddingLeft: "6px",
            width: "110px",
          },
        }),

        width: `${width}`,
        borderRadius: "8px !important",
        '& .MuiOutlinedInput-root': {
          borderRadius: "8px !important",
          overflow: "hidden",
          borderColor: `action.active`,
          transition: `border-color 0.2s, box-shadow 0.2s,`,
          '&:hover': {
            backgroundColor: `action.hover`,
          },
        },
        " & .MuiFormLabel-root": {
          fontSize: "12px"
        },
        '& .MuiAutocomplete-input': {
          fontSize: "12px"
        },
        '& .css-144qjki-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: "12px"
        },

      }}
      disabled={disabled}
      defaultValue={defaultValue}
      size='small'
      disablePortal
      id="combo-box-demo"
      options={options}
      value={value || null} // Update the type of value prop
      onChange={(event, newValue) => {
        onChange(newValue); // Pass the selected value to the parent component
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField error={error} helperText={helperText} required={required} sx={{ fontSize: "12px !important" }} variant='outlined' {...params} label={labelText} />}

      PaperComponent={({ children }) => {
        return (
          <Paper>
            {children}
            {button && (
              <Button
                color="primary"
                fullWidth
                sx={{ justifyContent: "flex-start", pl: 2 }}
                onMouseDown={onMouseDown}
              >
                + Add New
              </Button>
            )}
          </Paper>
        );
      }}
    />
  );
}


