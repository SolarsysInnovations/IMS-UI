import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
}

export default function SelectDropdown({ error, helperText, options, value, labelText, onChange }: SelectDropdownProps) {
  return (
    <Autocomplete
      sx={{
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
        '& .MuiAutocomplete-input': {
          fontSize: "13px"
        },
        '& .css-144qjki-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: "13px"
        }
      }}
      size='small'
      disablePortal
      id="combo-box-demo"
      options={options}

      value={value || null} // Update the type of value prop
      onChange={(event, newValue) => {
        onChange(newValue); // Pass the selected value to the parent component
      }}
      renderInput={(params) => <TextField error={error} helperText={helperText} sx={{ fontSize: "13px !important" }} variant='outlined' {...params} label={labelText} />}
    />
  );
}
