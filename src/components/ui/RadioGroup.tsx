import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { string } from 'yup';

interface RadioOptions {
    value: string;
    label: string;
}

interface RadioFormProps {
    options?: RadioOptions[];
    groupName?: string;
    label?: string;
    size?: string;
    value?: string | number;
    onChange? : (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function RadioUi({onChange,value, options, groupName, label }: RadioFormProps) {
    return (
        <FormControl>
            <FormLabel sx={{
                    fontSize: "14px",
            }} id="demo-row-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                value={value}
                onChange={onChange}
                sx={{
                    padding : "0px 2px"
                }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name={groupName}
            >
                {options?.map((option, index) => (
                    <FormControlLabel  sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 15,
                        },
                        
                        '& .MuiTypography-root': {
                            fontSize: 13,                            
                        },
                        padding : "1px 6px;"
                      }}  key={index} value={option.value} control={<Radio />} label={option.label} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}