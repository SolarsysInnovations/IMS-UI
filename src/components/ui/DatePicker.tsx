import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { validateDate } from '@mui/x-date-pickers/internals';

interface DatePickerProps {
    value?: any;
    onChange: (value: any) => void;
    label?: string;
}

export default function DatePickerUi({ label, value, onChange }: DatePickerProps) {

    const formatDate = (date: any) => {
        return date.format('DD-MM-YYYY');
    };
    const parseDate = (value: any) => {
        return dayjs(value, 'DD-MM-YYYY');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker

                value={value ? parseDate(value) : null}
                onChange={(date) => onChange(formatDate(date))}
                onError={(date) => {
                    const currentDate = dayjs();
                    const selectedDate = dayjs(date);
                    if (selectedDate.isBefore(currentDate, 'day')) {
                        return "Selected date cannot be before today";
                    }
                    return null;
                }}
                format='DD-MM-YYYY'
                views={['year', 'month', 'day']}
                sx={{
                    width: "100%",
                    '& .MuiOutlinedInput-root': {
                        fontSize: "12px",
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
                    " & .MuiOutlinedInput-root": {
                        fontSize: "12px"
                    }
                }}
                slotProps={{
                    textField: {
                        variant: "outlined", size: "small",
                    }
                }}
                label={label}
            />

        </LocalizationProvider>
    );
}
