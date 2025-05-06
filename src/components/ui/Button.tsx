import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

// Define valid variant names as a union type
type ButtonVariant = 'text' | 'outlined' | 'contained';

interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: any) => void | undefined;
  size?: 'small' | 'medium' | 'large';
  sx?: React.CSSProperties;
  type?: 'submit' | 'button';
  fullWidth?: boolean;
  loading?: boolean;
  smallButtonCss?: boolean;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  color?: 'primary' | 'secondary';
}

const ButtonUi: React.FC<ButtonProps> = ({
  onMouseEnter,
  onMouseLeave,
  label,
  variant = 'contained',
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  size = 'medium',
  sx,
  type = 'submit', 
  fullWidth = false,
  loading = false,
  smallButtonCss,
  color = 'primary',
}) => {
  return (
    <LoadingButton
      sx={{
        '& .css-cstir9-MuiButton-startIcon>*:nth-of-type(1)': {
          fontSize: '15px',
        },
        padding: '10px 16px',
        ...sx,
        ...(smallButtonCss
          ? {
              borderRadius: '5px',
              marginTop: '0px',
              marginBottom: '0px',
              padding: '3px 10px',
              display: 'flex',
              fontSize: '11px',
              boxShadow: 'none',
              alignItems: 'center',
            }
          : {}),
      }}
      onClick={onClick}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      type={type}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      loading={loading}
      loadingIndicator="Loading…"
      onMouseEnter={onMouseEnter} // Hover event handler
      onMouseLeave={onMouseLeave} // Hover event handler
    >
      {label ?? 'Continue'}
    </LoadingButton>
  );
};

export default ButtonUi;
