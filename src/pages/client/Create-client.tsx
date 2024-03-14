import React, { useState } from 'react'
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import GridDataEntry from '../../components/GridDataEntry/GridDataEntry';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientList } from '../../redux-store/client/fetchClientList';
import { Box, Button, Grid } from '@mui/material';
import TextFieldUi from '../../components/ui/TextField';
import { updateEmail, updateName } from '../../redux-store/client/clientSlice';
import { AppDispatch, RootState } from '../../redux-store/store';
import RadioUi from '../../components/ui/RadioGroup';
import { createClient, updateCustomerType } from '../../redux-store/client/createClientSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ToastUi from '../../components/ui/ToastifyUi';
import { toast } from 'react-toastify';
const CreateClient = () => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    // dispatch(fetchClientList());
    const buttons = [
        { label: 'Back', icon: Add, onClick: () => navigate(-1) },
        { label: 'Save', icon: Add, onClick: () => navigate("/client/create") },
    ];
    const navigate = useNavigate();
    interface createClientProps {
        primaryContact: string;
        type: string;
        companyName: string;
        email: string;
        phoneNumber: number;
    };

    const genderOptions = [
        { value: "Individual", label: "Individual" },
        { value: "Business", label: "Business" },
    ]

    const validationSchema = Yup.object({
        primaryContact: Yup.string()
            .max(255)
            .required('primaryContact is required'),
        type: Yup.string()
            .max(255)
            .required('type is required'),
        companyName: Yup.string()
            .max(255)
            .required('companyName is required'),
        email: Yup.string()
            .max(255)
            .required('email is required'),
        phoneNumber: Yup.number()
            .min(8, "too short")
            .required('phoneNumber is required'),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    primaryContact: "",
                    type: "",
                    companyName: "",
                    email: "",
                    phoneNumber: 0,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values: createClientProps, { setSubmitting, resetForm }) => {
                    try {
                        console.log(values);
                        dispatch(createClient(values))
                        resetForm();
                        toast.success("created client successfully", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        })

                    } catch (error) {
                        console.error("An error occurred during login:", error);
                    }
                    finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, touched, values, handleChange, handleSubmit }) => (
                    <div>
                        <ToastUi autoClose={2000} />
                        <TableHeader headerName={pathname} buttons={[
                            { label: 'Back', icon: Add, onClick: () => navigate(-1) },
                            { label: 'Save', icon: Add, onClick: handleSubmit },
                        ]} />
                        <Form id="createClientForm" noValidate >
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Box>
                                        <RadioUi value={values.type} errorMsg={touched.type && errors.type} onChange={handleChange} groupName='type' options={genderOptions} label='customer type' />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Primary Contact'
                                            name='primaryContact'
                                            type="text"
                                            value={values.primaryContact}
                                            onChange={handleChange}
                                            error={touched.primaryContact && Boolean(errors.primaryContact)}
                                            helperText={touched.primaryContact && errors.primaryContact}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Company Name'
                                            name='companyName'
                                            type="text"
                                            value={values.companyName}
                                            onChange={handleChange}
                                            error={touched.companyName && Boolean(errors.companyName)}
                                            helperText={touched.companyName && errors.companyName}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Email'
                                            name='email'
                                            type="text"
                                            value={values.email}
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Phone Number'
                                            name='phoneNumber'
                                            type="text"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                            helperText={touched.phoneNumber && errors.phoneNumber}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default CreateClient