import { Grid, Button, CircularProgress, Typography, Box } from "@mui/material";
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  useAddCompanyLogoMutation,
  useGetCompanyLogoQuery,
} from "../../../../src/redux-store/api/injectedApis";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UploadScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(null);
  const companyInfo = useSelector(selectUserDetails);

  const [addCompanyLogo, { isSuccess, isError, data }] =
    useAddCompanyLogoMutation();
  const {
    data: logoData,
    isSuccess: logoSuccess,
    isError: logoError,
  } = useGetCompanyLogoQuery(companyInfo?.companyDetails?.id);

  useSnackbarNotifications({
    success: isSuccess,
    successMessage: "Logo has been uploaded successfully",
    error: isError,
    errorMessage: "Error uploading logo. Please try again.",
  });

  useEffect(() => {
    if (isSuccess && data) {
      const responseData = data as { logoUrl: string };
      setSavedLogoUrl(responseData.logoUrl);
      setLoading(false);
      setSelectedFile(null);
      setImagePreview(null);
    }
  }, [isSuccess, data]);

  const getCompanyLogo = () => {
    if (logoData && logoData.companyLogo) {
      const base64String = logoData.companyLogo;
      return `data:image/jpeg;base64,${base64String}`;
    }
    return null;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB");
        return;
      }
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JPG or PNG image.");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (selectedFile) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("companyLogo", selectedFile);
        await addCompanyLogo(formData).unwrap();
      } catch (error) {
        console.error("Error uploading logo:", error);
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: "20px",
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        overflow: "auto", // Avoid full page scrolling
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={4} // More control on medium screens
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {/* Display Company Logo or No Image Text */}
        {logoData && logoData.companyLogo ? (
          <img
            src={getCompanyLogo() ?? undefined}
            alt="Company Logo"
            style={{
              maxWidth: "250px",
              maxHeight: "250px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
        ) : (
          <Box component="span" fontSize="13px" sx={{ marginBottom: "10px" }}>
            No image available
          </Box>
        )}

        {/* Upload instructions */}
        <Typography
          variant="caption"
          sx={{
            marginTop: "10px",
            textAlign: "center",
            color: "grey.500",
          }}
        >
          (Only jpeg/png format images are allowed to upload here*)
        </Typography>

        {/* Hidden input and Upload button */}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" sx={{ marginTop: "10px" }}>
            Upload
          </Button>
        </label>

        {/* Image Preview */}
        {imagePreview && !savedLogoUrl && (
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={imagePreview as string}
              alt="Preview"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <Button variant="contained" color="info" onClick={handleSave}>
              Save
            </Button>
          </Box>
        )}

        {/* Saved logo display */}
        {savedLogoUrl && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <img
              src={savedLogoUrl}
              alt="Saved Logo"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <Box sx={{ marginTop: "20px", textAlign: "center" }}>
            <CircularProgress size={24} />
            <Typography variant="caption" sx={{ marginLeft: "10px" }}>
              Uploading...
            </Typography>
          </Box>
        )}

        {/* Upload Another button */}
        {savedLogoUrl && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSavedLogoUrl(null)}
            sx={{ marginTop: "10px" }}
          >
            Upload Another Logo
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default UploadScreen;
