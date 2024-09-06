/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Button, Typography, IconButton, styled } from "@mui/material";
 import ButtonSmallUi from "../../../components/ui/ButtonSmall";
import { CompanyLogoProps } from "../../../types/types";
//import { companyLogoValidationSchema } from "../../constants/forms/validations/validationSchema";
import { companyLogoInitialProps } from '../../../../src/constants/forms/formikInitialValues';
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useAddCompanyLogoMutation } from "../../../redux-store/api/injectedApis";

const CompanyLogo: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
   }, []);

  const handleSubmit = async (
    values: CompanyLogoProps,
    { setSubmitting, resetForm }: FormikHelpers<CompanyLogoProps>
  ) => {
    try {
      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });
      
      // Simulate an API call here
      resetForm();
      setUploadedFiles([]);
      
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
              <Button
                variant="contained"
                color="primary"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ height: "40px", width: "150px", mt: 2, mb: 2 }}
              >
                Upload file
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ButtonSmallUi
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                label="Send"
              />
            </Grid>
         </Form>
      )}
    </Formik>
  );
};

export default CompanyLogo;
