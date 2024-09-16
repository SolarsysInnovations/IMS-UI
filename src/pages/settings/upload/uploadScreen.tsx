import { Grid, Button } from '@mui/material'; // Importing MUI's Button
import React from 'react';

const UploadScreen: React.FC = () => {
  return (
    <>
      <Grid
        container
        sx={{ 
          marginTop: '20px', 
          padding: '20px 20px', 
          height: '10vh',
          alignItems: 'center',
          paddingLeft: '300px',
        }}
      >
        {/* Hidden File input for uploading files */}
        <input
          accept="image/*"
          style={{ display: 'none' }} // Hides the input
          id="contained-button-file"  // Matches the label's htmlFor
          multiple
          type="file"
        />
        
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </Grid>
    </>
  );
};

export default UploadScreen;
