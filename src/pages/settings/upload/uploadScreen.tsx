import { Grid, Button, CircularProgress, Typography, Box } from "@mui/material";
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  useAddCompanyLogoMutation,
  useGetCompanyLogoByIdQuery,
  useDeleteCompanyLogoMutation,
  useGetCompanySettingByIdQuery,
} from "../../../../src/redux-store/api/injectedApis";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import { useSelector } from "react-redux";
import { clearCompanyLogo, setCompanyLogo } from "../../../redux-store/global/globalState";
import { useDispatch } from "react-redux";


const UploadScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(null);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [companyDetails, setCompanyDetails] = useState<any>(null);

  const companyInfo = useSelector(selectUserDetails);
  const companyIdString = sessionStorage.getItem("id") || "";

  // Fetch company data
  const { data: companyData, refetch: refetchCompanyData } = useGetCompanySettingByIdQuery(companyIdString);
  const [addCompanyLogo, { isSuccess: uploadSuccess, isError: uploadError, data }] = useAddCompanyLogoMutation();
  const [deleteCompanyLogo, { isLoading: deleteCompanyLoading, isSuccess: deleteCompanySuccess, isError: deleteCompanyError }] =
    useDeleteCompanyLogoMutation();

  // Fetch logo data after company ID is available
  const { id: companyId } = companyDetails || {};
  const { data: logoData, isSuccess: logoSuccess, isError: logoError, refetch: refetchLogo } = useGetCompanyLogoByIdQuery(
    companyId,
    { skip: !companyId } // Skip fetching until companyId is available
  );

  useEffect(() => {
    if (companyData) {
      setCompanyDetails(companyData);
    }
  }, [companyData]);
  
  useEffect(() => {
    if (uploadSuccess && data) {
        const responseData = data as { logoUrl: string };
        setSavedLogoUrl(responseData.logoUrl);
        dispatch(setCompanyLogo(responseData.logoUrl)); // Update Redux state
        setLoading(false);
        setSelectedFile(null);
        setImagePreview(null);
        refetchLogo(); // Fetch updated logo data after upload
    }
}, [uploadSuccess, data, dispatch, refetchLogo]);


  useEffect(() => {
    if (logoSuccess && logoData?.companyLogo) {
      setBase64String(`data:image/jpeg;base64,${logoData.companyLogo}`);
    } else {
      setBase64String(null);
    }
  }, [logoSuccess, logoData]);

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
        try {
            await deleteCompanyLogo(companyId).unwrap();
            // Clear the logo from the Redux store
            dispatch(clearCompanyLogo()); // Dispatch action to clear logo
            setBase64String(null); // Optionally clear local state as well
            setSavedLogoUrl(null);
            refetchLogo();
        } catch (error) {
            console.error("Error deleting logo:", error);
        }
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

  useSnackbarNotifications({
    success: uploadSuccess,
    successMessage: "Logo uploaded successfully",
    error: uploadError,
    errorMessage: "Error uploading logo",
  });

  useSnackbarNotifications({
    success: deleteCompanySuccess,
    successMessage: "Logo deleted successfully",
    error: deleteCompanyError,
    errorMessage: "Error deleting logo",
  });

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
        overflow: "auto",
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
          disabled={!base64String}
        >
          Remove
        </Button>

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

        {imagePreview && (
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              src={imagePreview as string}
              alt="Preview"
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                objectFit: "contain",
                border: "1px solid grey",
                borderRadius: "4px",
              }}
            />
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginLeft: "-12px",
                  marginTop: "-12px",
                }}
              />
            )}
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!selectedFile || loading}
          sx={{ marginTop: "20px" }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadScreen;
