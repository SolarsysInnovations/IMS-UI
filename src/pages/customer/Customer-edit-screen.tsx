import { Box, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextFieldUi from '../../components/ui/TextField';
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../redux-store/store';
import { toast } from 'react-toastify';
import ToastUi from '../../components/ui/ToastifyUi';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';
import RadioUi from '../../components/ui/RadioGroup';
import formInitialValues from '../../constants/forms/formikInitialValues';
import SelectDropdown from '../../components/ui/SelectDropdown';
import { useUpdateCustomerMutation } from '../../redux-store/customer/customerApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { CreateCustomerProps } from '../../types/types';



const CustomerEdit = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [initialCustomerData, setInitialClientData] = useState<CreateCustomerProps | null>(null);
    const [updateCustomer, { isLoading, error, isSuccess }] = useUpdateCustomerMutation();
    useEffect(() => {
        const initialCustomerData = localStorage.getItem('customer');
        if (initialCustomerData) {
            const parsedClientData = JSON.parse(initialCustomerData);
            console.log(parsedClientData);

            setInitialClientData(parsedClientData);
        }
    }, []);

    const genderOptions = [
        { value: "Individual", label: "Individual" },
        { value: "Business", label: "Business" },
    ]

    const options = [{ value: "arun", label: "arun" }]
    const countries = [{ value: "uk", label: "uk" },
    { value: "australia", label: "australia" }];

    useEffect(() => {
        if (isSuccess) { toast.success("Successfully updated the customer", toastConfig); }
    }, [isSuccess]);

    return (
        <Formik
            enableReinitialize
            initialValues={initialCustomerData || formInitialValues}
            // validate={() => ({})}
            validationSchema={customerValidationSchema}
            onSubmit={async (values: CreateCustomerProps, { setSubmitting, resetForm }) => {
                try {
                    const id: number | undefined = values.id;
                    console.log(id);
                    if (id === undefined) {
                        console.error('ID is undefined');
                    } else {
                        await updateCustomer({ id, customer: values });
                        resetForm();
                        setInitialClientData(null);
                        localStorage.removeItem('client');
                    }
                } catch (error) {
                    console.error("An error occurred during login:", error);
                }
                finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => (
                <Box sx={{ mt: 2 }}>
                    <ToastUi autoClose={1000} />
                    <TableHeader headerName='Edit the Customer details' buttons={[
                        { label: 'Back', icon: Add, onClick: () => { navigate(-1) } },
                        { label: 'Update', icon: Add, onClick: handleSubmit }

                    ]} />
                    <Form id="createClientForm" noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box>
                                    <RadioUi value={values.customerType} errorMsg={touched.customerType && errors.customerType} onChange={handleChange} groupName='type' options={genderOptions} label='customer type' />
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
                                        label='Customer Phone Number'
                                        name='customerPhone'
                                        type="number"
                                        value={values.customerPhone}
                                        onChange={handleChange}
                                        error={touched.customerPhone && Boolean(errors.customerPhone)}
                                        helperText={touched.customerPhone && errors.customerPhone}
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
                                        options={options}
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
                                        type="number"
                                        value={values.contactPhone}
                                        onChange={handleChange}
                                        error={touched.contactPhone && Boolean(errors.contactPhone)}
                                        helperText={touched.contactPhone && errors.contactPhone}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                </Box>
            )}
        </Formik>
    );
};

export default CustomerEdit;
