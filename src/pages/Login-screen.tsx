import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ButtonUi from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import palette from "../theme/create-pallet";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { VisibilityOff, VisibilityOutlined } from "@mui/icons-material";
import { AppDispatch } from "../redux-store/store";
import { useLoginMutation } from "../redux-store/auth/loginApi";
import { StorageKeys, useSessionStorage } from "../hooks/useSessionStorage";
import { loginValidationSchema } from "../constants/forms/validations/validationSchema";
import { loginInitialValue } from "../constants/forms/formikInitialValues";
import { LoginProps } from "../types/types";
import { setCredentials } from "../redux-store/auth/authSlice";
import TextFieldUi from "../components/ui/TextField";
import Logo from "../assets/gradient-abstract-logo_23-2150689648-removebg-preview.png";
import { InvoiceContext } from "../invoiceContext/invoiceContext";
interface LoginResponse {
  data?: {
    id: any;
    user: any;
    accessToken: any;
    refresh: any;
    userRole: any;
    userName: any;
    userEmail: string | null;
    userDetails: any;
  };
  error?: any;
}
const Login = () => {
  const context = useContext(InvoiceContext);
  const [login, { error: loginError }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [userToken, setUserToken] = useSessionStorage(StorageKeys.TOKEN, "");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (loginError) {
      alert("Login failed. Please check your credentials and try again.");
    }
  }, [loginError]);

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
              const {
                id,
                user,
                accessToken,
                refresh,
                userRole,
                userName,
                userEmail,
                userDetails,
              } = loginResult.data;
              context.userRole = userRole;
              context.userName = userName;
              context.userEmail = userEmail;
              context.userId = id;
              dispatch(
                setCredentials({
                  id,
                  user,
                  accessToken,
                  refresh,
                  userRole,
                  userName,
                  userEmail,
                  userDetails,
                })
              );
            } else {
              const { user, accessToken } = loginResult.data;
              dispatch(setCredentials({ user, accessToken }));
            }
            // Move the navigation inside the if-else block after dispatching actions
            navigate("/dashboard");
          } else {
            // Handle the case where accessToken is not available
            console.error(
              "Access token not found in login response:",
              loginResult
            );
          }
          resetForm();
        } catch (error) {
          console.error("An error occurred during login:", error);
        }
      }}
    >
      {({ errors, touched, values, handleChange, isSubmitting }) => (
        <Box
          sx={{
            mt: 3,
            backgroundColor: "background.paper",
            flex: "1 1 auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: 500, px: 3, py: "0px", width: "100%" }}>
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "white",
                    color: "white",
                  }}
                  src={Logo}
                />
              </Box>
              <Stack
                spacing={1}
                sx={{
                  mb: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                >
                  Log In
                </Typography>

                {/* <Typography color='text.secondary' variant='body2' >
                  Don&apos;t have an account? &nbsp; <Link style={{ color: palette.primary.main, textDecoration: 'none' }} to="" >
                    Register
                  </Link>
                </Typography> */}
              </Stack>
              <Form noValidate>
                <Stack spacing={3}>
                  <TextFieldUi
                    sx={{ padding: "8px 0" }}
                    fullWidth={false}
                    label="User Email "
                    name="userEmail"
                    type="text"
                    value={values.userEmail}
                    onChange={handleChange}
                    error={touched.userEmail && Boolean(errors.userEmail)}
                    helperText={touched.userEmail && errors.userEmail}
                  />
                  <TextFieldUi
                    sx={{ padding: "8px 0" }}
                    endAdornment={
                      passwordVisible ? (
                        <IconButton
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        >
                          <VisibilityOff />
                        </IconButton>
                      )
                    }
                    fullWidth={false}
                    label="Password"
                    name="password"
                    type={!passwordVisible ? "password" : "text"}
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  <Link
                    style={{
                      color: palette.primary.main,
                      textDecoration: "none",
                    }}
                    to="/forgotpassword" // Change this line
                  >
                    Forgot Password?
                  </Link>
                  {/* <Link
    style={{ color: palette.primary.main, textDecoration: 'none' , marginLeft:'10px'}}
    to="/resetpassword"  // Change this line
  >
    Reset Password?
  </Link> */}
                </FormHelperText>
                <Box sx={{ mt: 2 }}>
                  <ButtonUi
                    fullWidth={true}
                    loading={isSubmitting}
                    label="Login"
                    variant="contained"
                    type="submit"
                    // sx={{
                    //   backgroundColor: "GrayText"
                    // }}
                  />
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
