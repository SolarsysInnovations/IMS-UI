import { ReactElement, useEffect } from 'react';
import {
  InvoiceContextProvider,
  useInVoiceContext,
} from '../context/invoiceContext';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';
import { AuthProvider } from '../context/authContext';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import { selectCurrentId } from '../redux-store/auth/authSlice';
import { useGetUserRoleMutation } from '../redux-store/api/injectedApis';
import { InvoiceContextType } from '../context/types/InvoiceContextType';

type AppProviderProps = {
  children: ReactElement;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const context = useInVoiceContext();
  const id = useSelector(selectCurrentId);
  const [getUserRole, { isLoading }] = useGetUserRoleMutation();

  function init(context: InvoiceContextType) {
    if (id) {
      getUserRole(id)
        .unwrap()
        .then((response) => {
          context.userDetails.userId = id;
          context.userDetails.userRole = response.userRole;
          context.userDetails.userName = response.userName;
          context.userDetails.userEmail = response.userEmail;
          context.userDetails.userMobile = response.userMobile;
          context.userDetails.description = response.description;
          context.companyDetails.companyId = response.companyId;
        })
        .catch((error) => {
          console.error('Error fetching user role:', error);
        });
    }
    return context;
  }

  useEffect(() => {
    init(context);
  }, [context, id]);

  if (isLoading) {
    return (
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        height={'100vh'}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <InvoiceContextProvider>
        <AuthProvider>{children}</AuthProvider>
      </InvoiceContextProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
