import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerUi() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker', 'TimePicker']}>
                <TimePicker
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
                    slotProps={{ textField: { variant: "outlined", size: "small" } }}
                    label="Controlled picker"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}