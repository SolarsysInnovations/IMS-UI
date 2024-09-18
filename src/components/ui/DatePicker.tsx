import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DatePickerProps {
  value?: Dayjs | null | string;
  onChange: (value: string | null) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const DatePickerUi: React.FC<DatePickerProps> = ({ label, value, disabled, required, onChange }) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (typeof value === 'string') {
      const parsedDate = dayjs(value, 'YYYY-MM-DD');
      if (parsedDate.isValid()) {
        setDateValue(parsedDate);
      } else {
        setDateValue(null);
      }
    } else if (dayjs.isDayjs(value)) {
      setDateValue(value);
    } else {
      setDateValue(null);
    }
  }, [value]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date && date.isValid()) {
      onChange(date.format('YYYY-MM-DD')); // Return in 'YYYY-MM-DD' format
    } else {
      onChange(null);
    }
    setDateValue(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={disabled}
        value={dateValue}
        onChange={handleDateChange}
        label={label}
        views={['year', 'month', 'day']}
        slotProps={{
          textField: {
            variant: 'outlined',
            size: 'small',
            sx: {
              width: '100%', // Apply full width to the TextField
              '& .MuiOutlinedInput-root': {
                fontSize: '12px',
                borderRadius: '8px !important',
                overflow: 'hidden',
                borderColor: 'action.active',
                transition: 'muiTheme.transitions.create(["border-color", "box-shadow"])',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              },
              '& .MuiFormLabel-root': {
                fontSize: '12px',
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerUi;
