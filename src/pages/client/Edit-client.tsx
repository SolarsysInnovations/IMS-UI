import { Box, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonUi from '../../components/ui/Button';
import TextFieldUi from '../../components/ui/TextField';
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { useEffect, useState } from 'react';

interface Values {
    companyName: string;
    email: string;
    phoneNumber: number | undefined;
    primaryContact: string;
    type: string;
}

const EditClient = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [initialClientData, setInitialClientData] = useState<Values | null>(null);

    useEffect(() => {
        const initialClientDataStr = localStorage.getItem('client');
        if (initialClientDataStr) {
            const parsedClientData = JSON.parse(initialClientDataStr);
            console.log(parsedClientData);

            setInitialClientData(parsedClientData);
        }
    }, []);

    const validationSchema = Yup.object({
        companyName: Yup.string()
            .max(255)
            .required('Company name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        phoneNumber: Yup.string()
            .required('Phone number is required'),
        primaryContact: Yup.string()
            .required('Primary contact is required'),
        type: Yup.string()
            .required('Type is required')
    });

    return (
        <Formik
            initialValues={initialClientData || {
                companyName: 'asdas',
                email: '',
                phoneNumber: 0,
                primaryContact: '',
                type: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values: Values, { setSubmitting }) => {
                alert("Form submitted with values:" + JSON.stringify(values));
                // Dispatch action or perform other tasks here
            }}
        >
            {({ errors, touched, values, handleChange, handleSubmit }) => (
                <Box sx={{ mt: 2 }}>
                    <TableHeader headerName='Edit the client details' buttons={[
                        { label: 'Update', icon: Add, onClick: handleSubmit }
                    ]} />
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextFieldUi
                                    label='Company Name'
                                    name='companyName'
                                    type='text'
                                    value={initialClientData?.companyName}
                                    onChange={handleChange}
                                    error={touched.companyName && Boolean(errors.companyName)}
                                    helperText={touched.companyName && errors.companyName}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextFieldUi
                                    label='Email'
                                    name='email'
                                    type='email'
                                    value={initialClientData?.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextFieldUi
                                    label='Phone Number'
                                    name='phoneNumber'
                                    type='number'
                                    value={initialClientData?.phoneNumber}
                                    onChange={handleChange}
                                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextFieldUi
                                    label='Primary Contact'
                                    name='primaryContact'
                                    type='text'
                                    value={initialClientData?.primaryContact}
                                    onChange={handleChange}
                                    error={touched.primaryContact && Boolean(errors.primaryContact)}
                                    helperText={touched.primaryContact && errors.primaryContact}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextFieldUi
                                    label='Type'
                                    name='type'
                                    type='text'
                                    value={initialClientData?.type}
                                    onChange={handleChange}
                                    error={touched.type && Boolean(errors.type)}
                                    helperText={touched.type && errors.type}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            )}
        </Formik>
    );
};

export default EditClient;
