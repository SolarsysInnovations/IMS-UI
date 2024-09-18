import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface MultiSelectUiProps {
    options?: any[];
    getOptionLabel?: (option: any) => string;
    defaultValue?: any[];
    label?: string;
    value?: any[] | undefined; // Define value prop
    onChange: (event: any, value: any[]) => void; // Update the value type in onChange
    error?: boolean | undefined;
    helperText?: any;
}

const MultiSelectUi: React.FC<MultiSelectUiProps> = ({
    options,
    getOptionLabel,
    defaultValue = [],
    label = "Select",
    value = [], // Default value to an empty array
    onChange,
    error,
    helperText,
}) => {
    const selectedValues = Array.isArray(value)
        ? value.map(item => ({ value: item.value, label: item.value }))
        : [];

    return (
        <Autocomplete
            sx={{
                borderRadius: "8px !important",
                fontSize: "12px",
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
                    fontSize: "12px"
                },
                '& .css-144qjki-MuiFormLabel-root-MuiInputLabel-root': {
                    fontSize: "12px"
                },
                '& .css-1pnrxdh-MuiButtonBase-root-MuiChip-root': {
                    fontSize: "12px"
                },
                "& .css-ih149s-MuiFormControl-root-MuiTextField-root" : {
                    height : "34px !important",
                }
                    
            }}
            multiple
            id="tags-outlined"
            options={options || []}
            getOptionLabel={getOptionLabel}
            defaultValue={defaultValue}
            value={selectedValues} // Pass selectedValues instead of value prop directly
            onChange={(event, value) => onChange(event, value || [])} // Handle clear event
            // limitTags={3}
            filterSelectedOptions
            size='small'
            renderInput={(params) => (
                <TextField
                    error={error} helperText={helperText}
                    sx={{ fontSize: "12px !important" }}
                    variant='outlined'
                    {...params}
                    label={label}
                    placeholder="search"
                />
            )}
        />
    );
}

export default MultiSelectUi;
