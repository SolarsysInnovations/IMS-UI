import React, { useEffect, useMemo, useState } from 'react'
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Grid, Typography } from '@mui/material';
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
import { useGetServiceQuery, useUpdateServiceMutation } from '../../redux-store/service/serviceApi';
import DatePickerUi from '../../components/ui/DatePicker';
import dayjs from 'dayjs';
import ModalUi from '../../components/ui/ModalUi';
import DemoTwo from '../DemoTwo';
import { generateOptions } from '../../services/utils/dropdownOptions';
import { useAddInvoiceMutation } from '../../redux-store/invoice/invcoiceApi';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { columns } from '../../constants/service-table-data';
import { governmentGstType, gstType, invoiceType, paymentTerms } from '../../constants/invoiceData';

export const handleRowUpdate = (updatedRow: any) => {
    console.log(updatedRow); // Log the modified row object
};
const CreateInvoice = () => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const navigate = useNavigate();
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const [addInvoice, { isSuccess, isError, }] = useAddInvoiceMutation();
    const [updateService, { isSuccess: serviceUpdate, isError: serviceError }] = useUpdateServiceMutation();
    const { data: serviceList } = useGetServiceQuery();
    const [selectedServiceCode, setSelectedServiceCode] = useState<any[]>([]);
    const [selectedServiceData, setSelectedServiceData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredServiceData, setFilteredServiceData] = useState<any[]>([]);

    console.log(selectedServiceCode);

    console.log(serviceList);
    const newData = useMemo(() => {
        return serviceList?.map((item: any) => ({
            ...item,
            id: item._id
        })) || [];
    }, [serviceList]);

    useEffect(() => {
        const filteredData = newData
            ?.filter((service: any) =>
                selectedServiceCode.some((selectedCode: string) => selectedCode === service.serviceAccountingCode)
            )
            ?.map((service: any) => {
                const qty = service.qty || 1;
                const amount = service.serviceAmount || 0;
                const totalAmount = amount * qty;
                return {
                    id: service._id,
                    serviceAccountingCode: service.serviceAccountingCode,
                    serviceAmount: amount,
                    qty: qty,
                    totalAmount: totalAmount,
                };
            });

        setFilteredServiceData(filteredData || []);
    }, [newData, selectedServiceCode]);

    console.log(filteredServiceData);

    useEffect(() => {
        refetch()
    }, [dispatch, refetch])

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const customerName = generateOptions(customers, 'customerName', 'customerName');
    const serviceAccountCode = generateOptions(serviceList, "serviceAccountingCode", "serviceAccountingCode")

    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully created the new  Invoice", toastConfig)
        }
    }, [isSuccess])

    return (
        <div>
            <Formik
                initialValues={invoiceInitialValue}
                validationSchema={invoiceValidationSchema}
                onSubmit={async (values: InvoiceInitialValueProps, { setSubmitting, resetForm }) => {
                    try {
                        values.servicesList = filteredServiceData;
                        console.log(values);
                        // addInvoice(values);
                        alert(JSON.stringify(values));
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
                            {
                                label: 'Preview Invoice', icon: Add, onClick: () => {
                                    handleOpenModal();
                                }
                            },
                        ]} />
                        <ModalUi topHeight='70%' open={isModalOpen} onClose={handleCloseModal} >
                            <DemoTwo invoiceData={values} />
                        </ModalUi>
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
                                        }} groupName='type' options={invoiceType}
                                            // label='Invoice type'
                                            errorMsg={touched.invoiceType && errors.invoiceType}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
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
                                <Grid item xs={3}>
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
                                            options={customerName}
                                            value={values.customerName ? { value: values.customerName, label: values.customerName } : null}
                                            labelText='Customer Name'
                                            error={touched.customerName && Boolean(errors.customerName)}
                                            helperText={touched.customerName && errors.customerName}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
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
                                <Grid item xs={2}>
                                    <Box>
                                        <TextFieldUi
                                            fullWidth={false}
                                            label='Gst Percentage'
                                            name='gstPercentage'
                                            type="number"
                                            value={values.gstPercentage || ""}
                                            onChange={handleChange}
                                            error={touched.gstPercentage && Boolean(errors.gstPercentage)}
                                            helperText={touched.gstPercentage && errors.gstPercentage}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
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
                                <Grid item xs={3}>
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

                                <Grid item xs={2}>
                                    <Box>
                                        <DatePickerUi
                                            label="Invoice Date"
                                            onChange={(date: any) => setFieldValue("invoiceDate", date)}
                                            value={values.invoiceDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
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
                                    
                                        options={serviceAccountCode?.filter((option: { value: string }) => !values.service.some((item: string) => item === option.value))}
                                        label='Select Services'
                                        value={values.service.map(item => ({ value: item, label: item }))}
                                        onChange={(event: React.ChangeEvent<{}>, newValue: any | any[]) => {
                                            if (Array.isArray(newValue)) {
                                                console.log(newValue);
                                                const newServiceValues = newValue.map(item => (item.value));
                                                console.log(newServiceValues);
                                                setFieldValue("service", newServiceValues);
                                                console.log(newValue);
                                                const selectedServiceCodes = newValue.map(item => item.value);
                                                console.log(selectedServiceCodes); // Array containing only the values ['ECF7589']

                                                // Store the selected service codes
                                                setSelectedServiceCode(selectedServiceCodes);
                                                // setSelectedServiceCode(newValue);
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
                                    //    <Box sx={{
                                    //         ".css-1kp88ho-MuiAutocomplete-root .MuiAutocomplete-tag"{
                                    //             margin: "0px",
                                    //     }}>
                                    // </Box>
        />
                                </Grid>
                                {filteredServiceData.length === 0 ? "" : (
                                    <Grid item xs={12}>
                                        <GridDataUi
                                            onCellEditStop={(params: any, event: any) => {
                                                const newValue = event.target.value;
                                                const rowId = params.id;
                                                const updatedRowData = {
                                                    ...params.row,
                                                    qty: newValue
                                                };
                                                //  updateService(updateService)
                                                console.log({ id: updatedRowData.id, serviceData: updatedRowData });
                                                console.log('qty:', newValue);
                                                console.log('Row ID:', rowId);
                                            }}

                                            // onCellEditor={(params: any) => console.log(params)}
                                            hideFooter={true}
                                            pagination={true}
                                            showToolbar={false}
                                            columns={columns}
                                            tableData={values.service.length === 0 ? [] : filteredServiceData || []}
                                        />
                                    </Grid>
                                )}
                                <Grid container mt={3} mb={3} spacing={4} justifyContent="flex-end">
                                    <Box sx={{
                                        width: '40%',
                                        padding: "20px",
                                        backgroundColor: "#fafafa",
                                        borderRadius: "10px",
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: "space-between",
                                        }}>
                                            <Typography variant="body2" color="initial">Sub Total: </Typography>
                                            <Typography variant="body2" color="initial">1000 </Typography>
                                        </Box>
                                        <Box sx={{
                                            marginTop: "10px",
                                            display: 'flex',
                                            justifyContent: "space-between",
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                gap: "30px",
                                                justifyContent: "space-between",
                                            }}>
                                                <Typography variant="body2" color="initial">Discount Amount</Typography>
                                                <TextFieldUi
                                                    width='100px'
                                                    label='Discount'
                                                    name='gstInNumber'
                                                    type="text"
                                                    value={values.gstInNumber}
                                                    onChange={handleChange}
                                                    error={touched.gstInNumber && Boolean(errors.gstInNumber)}
                                                    helperText={touched.gstInNumber && errors.gstInNumber}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="initial">1200$</Typography>
                                        </Box>
                                        <Box sx={{
                                            marginTop: "10px",
                                            display: 'flex',
                                            justifyContent: "space-between",
                                        }}>
                                            <Box sx={{ display: "flex" }} >
                                                <RadioUi value={values.invoiceType} onChange={(newValue: any) => {
                                                    if (newValue) {
                                                        console.log(newValue.target.value);
                                                        setFieldValue('invoiceType', newValue.target.value);
                                                    } else {
                                                        setFieldValue('invoiceType', "")
                                                    }
                                                }} groupName='type' options={governmentGstType}
                                                    errorMsg={touched.invoiceType && errors.invoiceType}
                                                />
                                                <SelectDropdown
                                                    width='150px'
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
                                            <Typography variant="body2" color="initial">1200$</Typography>
                                        </Box>
                                        <Divider sx={{ marginTop: "20px" }} />
                                        <Box sx={{
                                            marginTop: "10px",
                                            display: 'flex',
                                            justifyContent: "space-between",
                                        }}>

                                            <Typography variant="subtitle1" color="initial">Total Amount: </Typography>
                                            <Typography variant="subtitle2" color="initial">1000 </Typography>
                                        </Box>
                                    </Box>

                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                )
                }
            </Formik >
        </div >
    )
}

export default CreateInvoice