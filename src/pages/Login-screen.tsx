import { useEffect, useState } from "react";
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
import { loginValidationSchema } from "../constants/forms/validations/validationSchema";
import { loginInitialValue } from "../constants/forms/formikInitialValues";
import { LoginProps } from "../types/types";
import { setCredentials } from "../redux-store/auth/authSlice";
import TextFieldUi from "../components/ui/TextField";
import Logo from "../assets/gradient-abstract-logo_23-2150689648-removebg-preview.png";
import { useInVoiceContext } from "../invoiceContext/invoiceContext";
interface LoginResponse {
  data?: {
    id: any;
    accessToken: any;
    refresh: any;
    userRole: any;
    userName: any;
    userEmail: string | null;
  };
  error?: any;
}
const Login = () => {
  const [login, { error: loginError }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const context = useInVoiceContext();

  useEffect(() => {
    if (loginError) {
      alert("Login failed. Please check your credentials and try again.");
    }
  }, [loginError]);

  return (
    <Formik
      initialValues={loginInitialValue}
      validationSchema={loginValidationSchema}
      onSubmit={async (values: LoginProps, { resetForm }) => {
        try {
          const loginResult: LoginResponse = await login(values);

          if (loginResult.data && "accessToken" in loginResult.data) {
            if (loginResult.data.accessToken) {
              const {
                id,
                accessToken,
                refresh,
                userRole,
                userName,
                userEmail,
              } = loginResult.data;
              context.userDetails.userId = id;
              context.userDetails.userName = userName;
              context.userDetails.userEmail = userEmail;
              context.userDetails.userRole = userRole;
              dispatch(
                setCredentials({
                  id,
                  accessToken,
                  refresh,
                  userRole,
                  userName,
                  userEmail,
                })
              );
            } else {
              const { accessToken } = loginResult.data;
              dispatch(setCredentials({ accessToken }));
            }
            navigate("/dashboard");
          } else {
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
                    to="/forgotpassword"
                  >
                    Forgot Password?
                  </Link>
                </FormHelperText>
                <Box sx={{ mt: 2 }}>
                  <ButtonUi
                    fullWidth={true}
                    loading={isSubmitting}
                    label="Login"
                    variant="contained"
                    type="submit"
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
