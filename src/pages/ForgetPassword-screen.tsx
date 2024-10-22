import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Formik, Form } from 'formik';
import { AppDispatch } from "../redux-store/store";
import { loginValidationSchema } from "../constants/forms/validations/validationSchema";
import { loginInitialValue } from "../constants/forms/formikInitialValues";
import TextFieldUi from "../components/ui/TextField";
import ButtonUi from '../components/ui/Button';
import { useLoginMutation } from '../redux-store/auth/loginApi';
import { useNavigate } from 'react-router-dom';
import { StorageKeys, useSessionStorage } from '../hooks/useSessionStorage';

interface LoginProps {
  userEmail: string;
}

interface LoginResponse {
  data?: {
    accessToken: string;
  };
  error?: any;
}

const ForgetPassword = () => {
  const [login, { error: loginError }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [userToken, setUserToken] = useSessionStorage(StorageKeys.TOKEN, "");
  const navigate = useNavigate();

 

  return (
    <>
      <Formik
        initialValues={loginInitialValue}
        validationSchema={loginValidationSchema}
        onSubmit={async (values: LoginProps, { setSubmitting, resetForm }) => {
          try {
            const loginResult: LoginResponse = await login(values);

            if (loginResult.data && loginResult.data.accessToken) {
              dispatch({ type: 'auth/setCredentials', payload: loginResult.data });
              navigate("/dashboard");
            } else {
              console.error("Access token not found in login response:", loginResult);
            }
            resetForm();
          } catch (error) {
            console.error("An error occurred during login:", error);
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
              alignItems: "center"
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
                    <Typography color='text.secondary' variant='body2'>
                      Please enter the email address you'd like your password reset information sent to.
                    </Typography>
                  </Grid>

                  {/* Email Field */}
                  <Grid item xs={12}>
                    <TextFieldUi
                      fullWidth
                      label="Enter your Email"
                      name="userEmail"
                      type="text"
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
                      loading={isSubmitting}
                      color="primary"
                      label="Send"
                      variant="contained"
                      type="submit"
                    />
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default ForgetPassword;
