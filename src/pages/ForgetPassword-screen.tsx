import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { forgetPwdValidationSchema } from '../constants/forms/validations/validationSchema';
import { forgetPwdInitialValue } from '../constants/forms/formikInitialValues';
import TextFieldUi from '../components/ui/TextField';
import ButtonUi from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useSnackbarNotifications } from '../hooks/useSnackbarNotification'; // Snackbar hook
import Container from '@mui/material/Container';
import HelpIcon from '@mui/icons-material/Help';
import { useDispatch } from 'react-redux';
import { StorageKeys, useSessionStorage } from '../hooks/useSessionStorage';
import { AppDispatch } from '../redux-store/store';
import { useForgetPwdMutation } from '../redux-store/api/injectedApis';

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
  const dispatch = useDispatch<AppDispatch>();
  const [userToken, setUserToken] = useSessionStorage(StorageKeys.TOKEN, '');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [
    forgetPassword,
    {
      isLoading: forgetPasswordLoading,
      error: forgetPasswordErrorObject,
      isSuccess: forgetPasswordSuccess,
      isError: forgetPasswordError,
    },
  ] = useForgetPwdMutation();

  const navigate = useNavigate();

  // Display snackbar notifications for error or success
  useSnackbarNotifications({
    error: forgetPasswordError,
    errorObject: forgetPasswordErrorObject,
    errorMessage: 'Error sending mail',
    success: forgetPasswordSuccess,
    successMessage: 'Password reset email sent',
  });

  useEffect(() => {
    if (forgetPasswordSuccess) {
      navigate('/login');
    }
  }, [forgetPasswordSuccess, navigate]);
  // Helper function to check if error is FetchBaseQueryError
  const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
    return error && typeof error === 'object' && 'status' in error;
  };

  return (
    <Formik
      initialValues={forgetPwdInitialValue}
      validationSchema={forgetPwdValidationSchema}
      onSubmit={async (
        values: ForgetPasswordProps,
        { setSubmitting, resetForm },
      ) => {
        try {
          const response: ForgetPasswordResponse =
            await forgetPassword(values).unwrap(); // Use unwrap to handle errors directly

          // Check for success message in response
          if (response.data?.message) {
            // Navigate to login on success
          } else {
            console.error('Error sending reset email:', response);
          }
          resetForm();
        } catch (error) {
          console.error('An error occurred during password reset:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, values, handleChange, isSubmitting }) => (
        <Container maxWidth="md">
          <Box
            sx={{
              marginTop: 15,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card sx={{ boxShadow: '4' }}>
              <CardContent sx={{ m: 3, alignItems: 'center' }}>
                <Avatar sx={{ m: 'auto', bgcolor: 'primary.main' }}>
                  <HelpIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mt: 2, ml: 3 }}>
                  Forget Password
                </Typography>
                <Box sx={{ maxWidth: 500, width: '100%', px: 3 }}>
                  <Form noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                          sx={{
                            fontSize: '12px',
                            fontPalette: 'light',
                            color: 'Highlight',
                            mt: 2,
                          }}
                        >
                          Please enter the email address you'd like your
                          password reset information sent to.
                        </Typography>
                      </Grid>

                      {/* Email Field */}
                      <Grid item xs={12}>
                        <TextFieldUi
                          fullWidth
                          label="Enter your Email *"
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
                          loading={isSubmitting || forgetPasswordLoading}
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
                          ? (forgetPasswordError.data as { message: string })
                              .message
                          : 'An error occurred while sending the reset email'}
                      </Typography>
                    )}
                  </Form>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

export default ForgetPassword;
