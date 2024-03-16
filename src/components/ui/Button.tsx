import React from "react";
import { Button } from "@mui/material";
import palette from "../../theme/create-pallet";
import { hover } from "@testing-library/user-event/dist/hover";
import { GridSaveAltIcon } from "@mui/x-data-grid";
import LoadingButton from '@mui/lab/LoadingButton';
// Define valid variant names as a union type
type ButtonVariant = "text" | "outlined" | "contained";
interface ButtonProps {
  label?: string;
  variant?: ButtonVariant; // Use the defined union type for variant
  color?: "primary" | "secondary" | any;
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

const ButtonUi: React.FC<ButtonProps> = ({ loading, label, onClick, size, hasBackground, variant, }) => {
  return (
    <>
      <Button
        sx={{ padding: "10px 16px" }}
        onClick={onClick}
        fullWidth
        size={size}
        variant={variant}
        type='submit'
      >

        {label || "Continue"}
        {loading && (<LoadingButton sx={{ padding: "0px" }} loading={loading} loadingPosition="start" startIcon={<GridSaveAltIcon />}>
        </LoadingButton>)}
      </Button >
    </>
  );
};

export default ButtonUi;
