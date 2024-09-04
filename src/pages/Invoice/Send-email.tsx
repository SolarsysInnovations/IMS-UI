import React, { useState, useCallback } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Button, Typography, IconButton, styled } from "@mui/material";
import TextFieldUi from "../../components/ui/TextField";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import { useSendEmailNotificationMutation } from "../../redux-store/api/injectedApis";
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { SendEmailInitialValueProps } from "../../types/types";
import { sendEmailValidationSchema } from "../../constants/forms/validations/validationSchema";
import { SendEmailInitialValue } from '../../constants/forms/formikInitialValues';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
interface SendEmailProps {
  onSuccess: () => void;  // Add this line to define the prop type
}

const SendEmail: React.FC<SendEmailProps> = ({ onSuccess }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showFilename, setShowFileName] = useState<string[]>([]);
  const pathname = 'sendMail';
  const navigate = useNavigate();
  const [sendEmail, { isSuccess: sendEmailSuccess, isError: sendEmailError, error: sendEmailErrorObject }] = useSendEmailNotificationMutation();
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
      formData.append("cc", values.cc || "");
      formData.append("subject", values.subject || "");
      formData.append("body", values.body || "");

      uploadedFiles.forEach((file) => {
        formData.append("file", file);
      });

      await sendEmail(formData);

      if (sendEmailSuccess) {
        onSuccess(); // Call the onSuccess callback if the email is sent successfully
        resetForm();
        setUploadedFiles([]);
      }
    } catch (error) {
      console.error("An error occurred during send email:", error);
      alert("Failed to send email. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useSnackbarNotifications({
    error: sendEmailError,
    errorObject: sendEmailErrorObject,
    errorMessage: 'Error Sending Mail',
    success: sendEmailSuccess,
    successMessage: 'Mail sent successfully',
  });

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
              />
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
              <ButtonSmallUi label="Send Email" type="submit" />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SendEmail;
