import { RouterProvider } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import AppProvider from './provider';
import { router } from './routes';
import { useInit } from './init';

const App = () => {
  const isReady = useInit();

  if (!isReady) {
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
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
