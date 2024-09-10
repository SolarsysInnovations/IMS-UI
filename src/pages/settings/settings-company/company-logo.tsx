import React, { useState, useCallback } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Button, Typography, IconButton, InputLabel } from "@mui/material";
import ButtonSmallUi from "../../../components/ui/ButtonSmall";
import { CompanyLogoProps } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from '@mui/icons-material/Close';

import { useAddCompanyLogoMutation } from "../../../redux-store/api/injectedApis";
import { companyLogoInitialProps } from "../../../constants/forms/formikInitialValues";

const CompanyLogo: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showFilename, setShowFileName] = useState<string[]>([]);
  const [companyLogo, { isSuccess: companyLogoSuccess, isError: companyLogoError, error: companyLogoErrorObject }] = useAddCompanyLogoMutation();
  
 // const pathname = 'Company Logo';
  const navigate = useNavigate();

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      const fileNames = fileList.map(file => file.name);
      setUploadedFiles(prevFiles => [...prevFiles, ...fileList]);
      setShowFileName(prevNames => [...prevNames, ...fileNames]);
    }
  }, []);

  // Handle file removal
  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setShowFileName(prevNames => prevNames.filter((_, i) => i !== index));
  }, []);

  // Handle form submission
  const handleSubmit = async (
    values: CompanyLogoProps,
    { setSubmitting, resetForm }: FormikHelpers<CompanyLogoProps>
  ) => {
    try {
      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        formData.append("files", file); // Ensure the key matches what the backend expects (e.g., "files" or "file")
      });
      
      // Submit the logo via the mutation
      await companyLogo(formData);

      // Handle success response
      if (companyLogoSuccess) {
        console.log("Logo sent successfully!");
        resetForm();
        setUploadedFiles([]);
        setShowFileName([]);
      }

      // Handle error response
      if (companyLogoError) {
        console.error("Error sending logo:", companyLogoErrorObject);
        alert("Failed to send logo. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during logo submission:", error);
      alert("Unexpected error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={companyLogoInitialProps}
    //  validationSchema={companyLogoValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <Grid item xs={12}>
            <InputLabel style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Upload Company Logo</InputLabel>
            <Button
              variant="contained"
              color="primary"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ borderRadius: "50%", mt: 2, mb: 2 }}
            >
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>
          
          {/* Display uploaded files */}
          <Grid container spacing={1}>
            {showFilename.map((fileName, index) => (
              <React.Fragment key={index}>
                <Grid item xs={5}>
                  <Box sx={{ mt: 1, mb: -1, display: "flex", position: "relative", left: "15px" }}>
                    <Typography>{fileName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <Box sx={{ mt: 1, mb: -1, display: "flex", position: "relative", right: "10px" }}>
                    <IconButton aria-label="Remove file" onClick={() => handleRemoveFile(index)}>
                      <CancelIcon color="secondary" sx={{ position: "relative" }} />
                    </IconButton>
                  </Box>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>

          {/* Submit button */}
          <Grid item xs={12}>
            <ButtonSmallUi
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              label="Upload"
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyLogo;
