import AppProvider from './provider';
import { AppRouter } from './routes';

const InvoiceApp = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default InvoiceApp;
