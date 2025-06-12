import { useNavigate, useSearchParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, CardContent, Grid, IconButton } from '@mui/material';
import TextFieldUi from '../components/ui/TextField';
import { VisibilityOff, VisibilityOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../api/services';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') as string;
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const newpassword = data.get('newpassword') as string;
    // const confirmpassword = data.get('confirmpassword') as string;
    const trimmedNewPassword = newpassword.trim();
    // const trimmedConfirmPassword = confirmpassword.trim();

    try {
      resetPasswordMutation.mutate({
        token,
        newPassword: trimmedNewPassword,
      });
    } catch (error) {
      console.error('An error occurred. Please try again.', error);
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
