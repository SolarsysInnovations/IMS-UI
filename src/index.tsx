import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import SnackBarUi from './components/ui/snackbarUi';
import { InvoiceContextProvider } from './context/invoiceContext';
import App from './app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <InvoiceContextProvider>
      <Provider store={store}>
        <App />
        <SnackBarUi />
      </Provider>
    </InvoiceContextProvider>
  </QueryClientProvider>,
);
