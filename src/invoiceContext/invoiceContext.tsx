import { createContext } from "react";
import { InvoiceContextType } from "./invoiceContextTypes";

let invoiceContextValue: InvoiceContextType = {
    userId: "",
    userName: "",
    userEmail: "",
    userRole: "GUEST",
    comPanyName: "",
    comPanyId: "",
};

const InvoiceContext = createContext(invoiceContextValue);

function InvoiceContextProvider({ children }: { readonly children: React.ReactNode }) {
    return (
      <InvoiceContext.Provider value={invoiceContextValue}>
        {children}
      </InvoiceContext.Provider>
    );
}

export { InvoiceContext, InvoiceContextProvider };