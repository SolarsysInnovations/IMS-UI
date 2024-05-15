import React, { useEffect, useState } from 'react';
import { useAddCustomerMutation } from '../../redux-store/customer/customerApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { ToastContainer, toast } from 'react-toastify';
import { customerFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';
import useSuccessToast from '../../hooks/useToast';
import SnackBarUi from '../../components/ui/Snackbar';

const CustomerCreate: React.FC = () => {
    const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();
    const [data, setData] = useState<any>();

    const updateFormValue = (setFieldValue: Function) => {
        // if (data?.customerName === "arun") {
        //     setFieldValue("companyName", "arun");
        // }
    };
    const onSubmit = async (values: any, actions: any) => {
        try {
            await addCustomer(values);
            actions.resetForm();
        } catch (error) {
            console.log(error);
        }
    };
    useSuccessToast({ isSuccess, message: "successfully created the customer" })
    return (
        <div>
            {/* Use DynamicCustomerCreate with the required props */}
            <ToastContainer />
            <DynamicFormCreate
                setData={setData}
                updateFormValue={updateFormValue}
                showTable={true}
                fields={customerFields}
                initialValues={customerInitialValues}
                validationSchema={customerValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default CustomerCreate;
