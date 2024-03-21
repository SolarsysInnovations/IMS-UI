import React, { useEffect, useState } from 'react'
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import TextFieldUi from '../../components/ui/TextField';
import { AppDispatch, RootState } from '../../redux-store/store'
import RadioUi from '../../components/ui/RadioGroup';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ToastUi from '../../components/ui/ToastifyUi';
import SelectDropdown from '../../components/ui/SelectDropdown';
import { validationSchema } from '../../constants/forms/validations/validationSchema';
import { InvoiceInitialValueProps, invoiceInitialValue } from '../../constants/forms/formikInitialValues';
import { fetchCustomerList } from '../../redux-store/customer/fetchClientList';

const CreateInvoice = () => {

    const { data: customerList } = useSelector((state: RootState) => state.customerList);

    const companyOptions = customerList.map((customer: any) => ({
        value: customer?.companyName,
        label: customer?.companyName,
    }))

    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    // dispatch(fetchClientList());
    const navigate = useNavigate();

    const genderOptions = [
        { value: "Regular", label: "Regular" },
        { value: "Onetime", label: "Onetime" },
    ]
    const paymentTerms = [
        { value: "Net 30", label: "Net 30" },
        { value: "Net 45", label: "Net 45" },
        { value: "Due On Receipt", label: "Due On Receipt" },
        { value: "Custom", label: "Custom" },
    ]
    useEffect(() => {
        dispatch(fetchCustomerList())
    }, [dispatch])
    const options = [{ value: "arun", label: "arun" }]
    const countries = [{ value: "uk", label: "uk" },
    { value: "australia", label: "australia" }];
    const gstType = [
        { value: "Local", label: "Local" },
        { value: "Interstate", label: "Interstate" },
        { value: "SEZ", label: "SEZ" },
    ];

    return (
        <div>
            <Formik
                initialValues={invoiceInitialValue}
                validationSchema={validationSchema}
                onSubmit={async (values: InvoiceInitialValueProps, { setSubmitting, resetForm }) => {
                    try {
                        console.log(values);
                        // dispatch(customerCreate(values))
                        // resetForm();
                    } catch (error) {
                        console.error("An error occurred during login:", error);
                    }
                    finally {
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
                                        <RadioUi value={values.invoiceType} onChange={handleChange} groupName='type' options={genderOptions} label='Invoice type' />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            required={true}
                                            fullWidth={false}
                                            label='Invoice Number'
                                            name='invoiceNumber'
                                            type="number"
                                            value={values.invoiceNumber}
                                            onChange={handleChange}
                                            error={touched.invoiceNumber && Boolean(errors.invoiceNumber)}
                                            helperText={touched.invoiceNumber && errors.invoiceNumber}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <SelectDropdown
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    console.log(newValue)
                                                    setFieldValue("companyName", newValue.value)
                                                } else {
                                                    console.log("clearing the value")
                                                    setFieldValue("companyName", "")
                                                }
                                            }}
                                            options={companyOptions}
                                            value={values.companyName ? { value: values.companyName, label: values.companyName } : null}
                                            labelText='Customer Name'
                                            error={touched.companyName && Boolean(errors.companyName)}
                                            helperText={touched.companyName && errors.companyName}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <SelectDropdown
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    console.log(newValue)
                                                    setFieldValue("gstType", newValue.value)
                                                } else {
                                                    console.log("clearing the value")
                                                    setFieldValue("gstType", "")
                                                }
                                            }}
                                            options={gstType}
                                            value={values.gstType ? { value: values.gstType, label: values.gstType } : null}
                                            labelText='Gst Type'
                                            error={touched.gstType && Boolean(errors.gstType)}
                                            helperText={touched.gstType && errors.gstType}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Gst Percentage'
                                            name='gstPercentage'
                                            type="text"
                                            value={values.gstPercentage}
                                            onChange={handleChange}
                                            error={touched.gstPercentage && Boolean(errors.gstPercentage)}
                                            helperText={touched.gstPercentage && errors.gstPercentage}
                                        />
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
                                <Grid item xs={4}>
                                    <Box>
                                        {/* <SelectDropdown
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
                                        /> */}
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Invoice Date'
                                            name='invoiceDate'
                                            type="text"
                                            value={values.invoiceDate}
                                            onChange={handleChange}
                                            error={touched.invoiceDate && Boolean(errors.invoiceDate)}
                                            helperText={touched.invoiceDate && errors.invoiceDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='GstIn Number'
                                            name='gstInNumber'
                                            type="text"
                                            value={values.gstInNumber}
                                            onChange={handleChange}
                                            error={touched.gstInNumber && Boolean(errors.gstInNumber)}
                                            helperText={touched.gstInNumber && errors.gstInNumber}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <SelectDropdown
                                            labelText='state'
                                            value={values.paymentTerms ? { value: values.paymentTerms, label: values.paymentTerms } : null}
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
                                            error={touched.paymentTerms && Boolean(errors.paymentTerms)}
                                            helperText={touched.paymentTerms && errors.paymentTerms}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Due Date'
                                            name='dueDate'
                                            type="text"
                                            value={values.dueDate}
                                            onChange={handleChange}
                                            error={touched.dueDate && Boolean(errors.dueDate)}
                                            helperText={touched.dueDate && errors.dueDate}
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
                                            label='Invoice Status'
                                            name='invoiceStatus'
                                            type="text"
                                            value={values.invoiceStatus}
                                            onChange={handleChange}
                                            error={touched.invoiceStatus && Boolean(errors.invoiceStatus)}
                                            helperText={touched.invoiceStatus && errors.invoiceStatus}
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

export default CreateInvoice