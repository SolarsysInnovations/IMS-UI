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
import { customerValidationSchema, validationSchema } from '../../constants/forms/validations/validationSchema';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import customerInitialValue from '../../constants/forms/formikInitialValues';
import { useAddCustomerMutation } from '../../redux-store/customer/customerApi';
import { CreateCustomerProps } from '../../types/types';

const CustomerCreate = () => {

    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    // dispatch(fetchClientList());
    const navigate = useNavigate();
    const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();
    const genderOptions = [
        { value: "Individual", label: "Individual" },
        { value: "Business", label: "Business" },
    ]
    // Monthly, Annual, Quarterly, Due on receipt,
    // Net 30, Net 45,
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
                        <TableHeader headerName={pathname} buttons={[
                            { label: 'Back', icon: Add, onClick: () => navigate(-1) },
                            { label: 'Save', icon: Add, onClick: handleSubmit },
                        ]} />
                        <Form id="createClientForm" noValidate >
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Box>
                                        <RadioUi value={values.customerType} errorMsg={touched.customerType && errors.customerType} onChange={(newValue: any) => {
                                            if (newValue) {
                                                console.log(newValue.target.value);
                                                setFieldValue('customerType', newValue.target.value);
                                            } else {
                                                setFieldValue('customerType', "")
                                            }
                                        }} groupName='type' options={genderOptions} label='customer type' />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            required={true}
                                            fullWidth={false}
                                            label='Customer Name'
                                            name='customerName'
                                            type="text"
                                            value={values.customerName}
                                            onChange={handleChange}
                                            error={touched.customerName && Boolean(errors.customerName)}
                                            helperText={touched.customerName && errors.customerName}
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
                                            label='customer Email'
                                            name='customerEmail'
                                            type="text"
                                            value={values.customerEmail}
                                            onChange={handleChange}
                                            error={touched.customerEmail && Boolean(errors.customerEmail)}
                                            helperText={touched.customerEmail && errors.customerEmail}
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
                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="body2" color="initial">Other Details</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <SelectDropdown
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    console.log(newValue)
                                                    setFieldValue("paymentTerms", newValue.value)
                                                } else {
                                                    console.log("clearing the value")
                                                    setFieldValue("paymentTerms", "")
                                                }
                                            }}
                                            options={paymentTerms}
                                            value={values.paymentTerms ? { value: values.paymentTerms, label: values.paymentTerms } : null}
                                            labelText='Payment Terms'
                                            error={touched.paymentTerms && Boolean(errors.paymentTerms)}
                                            helperText={touched.paymentTerms && errors.paymentTerms}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="body2" color="initial">Address</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <SelectDropdown
                                            labelText='country / region'
                                            value={values.country ? { value: values.country, label: values.country } : null}
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    console.log(newValue)
                                                    setFieldValue("country", newValue.value)
                                                } else {
                                                    console.log("clearing country");
                                                    setFieldValue("country", "")
                                                }
                                            }}
                                            options={countries}
                                            error={touched.country && Boolean(errors.country)}
                                            helperText={touched.country && errors.country}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Address'
                                            name='address'
                                            type="text"
                                            value={values.address}
                                            onChange={handleChange}
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='city'
                                            name='city'
                                            type="text"
                                            value={values.city}
                                            onChange={handleChange}
                                            error={touched.city && Boolean(errors.city)}
                                            helperText={touched.city && errors.city}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <SelectDropdown
                                            labelText='state'
                                            value={values.state ? { value: values.state, label: values.state } : null}
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    console.log(newValue)
                                                    setFieldValue("state", newValue.value)
                                                } else {
                                                    console.log("clearing country");
                                                    setFieldValue("state", "")
                                                }
                                            }}
                                            options={countries}
                                            error={touched.state && Boolean(errors.state)}
                                            helperText={touched.state && errors.state}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='pin code'
                                            name='pinCode'
                                            type="text"
                                            value={values.pinCode}
                                            onChange={handleChange}
                                            error={touched.pinCode && Boolean(errors.pinCode)}
                                            helperText={touched.pinCode && errors.pinCode}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="body2" color="initial">Contact Person</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Contact Name'
                                            name='contactName'
                                            type="text"
                                            value={values.contactName}
                                            onChange={handleChange}
                                            error={touched.contactName && Boolean(errors.contactName)}
                                            helperText={touched.contactName && errors.contactName}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Contact Email'
                                            name='contactEmail'
                                            type="text"
                                            value={values.contactEmail}
                                            onChange={handleChange}
                                            error={touched.contactEmail && Boolean(errors.contactEmail)}
                                            helperText={touched.contactEmail && errors.contactEmail}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Contact Phone'
                                            name='contactPhone'
                                            type="text"
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

export default CustomerCreate