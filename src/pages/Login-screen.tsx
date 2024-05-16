import { Alert, Avatar, Box, Button, FormHelperText, Icon, IconButton, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonUi from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import palette from "../theme/create-pallet";
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import TextFieldLarge from "../components/ui/TextFieldLarge";
import { RemoveRedEyeRounded, VisibilityOff, VisibilityOffRounded, VisibilityOutlined } from "@mui/icons-material";
import { AppDispatch } from "../redux-store/store";
import { useLoginMutation } from "../redux-store/auth/loginApi";
import { LocalStorageKeys, useLocalStorage } from "../hooks/useLocalStorage";
import { loginValidationSchema } from "../constants/forms/validations/validationSchema";
import { loginInitialValue } from "../constants/forms/formikInitialValues";
import { LoginProps } from "../types/types";
import { setCredentials } from "../redux-store/auth/authSlice";

interface LoginResponse {
  data?: {
    user: any;
    accessToken: any;
    refreshToken: any;
    userRole: any;
  };
  error?: any;
}
const Login = () => {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch<AppDispatch>();
  const [userToken, setUserToken] = useLocalStorage(LocalStorageKeys.TOKEN, "");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);



  return (
    <Formik
      initialValues={loginInitialValue}
      validationSchema={loginValidationSchema}
      // validate={() => ({})}
      onSubmit={async (values: LoginProps, { setSubmitting, resetForm }) => {
        try {
          const loginResult: LoginResponse = await login(values);

          // Check if the login was successful and accessToken is available
          if (loginResult.data && "accessToken" in loginResult.data) {
            // Check if the response contains a refresh token
            if (loginResult.data.accessToken) {
              const { user, accessToken, refreshToken, userRole } = loginResult.data;
              dispatch(setCredentials({ user, accessToken, refreshToken,userRole }));
            } else {
              const { user, accessToken } = loginResult.data;
              dispatch(setCredentials({ user, accessToken }));
            }
            // Move the navigation inside the if-else block after dispatching actions
            navigate("/dashboard");

          } else {
            // Handle the case where accessToken is not available
            console.error("Access token not found in login response:", loginResult);
          }
          resetForm();

        } catch (error) {
          console.error("An error occurred during login:", error);
          console.log("Error details:", error); // Add this line to log the error object
        }
      }}
    >
      {({ errors, touched, values, handleChange, isSubmitting }) => (
        <Box
          sx={{
            mt: 3, backgroundColor: "background.paper", flex: "1 1 auto", alignItems: "center", display: "flex", justifyContent: "center",
          }}
        >
          <Box
            sx={{ maxWidth: 500, px: 3, py: "0px", width: "100%", }}
          >
            <div>
              <Box>
                <Avatar
                  sx={
                    {
                      width: 100,
                      height: 100,
                      bgcolor: "primary.main",
                      color: "white",
                    }
                  }
                  src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689648.jpg?size=626&ext=jpg&ga=GA1.1.373236869.1707911526&semt=ais"
                />
              </Box>
              <Stack spacing={1} sx={{ mb: 3 }} >

                <Typography variant='h4'>Login</Typography>
                <Typography color='text.secondary' variant='body2' >
                  Don&apos;t have an account? &nbsp; <Link style={{ color: palette.primary.main, textDecoration: 'none' }} to="" >
                    Register
                  </Link>
                </Typography>
              </Stack>
              <Form noValidate>
                <Stack spacing={3}>
                  <TextFieldLarge
                    fullWidth={false}
                    label='User Name '
                    name='username'
                    type='username'
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextFieldLarge
                    endAdornment={passwordVisible ? <IconButton onClick={() => {
                      setPasswordVisible(!passwordVisible)
                    }}>
                      <VisibilityOutlined />
                    </IconButton> : <IconButton onClick={() => {
                      setPasswordVisible(!passwordVisible)
                    }}>
                      <VisibilityOff />
                    </IconButton>}
                    fullWidth={false}
                    label='Password'
                    name='password'
                    type={!passwordVisible ? 'password' : "text"}
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}><Link style={{ color: palette.primary.main, textDecoration: 'none' }} to="/forgetPassword" >Forget Password ?</Link></FormHelperText>
                <Box sx={{ mt: 2 }}>
                  <ButtonUi loading={isSubmitting} color="primary" label='Login' variant='contained' type='submit' />
                </Box>
              </Form>
            </div>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
