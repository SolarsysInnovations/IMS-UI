import React, { useState, useCallback } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Button, Typography, IconButton, styled } from "@mui/material";
import TextFieldUi from "../../components/ui/TextField";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import { SendEmailInitialValueProps } from "../../types/types";
import { sendEmailValidationSchema } from "../../constants/forms/validations/validationSchema";
import { SendEmailInitialValue } from '../../constants/forms/formikInitialValues';
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CancelIcon from '@mui/icons-material/Close';
import TableHeader from "../../components/layouts/TableHeader";
import { useSendEmailNotificationMutation } from "../../redux-store/api/injectedApis";

const SendEmail: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showFilename, setShowFileName] = useState<string[]>([]);
  const [sendEmail, { isSuccess: sendEmailSuccess, isError: sendEmailError, error: sendEmailErrorObject }] = useSendEmailNotificationMutation();

  const pathname = 'Send Email';
  const navigate = useNavigate();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      const fileNames = fileList.map(file => file.name);
      setUploadedFiles(prevFiles => [...prevFiles, ...fileList]);
      setShowFileName(prevNames => [...prevNames, ...fileNames]);
    }
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setShowFileName(prevNames => prevNames.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = async (
    values: SendEmailInitialValueProps,
    { setSubmitting, resetForm }: FormikHelpers<SendEmailInitialValueProps>
  ) => {
    try {
      const formData = new FormData();
      formData.append("recipientEmail", values.recipientEmail || "");
    //  formData.append("fromemail", values.fromemail || "");
     // formData.append("cc", values.cc || "");
      formData.append("subject", values.subject || "");
     // formData.append("body", values.body || "");

      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });
      
      // Simulate an API call here
      resetForm();
      setUploadedFiles([]);
      setShowFileName([]);
      sendEmail(formData)
      console.log("Email sent successfully!", formData);
    } catch (error) {
      console.error("An error occurred during send email:", error);
      alert("Failed to send email. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={SendEmailInitialValue}
      validationSchema={sendEmailValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableHeader headerName={pathname} />
            </Grid>
            {/* <Grid item xs={12}>
              <TextFieldUi
                required
                fullWidth
                label="From Email"
                name="fromemail"
                type="email"
                value={values.fromemail}
                onChange={handleChange}
                error={touched.fromemail && Boolean(errors.fromemail)}
                helperText={touched.fromemail && errors.fromemail}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextFieldUi
                required
                fullWidth
                label="To Email"
                name="recipientEmail"
                type="email"
                value={values.recipientEmail}
                onChange={handleChange}
                error={touched.recipientEmail && Boolean(errors.recipientEmail)}
                helperText={touched.recipientEmail && errors.recipientEmail}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextFieldUi
                fullWidth
                label="CC"
                name="cc"
                type="email"
                value={values.cc}
                onChange={handleChange}
                error={touched.cc && Boolean(errors.cc)}
                helperText={touched.cc && errors.cc}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextFieldUi
                fullWidth
                label="Subject"
                name="subject"
                type="text"
                value={values.subject}
                onChange={handleChange}
                error={touched.subject && Boolean(errors.subject)}
                helperText={touched.subject && errors.subject}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <CKEditor
                editor={ClassicEditor}
                data={values.body}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue('body', data);
                }}
              />
            </Grid> */}
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
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SendEmail;
