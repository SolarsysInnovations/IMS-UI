import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Paper, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
interface ValueProps {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  readonly options: ValueProps[];
  readonly labelText?: string;
  readonly value?: ValueProps | null;
  readonly onChange: (value: ValueProps | null) => void;
  readonly error?: boolean;
  readonly helperText?: any;
  readonly width?: string;
  readonly button?: boolean;
  readonly onMouseDown?: () => void;
  readonly defaultValue?: any;
  readonly applySmallSizeStyle?: boolean;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly variant?: 'outlined' | 'filled' | 'standard';
  readonly sx?: SxProps<Theme>;
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
  sx,
  onChange,
}: SelectDropdownProps) {
  return (
    <Autocomplete
      disabled={disabled}
      defaultValue={defaultValue}
      size="small"
      disablePortal
      id="combo-box-demo"
      options={options}
      value={value || null}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      sx={{
        ...(applySmallSizeStyle && {
          '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
            paddingTop: '0px',
            paddingBottom: '1px',
            paddingLeft: '6px',
            width: '130px',
          },
        }),
        width: `${width}`,
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          overflow: 'hidden',
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
        },
        '& .MuiFormLabel-root': {
          fontSize: '12px',
        },
        '& .MuiAutocomplete-input': {
          fontSize: '12px',
        },
        '& .css-144qjki-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: '12px',
        },
        ...sx,
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          error={error}
          helperText={helperText}
          required={required}
          sx={{ fontSize: '12px !important' }}
          variant="outlined"
          {...params}
          label={labelText}
        />
      )}
      PaperComponent={({ children }) => {
        return (
          <Paper sx={{ '& .MuiAutocomplete-listbox': { fontSize: '13px' } }}>
            {children}
            {button && (
              <Button
                color="primary"
                fullWidth
                sx={{ justifyContent: 'flex-start', pl: 2 }}
                onMouseDown={onMouseDown}
              >
                Add New
              </Button>
            )}
          </Paper>
        );
      }}
    />
  );
}
