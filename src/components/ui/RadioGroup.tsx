import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';

interface RadioOptions {
  value: string;
  label: string;
}

interface RadioFormProps {
  readonly options?: RadioOptions[];
  readonly groupName?: string;
  readonly errorMsg?: any;
  readonly label?: string;
  readonly size?: string;
  readonly value?: string | number;
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function RadioUi({
  errorMsg,
  onChange,
  value,
  options,
  groupName,
  label,
  required,
  disabled,
}: RadioFormProps) {
  return (
    <>
      <FormControl
        sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        {label ? (
          <FormLabel
            sx={{
              fontSize: '14px',
              marginTop: '4px',
              marginRight: '10px',
            }}
            id="demo-row-radio-buttons-group-label"
          >
            {label}
          </FormLabel>
        ) : (
          ''
        )}
        <RadioGroup
          row
          value={value}
          onChange={onChange}
          sx={{}}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name={groupName}
        >
          {options?.map((option, index) => (
            <FormControlLabel
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: '12px',
                },

                '& .MuiTypography-root': {
                  fontSize: '12px',
                },
                padding: '0',
              }}
              key={index}
              value={option.value}
              control={<Radio />}
              required={required}
              disabled={disabled}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Typography
        sx={{ fontSize: '12px', color: '#F04438' }}
        variant="subtitle2"
        color="initial"
      >
        {errorMsg}
      </Typography>
    </>
  );
}
