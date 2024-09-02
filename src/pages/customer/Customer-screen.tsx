import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomerCreate from './Customer-create-screen';

const CustomerScreen = () => {

    const customerInitialValues = useSelector((state: any) => state.customerState.data);
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey((prev) => prev + 1)
    }, [customerInitialValues]);

    return (
        <div>
            <CustomerCreate key={key} customerEditInitialValues={customerInitialValues} />
        </div>
    )
}

export default CustomerScreen