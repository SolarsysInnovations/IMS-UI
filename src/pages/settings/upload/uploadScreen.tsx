import { Grid, Button, CircularProgress, Typography } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useAddCompanyLogoMutation } from "../../../../src/redux-store/api/injectedApis";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";

const UploadScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(null);

  // Mutation for uploading the logo
  const [addCompanyLogo, { isSuccess, isError, data }] = useAddCompanyLogoMutation();

  // Snackbar notifications
  useSnackbarNotifications({
    success: isSuccess,
    successMessage: 'Logo has been uploaded successfully',
    error: isError,
    errorMessage: 'Error uploading logo. Please try again.',
  });

  useEffect(() => {
    if (isSuccess && data) {
      const responseData = data as { logoUrl: string };
      setSavedLogoUrl(responseData.logoUrl);
      setLoading(false); // Stop loading after success
      setSelectedFile(null); // Reset the file input after saving
      setImagePreview(null); // Reset the preview after saving
    }
  }, [isSuccess, data]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB size limit
        alert('File size exceeds 2MB');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a JPG or PNG image.');
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
        formData.append('companyLogo', selectedFile);
        await addCompanyLogo(formData).unwrap();
      } catch (error) {
        console.error('Error uploading logo:', error);
      }
    }
  };

  return (
    <Grid
      container
      sx={{
        marginTop: '20px',
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        type="file"
        onChange={handleFileChange}
      />
      
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>

      {imagePreview && !savedLogoUrl && (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img
            src={imagePreview as string}
            alt="Preview"
            style={{
              maxWidth: '150px',
              maxHeight: '150px',
              objectFit: 'cover',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          />
        </div>
      )}

      {savedLogoUrl && (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img
            src={savedLogoUrl}
            alt="Saved Logo"
            style={{
              maxWidth: '150px',
              maxHeight: '150px',
              objectFit: 'cover',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          />
        </div>
      )}

      {selectedFile && !savedLogoUrl && (
        <div>
          <Button
            variant="contained"
            color="info"
            onClick={handleSave}
            sx={{ margin: '20px' }}
          >
            Save
          </Button>

          {loading && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <CircularProgress />
              <Typography variant="caption" sx={{ marginLeft: '10px' }}>
                Uploading...
              </Typography>
            </div>
          )}
        </div>
      )}

      {/* Show upload button and saved logo after saving */}
      {savedLogoUrl && (
        <Button variant="contained" color="primary" onClick={() => setSavedLogoUrl(null)}>
          Upload Another Logo
        </Button>
      )}
    </Grid>
  );
};

export default UploadScreen;
