import { Grid, Button, CircularProgress, Typography, Box } from "@mui/material";
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  useAddCompanyLogoMutation,
  useGetCompanyLogoQuery,
  useDeleteCompanyLogoMutation,
} from "../../../../src/redux-store/api/injectedApis";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UploadScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(null);
  const [base64String, setBase64String] = useState<string | null>(null);

  const companyInfo = useSelector(selectUserDetails);
  const { id: companyId } = companyInfo?.companyDetails || {};

  const [deleteCompanyLogo, { isLoading: deleteCompanyLoading, isSuccess: deleteCompanySuccess, isError: deleteCompanyError, error: deleteCompanyErrorObject }] = useDeleteCompanyLogoMutation();
  const [addCompanyLogo, { isSuccess: uploadSuccess, isError: uploadError, data }] = useAddCompanyLogoMutation();
  const { data: logoData, isSuccess: logoSuccess, isError: logoError, refetch, isFetching, error: logoFetchError } = useGetCompanyLogoQuery(companyId);

  useSnackbarNotifications({
    error: deleteCompanyError,
    errorMessage: 'Error deleting company logo',
    success: deleteCompanySuccess,
    successMessage: 'Logo deleted successfully',
    errorObject: deleteCompanyErrorObject,
  });

  useSnackbarNotifications({
    success: uploadSuccess,
    successMessage: "Logo has been uploaded successfully",
    error: uploadError,
    errorMessage: "Error uploading logo. Please try again.",
  });

  // Reset state when the component mounts or when the companyId changes
  useEffect(() => {
    setSelectedFile(null);
    setImagePreview(null);
    setSavedLogoUrl(null);
    setBase64String(null); // Reset base64String
  }, [companyId]);

  // Handle successful logo upload
  useEffect(() => {
    if (uploadSuccess && data) {
      const responseData = data as { logoUrl: string };
      setSavedLogoUrl(responseData.logoUrl);
      setLoading(false);
      setSelectedFile(null);
      setImagePreview(null);
      refetch(); // Fetch the updated logo data after upload
    }
  }, [uploadSuccess, data, refetch]);

  // Update base64String when logoData changes
  useEffect(() => {
    if (logoData && logoData.companyLogo) {
      const logoBase64 = logoData.companyLogo;
      setBase64String(`data:image/jpeg;base64,${logoBase64}`); // Set base64String state
    } else {
      setBase64String(null); // Reset base64String if no logo exists
    }
  }, [logoData]);

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

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this logo?");
    if (confirmed && companyId) {
      setBase64String(null); // Set base64String to null immediately
      await deleteCompanyLogo(companyId).unwrap(); // Await deletion to ensure completion
      refetch(); // Refetch to update the state after deletion
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
        setLoading(false);
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
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {/* Display Company Logo or No Image Text */}
        {base64String ? (
          <img
            src={base64String}
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

        <Button
          variant="outlined"
          color="error"
          sx={{ marginTop: "10px" }}
          onClick={handleDeleteClick}
          disabled={deleteCompanyLoading || !logoData?.companyLogo}
        >
          Remove
        </Button>

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
            <Button variant="contained" color="info" onClick={handleSave} disabled={loading}>
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
              }}
            />
          </div>
        )}

        {/* Loading indicator */}
        {loading && <CircularProgress sx={{ marginTop: "10px" }} />}
      </Grid>
    </Grid>
  );
};

export default UploadScreen;
