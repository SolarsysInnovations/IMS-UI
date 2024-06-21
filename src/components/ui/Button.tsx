import React from "react";
import { Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

// Define valid variant names as a union type
type ButtonVariant = "text" | "outlined" | "contained";

interface ButtonProps {
  label?: string;
  variant?: ButtonVariant; // Use the defined union type for variant
  color?: "primary" | "secondary" | "inherit" | "default" | "error" | "info" | "success" | "warning";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: any) => void | undefined;
  size?: "small" | "medium" | "large";
  sx?: React.CSSProperties;
  type?: "submit" | "button";
  fullWidth?: boolean;
  component?: React.ElementType;
  hasBackground?: boolean;
  loading?: boolean;
}

const ButtonUi: React.FC<ButtonProps> = ({
  label,
  variant = "contained", // Default variant
  color = "primary", // Default color
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  size = "medium", // Default size
  sx,
  type = "submit", // Default type
  fullWidth = false,
  component,
  hasBackground = true, // Default to true
  loading = false
}) => {
  return (
    <LoadingButton
      sx={{
        "& .css-cstir9-MuiButton-startIcon>*:nth-of-type(1)": {
          fontSize: "15px",
        },
        padding: "10px 16px", ...sx
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
    >
      {label || "Continue"}
    </LoadingButton>
  );
};

export default ButtonUi;
