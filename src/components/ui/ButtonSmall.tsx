import React from "react";
import { Button } from "@mui/material";

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
}

const ButtonSmallUi: React.FC<ButtonProps> = ({ label, onClick, size, hasBackground, variant, }) => {
    return (
        <>
            <Button
                sx={{
                    height: "26px",
                    width: "fit-content",
                    fontSize: "12px",
                    borderRadius: "8px",
                    boxShadow: "none",
                }}
                onClick={onClick}
                fullWidth
                size={size}
                variant={variant}
                type='submit'
            >
                {label || "Continue"}
            </Button >
        </>
    );
};

export default ButtonSmallUi;
