// Upload.tsx
import React from "react";
import { Button, Input, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

// Define the props interface
interface UploadProps {
  label?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
}

// Styled component for the hidden input
const HiddenInput = styled("input")({
  display: "none",
});

const Upload: React.FC<UploadProps> = ({
  label,
  disabled,
  onChange,
  helperText,
}) => {
  return (
    <>
      {label && <InputLabel shrink>{label}</InputLabel>}
      <label htmlFor="upload-button-file">
        <HiddenInput
          accept="*/*" // Accept all file types; you can specify types like "image/*" or ".pdf" etc.
          id="upload-button-file"
          type="file"
          onChange={onChange}
          disabled={disabled} // Pass the disabled state
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          disabled={disabled}
        >
          Upload
        </Button>
      </label>
      {helperText && (
        <div style={{ marginTop: "8px", color: "red" }}>{helperText}</div>
      )}
    </>
  );
};

export default Upload;
