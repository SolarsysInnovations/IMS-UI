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

const TextFieldUi = ({ label, value, onChange, disabled, endAdornment, startAdornment, error, helperText, name, type, fullWidth }: TextFieldProps) => {

    return (
        <TextField
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
            }}


        />

    );
};

export default TextFieldUi;
