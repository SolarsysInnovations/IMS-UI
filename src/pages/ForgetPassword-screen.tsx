import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { forgetPwdValidationSchema } from "../constants/forms/validations/validationSchema";
import { forgetPwdInitialValue } from "../constants/forms/formikInitialValues";
import TextFieldUi from "../components/ui/TextField";
import ButtonUi from "../components/ui/Button";
import { useForgetPwdMutation } from "../redux-store/auth/forgetpwdApi";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSnackbarNotifications } from "../hooks/useSnackbarNotification"; // Snackbar hook

interface ForgetPasswordProps {
  userEmail: string;
}

interface ForgetPasswordResponse {
  data?: {
    message: string;
  };
  error?: any;
}

const ForgetPassword: React.FC = () => {
  const [
    forgetPassword,
    {
      isLoading: forgetPasswordAddLoading,
      isSuccess: forgetPasswordAddSuccess,
      isError: forgetPasswordError,
      error: forgetPasswordErrorObj,
    },
  ] = useForgetPwdMutation();
  
  const navigate = useNavigate();

  // Display snackbar notifications for error or success
  useSnackbarNotifications({
    error: forgetPasswordError,
    errorObject: forgetPasswordErrorObj,
    errorMessage: "Error sending mail",
    success: forgetPasswordAddSuccess,
    successMessage: "Mail has been sent successfully",
  });

  // Helper function to check if error is FetchBaseQueryError
  const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
    return error && typeof error === "object" && "status" in error;
  };

  return (
    <Formik
      initialValues={forgetPwdInitialValue}
      validationSchema={forgetPwdValidationSchema}
      onSubmit={async (values: ForgetPasswordProps, { setSubmitting, resetForm }) => {
        try {
          const response: ForgetPasswordResponse = await forgetPassword(values);

          if (response.data?.message) {
            console.log("Password reset email sent:", response.data.message);
            navigate("/login"); // Navigate to login on success
          } else {
            console.error("Error sending reset email:", response);
          }
          resetForm();
        } catch (error) {
          console.error("An error occurred during password reset:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, values, handleChange, isSubmitting }) => (
        <Box
          sx={{
            mt: 10,
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "center",
            minHeight: "60vh",
            alignItems: "center",
          }}
        >
          <Box sx={{ maxWidth: 500, width: "100%", px: 3 }}>
            <Form noValidate>
              <Grid container spacing={2}>
                {/* Title */}
                <Grid item xs={12}>
                  <Typography variant="h6" align="left">
                    Forget Password
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Please enter the email address you'd like your password
                    reset information sent to.
                  </Typography>
                </Grid>

                {/* Email Field */}
                <Grid item xs={12}>
                  <TextFieldUi
                    fullWidth
                    label="Enter your Email"
                    name="userEmail"
                    type="email" // Set input type to email
                    value={values.userEmail}
                    onChange={handleChange}
                    error={touched.userEmail && Boolean(errors.userEmail)}
                    helperText={touched.userEmail && errors.userEmail}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <ButtonUi
                    fullWidth
                    loading={isSubmitting || forgetPasswordAddLoading}
                    color="primary"
                    label="Send"
                    variant="contained"
                    type="submit"
                  />
                </Grid>
              </Grid>

              {/* Error Message Display */}
              {forgetPasswordError && (
                <Typography color="error" variant="body2">
                  {isFetchBaseQueryError(forgetPasswordError) &&
                  forgetPasswordError.data
                    ? (forgetPasswordError.data as { message: string }).message
                    : "An error occurred while sending the reset email"}
                </Typography>
              )}
            </Form>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default ForgetPassword;
