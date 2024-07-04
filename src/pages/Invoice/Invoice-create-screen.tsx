import React, { useEffect, useState } from 'react'
import InvoiceFormScreen from './InvoiceFormScreen'
import { useSelector } from 'react-redux';


const InvoiceCreateScreen = () => {

    const invoiceValue = useSelector((state: any) => state.globalState.data);
    const [key, setKey] = useState<number>(0);

    console.log("invoiceValue", invoiceValue);

    useEffect(() => {
        setKey((prev) => prev + 1)
    }, [invoiceValue]);

    return (
        <>
            <InvoiceFormScreen key={key} invoiceValue={invoiceValue} />
        </>
    )
}

export default InvoiceCreateScreen