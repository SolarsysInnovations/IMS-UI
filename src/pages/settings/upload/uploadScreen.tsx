import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useInVoiceContext } from '../../../context/invoiceContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addCompanyLogo,
  deleteCompanyLogo,
  getcompanyLogo,
} from '../../../api/services';

const UploadScreen: React.FC = () => {
  const context = useInVoiceContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [base64String, setBase64String] = useState<string | null>(null);
  const companyIdString = context.companyDetails.companyId ?? '';

  const {
    data: logoData,
    isSuccess: logoSuccess,
    refetch,
  } = useQuery({
    queryKey: ['getCompanyLogo', companyIdString],
    queryFn: ({ queryKey }) => {
      const [, companyIdString] = queryKey;
      if (!companyIdString) throw new Error('CompanyId is missing');
      return getcompanyLogo(companyIdString);
    },
    enabled: !!companyIdString,
    staleTime: 5 * 60 * 1000,
  });

  const addCompanyLogoMutation = useMutation({
    mutationFn: addCompanyLogo,
    onSuccess: () => {
      setSelectedFile(null);
      setImagePreview(null);
      refetch();
    },
  });

  const deleteCompanyLogoMutation = useMutation({
    mutationFn: deleteCompanyLogo,
    onSuccess: () => {
      setBase64String(null);
      refetch();
    },
  });

  const uploadLoading = addCompanyLogoMutation.isPending;

  useEffect(() => {
    if (logoSuccess && logoData) {
      setBase64String(`data:image/jpeg;base64,${logoData.companyLogo}`);
    } else {
      setBase64String(null);
    }
  }, [logoSuccess, logoData]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
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

  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this logo?',
    );
    if (confirmed && companyIdString) {
      try {
        deleteCompanyLogoMutation.mutate(companyIdString);
      } catch (error) {
        console.error('Error deleting logo:', error);
      }
    }
  };

  const handleSave = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('companyLogo', selectedFile);
        addCompanyLogoMutation.mutate(formData);
      } catch (error) {
        console.error('Error uploading logo:', error);
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '20px',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        overflow: 'auto',
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        {base64String ? (
          <img
            src={base64String}
            alt="Company Logo"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              marginBottom: '10px',
            }}
          />
        ) : (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: 'red',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          >
            * No image available *
          </Box>
        )}

        <Button
          variant="outlined"
          color="error"
          sx={{ marginTop: '10px' }}
          onClick={handleDeleteClick}
          disabled={!base64String}
        >
          Remove
        </Button>

        <Typography
          variant="caption"
          sx={{
            marginTop: '10px',
            textAlign: 'center',
            color: 'grey.500',
          }}
        >
          (Only jpeg/png format images are allowed to upload here*)
        </Typography>

        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ marginTop: '10px' }}
          >
            Upload
          </Button>
        </label>

        {imagePreview && (
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              src={imagePreview as string}
              alt="Preview"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                border: '1px solid grey',
                borderRadius: '4px',
              }}
            />
            {uploadLoading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-12px',
                  marginTop: '-12px',
                }}
              />
            )}
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!selectedFile || uploadLoading}
          sx={{ marginTop: '20px' }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadScreen;
