import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { forgetPwdValidationSchema } from '../constants/forms/validations/validationSchema';
import { forgetPwdInitialValue } from '../constants/forms/formikInitialValues';
import TextFieldUi from '../components/ui/TextField';
import ButtonUi from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import HelpIcon from '@mui/icons-material/Help';
import { useMutation } from '@tanstack/react-query';
import { forgetPassword } from '../api/services';

interface ForgetPasswordProps {
  userEmail: string;
}

const ForgetPassword: React.FC = () => {
  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {
      navigate('/');
    },
  });

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={forgetPwdInitialValue}
      validationSchema={forgetPwdValidationSchema}
      onSubmit={async (
        values: ForgetPasswordProps,
        { setSubmitting, resetForm },
      ) => {
        try {
          forgetPasswordMutation.mutate(values);
          if (forgetPasswordMutation.isSuccess) {
            resetForm();
          }
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

                      <Grid item xs={12}>
                        <TextFieldUi
                          fullWidth
                          label="Enter your Email *"
                          name="userEmail"
                          type="email"
                          value={values.userEmail}
                          onChange={handleChange}
                          error={touched.userEmail && Boolean(errors.userEmail)}
                          helperText={touched.userEmail && errors.userEmail}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <ButtonUi
                          fullWidth
                          loading={
                            isSubmitting || forgetPasswordMutation.isPending
                          }
                          color="primary"
                          label="Send"
                          variant="contained"
                          type="submit"
                        />
                      </Grid>
                    </Grid>
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
