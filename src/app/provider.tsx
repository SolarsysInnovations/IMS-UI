import { ReactElement } from 'react';

import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';

type AppProviderProps = {
  children: ReactElement;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppProvider;
