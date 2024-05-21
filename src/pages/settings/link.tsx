import React, { useEffect } from 'react';
import { useAddLinkMutation} from '../../redux-store/link/linkApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { ToastContainer, toast } from 'react-toastify';
import { linkFields } from '../../constants/form-data/form-data-json';
import { linkInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { linkValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useGetLinkQuery } from '../../redux-store/link/linkApi'


const AddLink: React.FC = () => {
    const [addLink, { isLoading, isSuccess, isError, error }] = useAddLinkMutation();
    const { data: linkList, refetch } = useGetLinkQuery();

    const onSubmit = async (values: any, actions: any) => {
        try {
            actions.resetForm();
            await addLink(values);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        refetch()
    }, [isSuccess])
    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            <ToastContainer />
            <DynamicFormCreate
                headerName='New Link'
                showTable={true}
                fields={linkFields}
                initialValues={linkInitialValues}
                validationSchema={linkValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default AddLink;