import { useSearchParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, CardContent, Grid, IconButton } from '@mui/material';
import TextFieldUi from '../components/ui/TextField';
import { useResetPwdMutation } from '../redux-store/api/injectedApis';
import { VisibilityOff, VisibilityOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSnackbarNotifications } from '../hooks/useSnackbarNotification';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') as string;
  const [
    resetPassword,
    {
      isLoading: resetPwdLoading,
      error: resetPwdErrorObject,
      isSuccess: resetPwdSuccess,
      isError: resetPwdError,
    },
  ] = useResetPwdMutation();
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [notification, setNotification] = useState({
    success: false,
    error: false,
    successMessage: '',
    errorMessage: '',
  });

  useSnackbarNotifications({
    error: resetPwdError,
    errorObject: resetPwdErrorObject,
    errorMessage: 'An error occurred. Please try again.',
    success: resetPwdSuccess,
    successMessage: 'Password Reset Successful',
  });

  useEffect(() => {
    if (resetPwdSuccess) {
      navigate('/login');
    }
  }, [resetPwdSuccess, navigate]);

  useSnackbarNotifications({
    error: notification.error,
    errorObject: resetPwdErrorObject,
    errorMessage: notification.errorMessage,
    success: notification.success,
    successMessage: notification.successMessage,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const newpassword = data.get('newpassword') as string;
    const confirmpassword = data.get('confirmpassword') as string;

    // Trim the password to remove leading/trailing spaces
    const trimmedNewPassword = newpassword.trim();
    const trimmedConfirmPassword = confirmpassword.trim();

    // Password length check (optional but can help reduce unnecessary regex checks)
    if (trimmedNewPassword.length < 8) {
      setNotification({
        success: false,
        error: true,
        successMessage: '',
        errorMessage: 'Password must be at least 8 characters long.',
      });
      return;
    }

    // Updated regex to include lowercase, uppercase, digit, and allow special characters
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (!passwordRegex.test(trimmedNewPassword)) {
      setNotification({
        success: false,
        error: true,
        successMessage: '',
        errorMessage:
          'Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long.',
      });
      return;
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      setNotification({
        success: false,
        error: true,
        successMessage: '',
        errorMessage: 'New Password and Confirm Password do not match!',
      });
      return;
    }

    try {
      const response = await resetPassword({
        token,
        newPassword: trimmedNewPassword,
      }).unwrap();

      if (response.success) {
        setNotification({
          success: true,
          error: false,
          successMessage: 'Password Reset Successful',
          errorMessage: '',
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setNotification({
        success: false,
        error: true,
        successMessage: 'Password has been set successfully',
        errorMessage: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ boxShadow: '4' }}>
          <CardContent sx={{ m: 3 }}>
            <Avatar sx={{ m: 'auto', bgcolor: 'primary.main' }}>
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
              Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextFieldUi
                    endAdornment={
                      <IconButton
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    }
                    required
                    fullWidth
                    type={passwordVisible ? 'text' : 'password'}
                    name="newpassword"
                    label="New Password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldUi
                    endAdornment={
                      <IconButton
                        onClick={() =>
                          setNewPasswordVisible(!newPasswordVisible)
                        }
                      >
                        {newPasswordVisible ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    }
                    required
                    fullWidth
                    type={newPasswordVisible ? 'text' : 'password'}
                    name="confirmpassword"
                    label="Confirm Password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ResetPassword;
