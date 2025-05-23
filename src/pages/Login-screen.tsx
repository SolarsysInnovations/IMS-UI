import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ButtonUi from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import palette from '../theme/create-pallet';
import { Form, Formik } from 'formik';
import { VisibilityOff, VisibilityOutlined } from '@mui/icons-material';
import { loginValidationSchema } from '../constants/forms/validations/validationSchema';
import { loginInitialValue } from '../constants/forms/formikInitialValues';
import { LoginProps } from '../types/types';
import TextFieldUi from '../components/ui/TextField';
import Logo from '../assets/gradient-abstract-logo_23-2150689648-removebg-preview.png';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/services';
import { useInVoiceContext } from '../context/invoiceContext';

const Login = () => {
  const navigate = useNavigate();
  const context = useInVoiceContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      context.userDetails.userId = response.id;
      context.userDetails.userName = response.userName;
      context.userDetails.userEmail = response.userEmail;
      context.userDetails.userRole = response.userRole;
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed: ', error);
    },
  });

  const isError = mutation.isError;
  const isLoading = mutation.isPending;
  const isSuccess = mutation.isSuccess;

  useEffect(() => {
    if (isError) {
      alert('Login failed. Please check your credentials and try again.');
    }
  }, [isError]);

  return (
    <Formik
      initialValues={loginInitialValue}
      validationSchema={loginValidationSchema}
      onSubmit={async (values: LoginProps, { resetForm }) => {
        try {
          mutation.mutate(values);
          if (isSuccess) {
            resetForm();
          }
        } catch (error) {
          console.error('An error occurred during login:', error);
        }
      }}
    >
      {({ errors, touched, values, handleChange }) => (
        <Box
          sx={{
            mt: 3,
            backgroundColor: 'background.paper',
            flex: '1 1 auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ maxWidth: 500, px: 3, py: '0px', width: '100%' }}>
            <div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'white',
                    color: 'white',
                  }}
                  src={Logo}
                />
              </Box>
              <Stack
                spacing={1}
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '30px',
                  }}
                >
                  Log In
                </Typography>
              </Stack>
              <Form noValidate>
                <Stack spacing={3}>
                  <TextFieldUi
                    sx={{ padding: '8px 0' }}
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
                    sx={{ padding: '8px 0' }}
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
                    type={!passwordVisible ? 'password' : 'text'}
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
                      textDecoration: 'none',
                    }}
                    to="/forgotpassword"
                  >
                    Forgot Password?
                  </Link>
                </FormHelperText>
                <Box sx={{ mt: 2 }}>
                  <ButtonUi
                    fullWidth={true}
                    loading={isLoading}
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
