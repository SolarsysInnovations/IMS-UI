import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

interface DatePickerProps {
    value?: string | Dayjs;
    onChange: (value: string) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
}

export default function DatePickerUi({ label, value, disabled, required, onChange }: DatePickerProps) {
    const [dateValue, setDateValue] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (typeof value === 'string') {
            if (dayjs(value).isValid()) {
                setDateValue(dayjs(value));
            } else {
                const parsedDate = dayjs(value, 'DD-MM-YYYY');
                if (parsedDate.isValid()) {
                    setDateValue(parsedDate);
                } else {
                    setDateValue(null);
                }
            }
        } else if (dayjs.isDayjs(value)) {
            setDateValue(value);
        } else {
            setDateValue(null);
        }
    }, [value]);

    const formatDate = (date: Dayjs | null): string => {
        return date ? date.format('DD-MM-YYYY') : '';
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                disabled={disabled}
                value={dateValue}
                onChange={(date) => {
                    const formattedDate = formatDate(date);
                    onChange(formattedDate);
                }}
                views={['year', 'month', 'day']}
                label={label}
                format="DD-MM-YYYY" // Set the desired date format here
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
                    "& .MuiFormLabel-root": {
                        fontSize: "12px"
                    },
                }}
                slotProps={{
                    textField: {
                        variant: "outlined", size: "small",
                    }
                }}
            />
        </LocalizationProvider>
    );
}
