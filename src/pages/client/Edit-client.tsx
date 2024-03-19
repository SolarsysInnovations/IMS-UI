import { Box, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonUi from '../../components/ui/Button';
import TextFieldUi from '../../components/ui/TextField';
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { useEffect, useState } from 'react';
import { editUpdate } from '../../redux-store/client/editUpdate';
import { AppDispatch } from '../../redux-store/store';
import { toast } from 'react-toastify';
import ToastUi from '../../components/ui/ToastifyUi';
import { validationSchema } from '../../constants/forms/validations/validationSchema';
import RadioUi from '../../components/ui/RadioGroup';
import formInitialValues, { createClientProps } from '../../constants/forms/formikInitialValues';
import SelectDropdown from '../../components/ui/SelectDropdown';



const EditClient = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [initialClientData, setInitialClientData] = useState<createClientProps | null>(null);

    useEffect(() => {
        const initialClientData = localStorage.getItem('client');
        if (initialClientData) {
            const parsedClientData = JSON.parse(initialClientData);
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


    return (
        <Formik
            enableReinitialize
            initialValues={initialClientData || formInitialValues}
            validationSchema={validationSchema}
            onSubmit={async (values: createClientProps, { setSubmitting, resetForm }) => {
                try {
                    const payload = { row: values };
                    dispatch(editUpdate(payload));

                    resetForm();

                    setInitialClientData(null);
                    localStorage.removeItem('client');

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
                    <TableHeader headerName='Edit the client details' buttons={[
                        { label: 'Update', icon: Add, onClick: handleSubmit }
                    ]} />
                    <Form id="createClientForm" noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box>
                                    <RadioUi value={values.type} errorMsg={touched.type && errors.type} onChange={handleChange} groupName='type' options={genderOptions} label='customer type' />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box>
                                    <TextFieldUi
                                        required={true}
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
                                        type="number"
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
                                        label='Zip code'
                                        name='zipCode'
                                        type="text"
                                        value={values.zipCode}
                                        onChange={handleChange}
                                        error={touched.zipCode && Boolean(errors.zipCode)}
                                        helperText={touched.zipCode && errors.zipCode}
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

export default EditClient;
