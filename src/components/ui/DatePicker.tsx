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
    sx?: object;
}

export default function DatePickerUi({
    label,
    value,
    disabled,
    required,
    onChange,
    sx,
}: DatePickerProps) {
    const [dateValue, setDateValue] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (value) {
            const parsedDate = typeof value === "string" ? dayjs(value, "DD-MM-YYYY") : value;
            if (parsedDate.isValid()) {
                setDateValue(parsedDate);
            } else {
                setDateValue(null);
            }
        } else {
            setDateValue(null);
        }
    }, [value]);

    const handleDateChange = (date: Dayjs | null) => {
        setDateValue(date);
        onChange(date ? date.format("DD-MM-YYYY") : ""); // Send formatted date
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                disabled={disabled}
                value={dateValue}
                onChange={handleDateChange}
                views={["year", "month", "day"]}
                label={label}
                format="DD-MM-YYYY"
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        fontSize: "12px",
                        borderRadius: "8px !important",
                    },
                    "& .MuiFormLabel-root": {
                        fontSize: "12px",
                    },
                }}
                slotProps={{
                    textField: {
                        variant: "outlined",
                        size: "small",
                    },
                }}
            />
        </LocalizationProvider>
    );
}

