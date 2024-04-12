import React, { useEffect } from 'react';
import { useAddCustomerMutation } from '../../redux-store/customer/customerApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { toast } from 'react-toastify';
import { customerFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';

const CustomerCreate: React.FC = () => {
    const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();
    const onSubmit = async (values: any, actions: any) => {
        try {
            console.log(values);
            actions.resetForm();
            await addCustomer(values);
            toast.success("successfully created the new customer", toastConfig)
            alert("created the new customer")
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully created the new customer", toastConfig)
        }
    }, [isSuccess]);
    return (
        <div>
            {/* Use DynamicCustomerCreate with the required props */}
            <DynamicFormCreate
                fields={customerFields}
                initialValues={customerInitialValues}
                validationSchema={customerValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default CustomerCreate;
