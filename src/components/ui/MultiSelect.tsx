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
    label = "Favorites",
    value = [], // Default value to an empty array
    onChange,
    error,
    helperText,
}) => {
    // Ensure that the value prop is always an array
    const selectedValues = Array.isArray(value)
        ? value.map(item => ({ value: item.value, label: item.value }))
        : [];
    console.log("Selected values:", selectedValues);

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
                },
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
                    sx={{ fontSize: "13px !important" }}
                    variant='outlined'
                    {...params}
                    label={label}
                    placeholder="Favorites"
                />
            )}
        />
    );
}

export default MultiSelectUi;
