import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerUi() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker sx={{
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
                }} slotProps={{ textField: { variant: "outlined", size: "small" } }} label="Basic date picker" />
            </DemoContainer>
        </LocalizationProvider>
    );
}