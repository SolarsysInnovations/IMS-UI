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
}

export default function SelectDropdown({ onMouseDown, button, width, error, helperText, options, value, labelText, onChange }: SelectDropdownProps) {
  return (
    <Autocomplete
      sx={{
        width: `${width}`,
        borderRadius: "8px !important",
        '& .MuiOutlinedInput-root': {
          borderRadius: "8px !important",
          overflow: "hidden",
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
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
      
      size='small'
      disablePortal
      id="combo-box-demo"
      options={options}
      value={value || null} // Update the type of value prop
      onChange={(event, newValue) => {
        onChange(newValue); // Pass the selected value to the parent component
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField error={error} helperText={helperText} sx={{ fontSize: "12px !important" }} variant='outlined' {...params} label={labelText} />}

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


