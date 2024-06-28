import React from 'react'
import InvoiceFormScreen from './InvoiceFormScreen'
import { useSelector } from 'react-redux';


const InvoiceCreateScreen = () => {

    const invoiceValue = useSelector((state: any) => state.globalState.data);

    console.log("invoiceValue", invoiceValue);

    return (
        <>
            <InvoiceFormScreen invoiceValue={invoiceValue} />
        </>
    )
}

export default InvoiceCreateScreen