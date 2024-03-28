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
import ToastUi from '../../components/ui/ToastifyUi';
import SelectDropdown from '../../components/ui/SelectDropdown';
import { invoiceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { invoiceInitialValue } from '../../constants/forms/formikInitialValues';
import { useGetCustomersQuery } from '../../redux-store/customer/customerApi';
import { InvoiceInitialValueProps } from '../../types/types';
import MultiSelectUi from '../../components/ui/MultiSelect';
import GridDataUi from '../../components/Grid/GridData';
import { useGetServiceQuery } from '../../redux-store/service/serviceApi';
import { columns } from '../../constants/service-table-data';
import DatePickerUi from '../../components/ui/DatePicker';
import dayjs from 'dayjs';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const CreateInvoice = () => {

    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const { data: serviceList } = useGetServiceQuery();
    const [selectedService, setSelectedService] = useState<any[]>([]);
    const [invoiceData, setInvoiceData] = useLocalStorage("invoiceData", "")
    // const []

    const companyOptions = customers?.map((customer: any) => ({
        value: customer?.customerName,
        label: customer?.customerName,
    })) || [];


    const serviceAccountCode = serviceList?.map((service: any) => ({
        value: service.serviceAccountingCode,
        label: service.serviceAccountingCode
    }));
    const newData = serviceList?.map((item: any) => {
        return {
            ...item,
            id: item._id
        };
    }) || [];
    console.log(newData);

    const filteredServices = newData?.filter((service: any) =>
        selectedService.some(selectedService => selectedService.label === service.serviceAccountingCode)
    )

    const filteredServiceData = filteredServices?.map((service: any) => {
        const qty = service.qty || 1; // Ensure qty is defined
        const amount = service.serviceAmount || 0; // Ensure amount is defined
        const totalAmount = amount * qty; // Calculate total amount
        return {
            id: service.serviceAccountingCode,
            serviceAccountingCode: service.serviceAccountingCode,
            serviceAmount: amount,
            qty: qty,
            totalAmount: totalAmount,
        };
    });
    console.log(filteredServiceData);



    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    // dispatch(fetchClientList());
    const navigate = useNavigate();

    const genderOptions = [
        { value: "Retainer", label: "Retainer" },
        { value: "Onetime", label: "Onetime" },
    ]
    const paymentTerms = [
        { value: "Net 30", label: "Net 30" },
        { value: "Net 45", label: "Net 45" },
        { value: "Due On Receipt", label: "Due On Receipt" },
        { value: "Custom", label: "Custom" },
    ]
    useEffect(() => {
        refetch()
    }, [dispatch, refetch])

    const options = [{ value: "arun", label: "arun" }]
    const countries = [{ value: "uk", label: "uk" },
    { value: "australia", label: "australia" }];
    const gstType = [
        { value: "Local", label: "Local" },
        { value: "Interstate", label: "Interstate" },
        { value: "SEZ", label: "SEZ" },
    ];

    const buttons = [
        { label: 'Create User', icon: Add, onClick: () => navigate("/invoice/create") },
    ];

    return (
        <div>
            <Formik
                initialValues={invoiceInitialValue}
                validationSchema={invoiceValidationSchema}
                // validate={() => ({})}
                onSubmit={async (values: InvoiceInitialValueProps, { setSubmitting, resetForm }) => {
                    try {
                        values.servicesList = filteredServiceData;
                        console.log(values);
                        setInvoiceData(values);
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
                                <Grid item xs={12}>
                                    <Box>
                                        <RadioUi value={values.invoiceType} onChange={(newValue: any) => {
                                            if (newValue) {
                                                console.log(newValue.target.value);
                                                setFieldValue('invoiceType', newValue.target.value);
                                            } else {
                                                setFieldValue('invoiceType', "")
                                            }
                                        }} groupName='type' options={genderOptions} label='Invoice type'
                                            errorMsg={touched.invoiceType && errors.invoiceType}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <TextFieldUi
                                            required={true}
                                            fullWidth={false}
                                            label='Invoice Number'
                                            name='invoiceNumber'
                                            type="text"
                                            value={(() => {
                                                return values.invoiceNumber
                                            })()}
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
                                                    setFieldValue("customerName", newValue.value)
                                                } else {
                                                    console.log("clearing the value")
                                                    setFieldValue("customerName", "")
                                                }
                                            }}
                                            options={companyOptions}
                                            value={values.customerName ? { value: values.customerName, label: values.customerName } : null}
                                            labelText='Customer Name'
                                            error={touched.customerName && Boolean(errors.customerName)}
                                            helperText={touched.customerName && errors.customerName}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <SelectDropdown
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    console.log(newValue)
                                                    if (newValue.value === "Local") {
                                                        setFieldValue("gstPercentage", "0.18")
                                                    } else if (newValue.value === "Interstate") {
                                                        setFieldValue("gstPercentage", "0.18")
                                                    } else if (newValue.value === "SEZ") {
                                                        setFieldValue("gstPercentage", "0")
                                                    }
                                                    setFieldValue("gstType", newValue.value)
                                                } else {
                                                    console.log("clearing the value")
                                                    setFieldValue("gstType", "")
                                                    setFieldValue("gstPercentage", "")
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
                                            type="number"
                                            value={values.gstPercentage}
                                            onChange={handleChange}
                                            error={touched.gstPercentage && Boolean(errors.gstPercentage)}
                                            helperText={touched.gstPercentage && errors.gstPercentage}
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
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <SelectDropdown
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    console.log(newValue)
                                                    if (newValue.value === "Net 30") {
                                                        const currentDateNet30 = dayjs().format('DD-MM-YYYY');
                                                        const dueDateNet30 = dayjs().add(30, 'days').format('DD-MM-YYYY');
                                                        setFieldValue("invoiceDate", currentDateNet30);
                                                        setFieldValue("dueDate", dueDateNet30);
                                                    } else if (newValue.value === "Net 45") {
                                                        const currentDateNet45 = dayjs().format('DD-MM-YYYY');
                                                        const dueDateNet45 = dayjs().add(45, 'days').format('DD-MM-YYYY');
                                                        setFieldValue("invoiceDate", currentDateNet45);
                                                        setFieldValue("dueDate", dueDateNet45);
                                                    }
                                                    else if (newValue.value === "Due On Receipt") {
                                                        const currentDate = dayjs().format('DD-MM-YYYY');
                                                        setFieldValue('invoiceDate', currentDate)
                                                        setFieldValue("dueDate", currentDate)
                                                    }
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
                                        <DatePickerUi
                                            label="Invoice Date"
                                            onChange={(date: any) => setFieldValue("invoiceDate", date)}
                                            value={values.invoiceDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <DatePickerUi
                                            label="Due Date"
                                            onChange={(date: any) => console.log(date)}
                                            value={values.dueDate}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={6}>
                                    <MultiSelectUi
                                        options={serviceAccountCode?.filter(option => !values.service.some(item => item === option.value))}
                                        label='Select Services'
                                        value={values.service.map(item => ({ value: item, label: item }))}
                                        onChange={(event: React.ChangeEvent<{}>, newValue: any | any[]) => {
                                            if (Array.isArray(newValue)) {
                                                console.log(newValue);
                                                const newServiceValues = newValue.map(item => (item.value));
                                                console.log(newServiceValues);
                                                setFieldValue("service", newServiceValues);
                                                setSelectedService(newValue);
                                                values.servicesList = filteredServiceData;
                                            } else if (newValue !== null) { // Check if newValue is not null
                                                console.log(newValue);
                                                const newServiceValues = [{ value: newValue.value }];
                                                setFieldValue("service", newServiceValues);


                                            } else {
                                                console.log("clearing the value");
                                                setFieldValue("service", []);
                                            }
                                        }}
                                        error={touched.service && Boolean(errors.service)}
                                        helperText={touched.service && errors.service}
                                    />
                                </Grid>

                                {filteredServices ? (
                                    <Grid item xs={12}>
                                        <GridDataUi
                                            onCellEditStop={(params: any, event: any) => {
                                                const newValue = event.target.value;
                                                const rowId = params.id;
                                                console.log('New value:', newValue);
                                                console.log('Row ID:', rowId);

                                                // Update the quantity in filteredServiceData based on the rowId
                                                const updatedServiceData = filteredServiceData.map((service: any) => {
                                                    if (service.id === rowId) {
                                                        // Update the quantity for the matching row
                                                        return {
                                                            ...service,
                                                            qty: newValue // Update the quantity with the new value
                                                        };
                                                    }
                                                    return service; // Return the unchanged row for non-matching IDs
                                                });

                                                // Log the updated service data
                                                console.log('Updated Service Data:', updatedServiceData);
                                            }}
                                            onCellEditor={(params: any) => console.log(params)}
                                            hideFooter={true}
                                            pagination={true}
                                            showToolbar={false}
                                            columns={columns}
                                            tableData={filteredServiceData || []}
                                        />
                                    </Grid>
                                ) : ""}
                            </Grid>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default CreateInvoice