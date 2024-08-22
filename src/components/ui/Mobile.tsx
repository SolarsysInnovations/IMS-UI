import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { styled } from '@mui/material/styles';
import { Box, InputLabel, FormControl, FormHelperText } from '@mui/material';

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

const CustomPhoneInput = styled(PhoneInput)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #d1d1d1', // Border color
  '& .PhoneInputInput': {
    width: '100%',
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
    color: '#d1d1d1',
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
  },
  //  '--PhoneInputCountryFlag-height': '15px',
  // '--PhoneInputCountryFlag-borderColor': '#4CAF50',
  // '--PhoneInputCountrySelectArrow-color': '#FF5722',
  // '--PhoneInputCountrySelectArrow-opacity': '0.8',
  // '--PhoneInput-color--focus': '#FFC107',
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
  return (
    <FormControl fullWidth={fullWidth || true} error={error} style={{ margin: '8px 0', width }}>
       {/* {label && <InputLabel shrink>{label}</InputLabel>}   */}
      <CustomPhoneInput
      label={label}
        international
        countryCallingCodeEditable={false}
        defaultCountry="IN"
        value={value}
        onChange={onChange}
        placeholder="Enter phone number"
        disabled={disabled}
      />
      {/* {helperText && <FormHelperText>{helperText}</FormHelperText>} */}
    </FormControl>
  );
};

export default PhoneInputUi;
