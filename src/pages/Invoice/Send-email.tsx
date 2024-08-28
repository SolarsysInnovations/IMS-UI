import React, { useState, useCallback } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Button, Typography, IconButton } from "@mui/material";
import TextFieldUi from "../../components/ui/TextField";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import { SendEmailInitialValueProps } from "../../types/types";
import { sendEmailValidationSchema } from "../../constants/forms/validations/validationSchema";
import { SendEmailInitialValue } from '../../constants/forms/formikInitialValues';
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CancelIcon from '@mui/icons-material/Close';
import usePathname from "../../hooks/usePathname";
import TableHeader from "../../components/layouts/TableHeader";

const SendEmail: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showFilename, setShowFileName] = useState<string[]>([]);
  const pathname = 'Send Email'
  const navigate = useNavigate();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File upload event:", event);
    console.log("Files:", event.target.files);
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      const fileNames = fileList.map(file => file.name);
      setUploadedFiles(prevFiles => [...prevFiles, ...fileList]);
      setShowFileName(prevNames => [...prevNames, ...fileNames]);
    } else {
      console.log("No files selected");
    }
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setShowFileName(prevNames => prevNames.filter((_, i) => i !== index));
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSubmit = async (
    values: SendEmailInitialValueProps,
    { setSubmitting, resetForm }: FormikHelpers<SendEmailInitialValueProps>
  ) => {
    try {
      const formData = new FormData();
      formData.append("recipientEmail", values.recipientEmail || "");
      formData.append("fromemail", values.fromemail || "");
      formData.append("cc", values.cc || "");
      formData.append("subject", values.subject || "");
      //formData.append("body", values.body || "");

      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Implement your API call here
      // await sendEmailNotification(formData);

      resetForm();
      setUploadedFiles([]);
      setShowFileName([]);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("An error occurred during sendemail:", error);
      // Implement error handling (e.g., show an error message to the user)
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
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableHeader headerName={pathname} />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
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
            <Grid item xs={12}>
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
            </Grid>
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
            <Grid item xs={12}>
              <CKEditor
                editor={ClassicEditor}
                //  data={values.body}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleChange({ target: { name: 'body', value: data } });
                }}
              />
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
                    <Box sx={{ mt: 1, display: "flex" }}>
                      <IconButton onClick={() => handleRemoveFile(index)}>
                        <CancelIcon color="secondary" sx={{ position: "relative" }} />
                      </IconButton>
                    </Box>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Box sx={{ mt: 3, display: "flex", position: "relative", left: "15px" }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    style={{ height: "26px", width: "fit-content", fontSize: "12px", borderRadius: "8px", boxShadow: "none" }}
                  >
                    Upload file
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ mt: 3, gap: 1, display: "flex" }}>
                  <ButtonSmallUi color="primary" label="Cancel" size="small" variant="contained" type="button" onClick={() => navigate(-1)} />
                  <ButtonSmallUi color="primary" label="Send" size="small" variant="contained" type="submit" />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SendEmail;