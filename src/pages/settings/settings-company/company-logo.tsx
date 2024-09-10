/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Button, Typography, IconButton, styled, InputLabel } from "@mui/material";
 import ButtonSmallUi from "../../../components/ui/ButtonSmall";
import { CompanyLogoProps } from "../../../types/types";
//import { companyLogoValidationSchema } from "../../constants/forms/validations/validationSchema";
import { companyLogoInitialProps } from '../../../../src/constants/forms/formikInitialValues';
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from '@mui/icons-material/Close';

import { useAddCompanyLogoMutation } from "../../../redux-store/api/injectedApis";

const CompanyLogo: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showFilename, setShowFileName] = useState<string[]>([]);
  const [companyLogo, { isSuccess: companyLogoSuccess, isError: companyLogoError, error: companyLogoErrorObject }] = useAddCompanyLogoMutation();

  const pathname = 'Company Logo';
  const navigate = useNavigate();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      const fileNames = fileList.map(file => file.name);
      setUploadedFiles(prevFiles => [...prevFiles, ...fileList]);
     }
  }, []);
   const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setShowFileName(prevNames => prevNames.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = async (
    values: CompanyLogoProps,
    { setSubmitting, resetForm }: FormikHelpers<CompanyLogoProps>
  ) => {
    try {
      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        formData.append("companyLogo", file);
      });
      
      // Simulate an API call here
      resetForm();
      setUploadedFiles([]);
      setShowFileName([]);
      companyLogo(formData)
      console.log("logo sent successfully!", formData);
    } catch (error) {
      console.error("An error occurred during send logo:", error);
      alert("Failed to send logo. Please try again later.");
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
      {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
             
            
             
           
            
            <Grid item xs={12}>
              <InputLabel style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Upload Company Logo</InputLabel>
              <Button
                variant="contained"
                color="primary"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{   borderRadius:"80%",  mt: 2, mb: 2 }}
              >
                 <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
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
            <Grid item xs={12}>
              <ButtonSmallUi
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                label="upload"
              />
            </Grid>
         </Form>
      )}
    </Formik>
  );
};

export default CompanyLogo;
