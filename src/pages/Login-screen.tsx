import { Alert, Avatar, Box, Button, FormHelperText, Icon, IconButton, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonUi from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import palette from "../theme/create-pallet";
import TabUi from "../components/ui/Tabs";
import tabs from "../constants/data";
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { setPassword, setUsername } from "../redux-store/login-slice";
import TextFieldLarge from "../components/ui/TextFieldLarge";
import { RemoveRedEyeRounded, VisibilityOff, VisibilityOffRounded, VisibilityOutlined } from "@mui/icons-material";
import { userLogin } from "../redux-store/login-slice";
import { serializeFormValues } from "../services/utils/serialize";
import { AppDispatch } from "../redux-store/store";
import { useGetCustomersQuery } from "../redux-store/customer/customerApi";

interface Values {
  email: string;
  password: string;
}

const Login = () => {
  const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string()
      .max(255)
      .required('Password is required'),
  });

  useEffect(() => {
    refetch();
  }, [dispatch, refetch]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}

      onSubmit={async (values: Values, { setSubmitting, resetForm }) => {
        try {
          console.log(values);
          dispatch(setUsername(values.email));
          dispatch(setPassword(values.password));
          const loginResult: any = await dispatch(userLogin(values));
          resetForm();

          if (loginResult) {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("An error occurred during login:", error);
        }
        finally {
          setSubmitting(false);
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
              <Box sx={{ mb: 2 }}>

              </Box>
              <Form noValidate>
                <Stack spacing={3}>
                  <TextFieldLarge
                    fullWidth={false}
                    label='Email Address'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                <Box sx={{ mt: 1 }}>
                  <ButtonUi label='skip login' />
                </Box>
                <Alert
                  severity='info'
                  sx={{ mt: 2, mb: 2 }}
                >
                  <div>
                    You can use <b>demo@Arun.io</b> and password <b>Password123!</b>
                  </div>
                </Alert>
              </Form>
            </div>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
