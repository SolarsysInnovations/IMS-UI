import { createContext, useContext } from 'react';
import { InvoiceContextType } from './invoiceContextTypes';
import { Roles } from '../constants/Enums';

let invoiceContextValue: InvoiceContextType = {
  userDetails: {
    userId: '',
    userName: '',
    userEmail: '',
    userMobile: '',
    description: '',
    userRole: Roles.GUEST,
  },
  companyDetails: {
    companyName: '',
    companyId: '',
  },
};

const InvoiceContext = createContext(invoiceContextValue);
const useInVoiceContext = () => useContext(InvoiceContext);

function InvoiceContextProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <InvoiceContext.Provider value={invoiceContextValue}>
      {children}
    </InvoiceContext.Provider>
  );
}

export { useInVoiceContext, InvoiceContextProvider };
