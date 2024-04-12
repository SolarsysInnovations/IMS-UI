import React, { useEffect, useState } from 'react'
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import TextFieldUi from '../../components/ui/TextField';
import { AppDispatch } from '../../redux-store/store'
import RadioUi from '../../components/ui/RadioGroup';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ToastUi from '../../components/ui/ToastifyUi';
import { toast } from 'react-toastify';
import TabUi from '../../components/ui/Tabs';
import SelectDropdown from '../../components/ui/SelectDropdown';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import customerInitialValue from '../../constants/forms/formikInitialValues';
import { useAddCustomerMutation } from '../../redux-store/customer/customerApi';
import { CreateCustomerProps } from '../../types/types';

const CreateServices = () => {

    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const navigate = useNavigate();
    const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();
    const genderOptions = [
        { value: "Individual", label: "Individual" },
        { value: "Business", label: "Business" },
    ]
    const paymentTerms = [{ value: "Monthly", label: "Monthly" },
    { value: "Annual", label: "Annual" },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Due on receipt", label: "Due on receipt" },
    { value: "Net 30", label: "Net 30" },
    { value: "Net 45", label: "Net 45" },
    ]
    const countries = [{ value: "uk", label: "uk" },
    { value: "australia", label: "australia" }];

    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully created the new customer", toastConfig)
        }
    }, [isSuccess])
    return (
        
        <div>
            <Formik
                initialValues={customerInitialValue}
                // validate={() => ({})}
                validationSchema={customerValidationSchema}
                onSubmit={async (values: CreateCustomerProps, { setSubmitting, resetForm }) => {
                    try {
                        // console.log(values);
                        const result = await addCustomer(values);
                        if ('data' in result) {
                            resetForm();
                        } else {
                            console.error("An error occurred during customer creation:", result.error);
                        }
                    } catch (error) {
                        console.error("An error occurred during customer creation:", error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => (
                    <div>
                        <ToastUi autoClose={2000} />
                        <TableHeader buttons={[
                            { label: 'Back', icon: Add, onClick: () => navigate(-1) },
                            { label: 'Save', icon: Add, onClick: handleSubmit },
                           
                        ]} />
                        <ToastUi autoClose={2000} />
                       <h2>Invoice-Services</h2>
                        <Form id="createClientForm" noValidate >
                            <Grid container spacing={2}>
                             
                                
                            <Grid item xs={10}>
                                   
                                </Grid>
                                <Grid item xs={4}>
                                <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Service Accounting Code'
                                            name=''
                                            type="number"
                                            value={values.address}
                                            onChange={handleChange}
                                          
                                        />
                                    </Box>
                                    
                                </Grid>
                                
                               
                                <Grid item xs={10}>
                                   
                                </Grid>
                                <Grid item xs={4}>
                                <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Description'
                                            name=''
                                            type="text"
                                            value={values.address}
                                            onChange={handleChange}
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                        />
                                    </Box>
                                    
                                </Grid>
                                
                                <Grid item xs={12}>
                                   
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Amount'
                                            name=''
                                            type='number'
                                            value={values.contactPhone}
                                            onChange={handleChange}
                                            error={touched.contactPhone && Boolean(errors.contactPhone)}
                                            helperText={touched.contactPhone && errors.contactPhone}
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
export default CreateServices;
