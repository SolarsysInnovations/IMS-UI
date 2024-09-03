import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { styled } from '@mui/material/styles';
import { Box, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { border } from '@mui/system';
import { Outline } from 'react-pdf';

interface PhoneInputUiProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  width?: string;
}

const PhoneNumber = styled(PhoneInput)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  borderRadius: '8px',
  border: '1px solid #d1d1d1', // Border color
  '& .PhoneInputInput': {
    width: '80%',
    border: 'none',
    outline: 'none',
    fontSize: '12px',
    paddingLeft: '10px',
  },
  '& .PhoneInputCountrySelect': {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
  },
  '& .PhoneInputCountrySelectArrow': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    borderColor: '#000000',
  },
  '&:focus-within': {
    //borderColor: ,
    Outline: `2px solid ${theme.palette.primary.main}`
  },
}));

const PhoneInputUi: React.FC<PhoneInputUiProps> = ({
  value,
  onChange,
  label,
  disabled,
  helperText,
  fullWidth,
  error,
  width,
}) => {
  // Handle phone number changes with fallback to empty string
  const handlePhoneChange = (newValue: string | undefined) => {
    onChange(newValue || "");
  };

  return (
    <FormControl fullWidth={fullWidth || false} error={error} style={{ margin: '0', width }}>
      {/* {label && <InputLabel shrink>{label}</InputLabel>} */}
      <PhoneNumber
        label={label}
        international
        countryCallingCodeEditable={false}
        defaultCountry="IN"
        value={value || ""}
        onChange={handlePhoneChange}
        placeholder="Enter phone number"
        disabled={disabled}
      />
      {/* {helperText && <FormHelperText>{helperText}</FormHelperText>} */}
    </FormControl>
  );
};

export default PhoneInputUi;
