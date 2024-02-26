import React from "react";
import { Button } from "@mui/material";
import palette from "../../theme/create-pallet";
import { hover } from "@testing-library/user-event/dist/hover";

// Define valid variant names as a union type
type ButtonVariant = "text" | "outlined" | "contained";
interface ButtonProps {
  label?: string;
  variant?: ButtonVariant; // Use the defined union type for variant
  color?: "primary" | "secondary" | any;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  sx?: React.CSSProperties;
  type?: "submit" | "button";
  fullWidth?: boolean;
  component?: React.ElementType;
  hasBackground?: boolean;
}

const ButtonUi: React.FC<ButtonProps> = ({ hasBackground, variant, ...props }) => {
  return (
    <>
      <Button
        {...props}
        fullWidth
        size='large'
        variant={variant}

        type='submit'
      >
        {props.label || "Continue"}
      </Button >
    </>
  );
};

export default ButtonUi;
