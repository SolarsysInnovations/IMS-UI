import { Grid, Button, CircularProgress, Typography } from '@mui/material'; // Importing MUI components
import React, { useState, ChangeEvent } from 'react';

const UploadScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      setLoading(true);
      // Simulate file upload delay
      setTimeout(() => {
        setLoading(false);
        // Handle the file save logic here
        console.log(`Saving file: ${selectedFile.name}`);
      }, 2000); // 2 seconds delay for demonstration
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
        flexDirection: 'column', // Stack elements vertically
      }}
    >
      {/* Hidden File input for uploading files */}
      <input
        accept="image/*"
        style={{ display: 'none' }} // Hides the input
        id="contained-button-file"  // Matches the label's htmlFor
        type="file"
        onChange={handleFileChange}
      />
      
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>

      {/* Image Preview Thumbnail */}
      {imagePreview && (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img 
            src={imagePreview as string} 
            alt="Preview" 
            style={{ 
              maxWidth: '150px', // Thumbnail width
              maxHeight: '150px', // Thumbnail height
              objectFit: 'cover', // Preserve aspect ratio
              border: '1px solid #ddd', // Light border
              borderRadius: '8px', // Rounded corners
            }} 
          />
        </div>
      )}

      {/* Save button, only visible when a file is selected */}
      {selectedFile && (
        <div>
          <Button 
            variant="contained" 
            color="info" 
            onClick={handleSave}
            sx={{ margin: '20px' }} // Add margin for spacing
          >
            Save
          </Button>
          
          {/* Loading Spinner */}
          {loading && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <CircularProgress />
              <Typography variant="caption" sx={{ marginLeft: '10px' }}>Uploading...</Typography>
            </div>
          )}
        </div>
      )}
    </Grid>
  );
};

export default UploadScreen;
