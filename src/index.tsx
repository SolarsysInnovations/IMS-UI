import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
      <App />
    </InvoiceContextProvider>
  </QueryClientProvider>,
);
