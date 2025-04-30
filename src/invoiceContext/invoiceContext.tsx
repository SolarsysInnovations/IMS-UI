import { createContext, useContext } from "react";
import { InvoiceContextType } from "./invoiceContextTypes";

let invoiceContextValue: InvoiceContextType = {
  userDetails: {
    userId: "",
    userName: "",
    userEmail: "",
    userMobile: "",
    description: "",
    userRole: "GUEST",
  },
  companyDetails: {
    companyName: "",
    companyId: "",
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
