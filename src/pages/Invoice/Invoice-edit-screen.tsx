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
import GridDataUi from '../../components/GridTable/GridData';
import { useGetServiceQuery, useUpdateServiceMutation } from '../../redux-store/service/serviceApi';
import DatePickerUi from '../../components/ui/DatePicker';
import dayjs from 'dayjs';
import ModalUi from '../../components/ui/ModalUi';
import { generateOptions } from '../../services/utils/dropdownOptions';
import { useAddInvoiceMutation } from '../../redux-store/invoice/invcoiceApi';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { governmentGstType, gstType, invoiceType, paymentTerms } from '../../constants/invoiceData';
import { pdfjs } from 'react-pdf';
import InvoiceUi from '../../components/Generate-Invoice/InvoiceUi';
import InvoiceGrid from './Invoice-grid';
import { columns } from '../../constants/grid-table-data/invoice/invoice-service-table-data';

export const handleRowUpdate = (updatedRow: any) => {
    console.log(updatedRow); // Log the modified row object
};
const InvoiceEditScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const navigate = useNavigate();
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const [addInvoice, { isSuccess, isError, }] = useAddInvoiceMutation();

    const { data: serviceList } = useGetServiceQuery();
    const [selectedServiceCode, setSelectedServiceCode] = useState<any[]>([]);
    const [selectedServiceData, setSelectedServiceData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateQty, setUpdateQty] = useState<any>();
    const [subTotalInvoiceAmount, setSubTotalInvoiceAmount] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);
    const [discountAmount, setDiscountAmount] = useState<null | number>(null);
    const [selectedTds, setSelectedTdsAmount] = useState<string>("");
    const [tdsAmount, setTdsAmount] = useState<number | null>(null);
    const [invoiceTotalAmount, setInvoiceTotalAmount] = useState<number | null>()
    const [tdsOrTcsDiscount, setTdsOrTcsDiscount] = useState(0);
    const [serviceData, setServiceData] = useState<any>();
    console.log(updateQty);
    console.log(selectedServiceCode);

    const newData = useMemo(() => {
        return serviceList?.map((item: any) => ({
            ...item,
            id: item._id
        })) || [];
    }, [serviceList]);

    useEffect(() => {
        const data = window.localStorage.getItem("service");
        setServiceData(data);
    }, [])
    useEffect(() => {
        if (newData) {
            const processedServiceList = newData.map((service: any) => {
                const qty = service.qty || 1;
                const totalAmount = qty * service.serviceAmount;
                return {
                    ...service,
                    qty: qty,
                    totalAmount: totalAmount
                };
            });
            localStorage.setItem('servicesList', JSON.stringify(processedServiceList));
        }
    }, [newData]);

    useEffect(() => {
        if (updateQty) {
            const serviceListFromLocalStorage = JSON.parse(localStorage.getItem('servicesList') || '[]');
            const index = serviceListFromLocalStorage.findIndex((service: any) => service.serviceAccountingCode === updateQty.serviceAccountingCode);
            if (index !== -1) {
                const updatedData = [...serviceListFromLocalStorage];
                updatedData[index] = {
                    ...updatedData[index],
                    qty: updateQty.qty,
                    totalAmount: updateQty.qty * updatedData[index].serviceAmount
                };
                localStorage.setItem('servicesList', JSON.stringify(updatedData));
            }
        }
    }, [updateQty]);

    useEffect(() => {
        const serviceListFromLocalStorage = JSON.parse(localStorage.getItem('servicesList') || '[]');
        const filterDataByAccountingCode = serviceListFromLocalStorage.filter((service: any) => selectedServiceCode.includes(service.serviceAccountingCode));
        setSelectedServiceData(filterDataByAccountingCode);
    }, [selectedServiceCode, updateQty]);

    console.log(selectedServiceData);

    const calculateServiceTotalAmount = (serviceData: any[]) => {
        let totalAmount = 0;
        serviceData.forEach((service: any) => {
            totalAmount += service.totalAmount
        });
        return totalAmount;
    }

    useEffect(() => {
        const totalAmount = calculateServiceTotalAmount(selectedServiceData);
        setSubTotalInvoiceAmount(totalAmount);
        console.log("Total Amount:", totalAmount);
    }, [selectedServiceData, updateQty])

    useEffect(() => {
        console.log(subTotalInvoiceAmount);
        console.log(discountPercentage);
        const disAmount = (subTotalInvoiceAmount * (discountPercentage ?? 0)) / 100;
        console.log("Discount Amount:", disAmount);
        setDiscountAmount(disAmount)

        let tdsTax = null;
        if (selectedTds) {
            if (selectedTds === "Professional Service 10%") {
                let discountPercentage = 10;
                let discountedAmount = (subTotalInvoiceAmount - disAmount) * (discountPercentage) / 100;
                console.log("Discounted Amount:", discountedAmount);
                setTdsAmount(discountedAmount);
                tdsTax = discountedAmount
            }
        }
        console.log(tdsTax);

        const invoiceAmount = tdsTax ? subTotalInvoiceAmount - (tdsTax + disAmount) : null;
        console.log(invoiceAmount);
        setInvoiceTotalAmount(invoiceAmount);
        console.log(subTotalInvoiceAmount);
        console.log("Discount Percentage:", discountPercentage);
    }, [discountPercentage, subTotalInvoiceAmount, tdsAmount, selectedTds]);


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

    const tdsOptions = [
        {
            value: "Professional Service 10%",
            label: "Professional Service 10%"
        },
    ]
    const ini = {
        invoiceType: "Retainer",
        invoiceNumber: "IM98432",
        customerName: "sandy",
        gstType: "Local",
        gstPercentage: 0.18,
        gstInNumber: "IN92342",
        paymentTerms: "Net 30",
        invoiceDate: '13-04-2024',
        dueDate: '13-05-2024',
        invoiceStatus: "Pending",
        discountAmount: 2,
        invoiceTotalAmount: 13230,
        taxAmount: { tds: 'Professional Service 10%' },
        service: ['ECF7589'],
        servicesList: [
            {
                _id: '65f2c628a7125d2fd42f982c',
                __v: 0,
                serviceAccountingCode: 'ECF7589',
                serviceAmount: 15000,
                serviceDescription:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                id: '65f2c628a7125d2fd42f982c',
                qty: 1,
                totalAmount: 15000
            }
        ]
    }
    return (
        <div>
            <Formik
                initialValues={serviceData || ini}
                // validationSchema={invoiceValidationSchema}
                validate={() => ({})}
                onSubmit={async (values: InvoiceInitialValueProps, { setSubmitting, resetForm }) => {
                    try {
                        values.servicesList = selectedServiceData;
                        values.invoiceTotalAmount = invoiceTotalAmount ?? null;
                        console.log(values);
                        // addInvoice(values);
                        // alert(JSON.stringify(values));
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
                            { label: 'Preview Invoice', icon: Add, onClick: () => { handleOpenModal(); } },
                        ]} />
                        <ModalUi topHeight='70%' open={isModalOpen} onClose={handleCloseModal} >
                            <InvoiceUi discount={discountAmount} subtotal={subTotalInvoiceAmount} tds={tdsAmount} invoiceData={values} />
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
                                        // errorMsg={touched.invoiceType && errors.invoiceType}
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
                                        // helperText={touched.invoiceNumber && errors.invoiceNumber}
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
                                        // helperText={touched.customerName && errors.customerName}
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
                                        // helperText={touched.gstType && errors.gstType}
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
                                        // helperText={touched.gstPercentage && errors.gstPercentage}
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
                                        // helperText={touched.gstInNumber && errors.gstInNumber}
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
                                        // helperText={touched.paymentTerms && errors.paymentTerms}
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
                                        value={values.service.map((item: any) => ({ value: item, label: item }))}
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
                                                values.servicesList = selectedServiceData;
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
                                {selectedServiceData.length === 0 ? "" : (
                                    <InvoiceGrid setUpdateQty={setUpdateQty} values={values} columns={columns} hideFooter={true}
                                        pagination={true} showToolbar={false} tableData={values.service.length === 0 ? [] : selectedServiceData || []} />
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
                                            <Typography variant="body2" color="initial">{subTotalInvoiceAmount}</Typography>
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
                                                {/* <Typography variant="body2" color="initial">Discount Amount</Typography> */}
                                                <TextFieldUi
                                                    width='100px'
                                                    label='Discount %'
                                                    name='discount'
                                                    type="number"
                                                    value={values.discountAmount !== null ? values.discountAmount.toString() : ""}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const parsedValue = value !== "" ? parseFloat(value) : null;
                                                        setDiscountPercentage(parsedValue); // Set discountAmount as a number or null
                                                        console.log(parsedValue);
                                                        setFieldValue("discountAmount", value);
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="initial">-{discountAmount}</Typography>
                                        </Box>
                                        <Box sx={{
                                            marginTop: "10px",
                                            display: 'flex',
                                            justifyContent: "space-between",
                                        }}>
                                            <Box sx={{ display: "flex" }} >
                                                <SelectDropdown
                                                    width='150px'
                                                    onChange={(newValue: any) => {
                                                        if (newValue) {
                                                            console.log(newValue)
                                                            if (newValue.value === "Professional Service 10%") {
                                                                setFieldValue("taxAmount.tds", newValue.value)
                                                                setSelectedTdsAmount(newValue.value)
                                                            }
                                                            setFieldValue("taxAmount.tds", newValue.value)
                                                        }
                                                        else {
                                                            console.log("clearing the value")
                                                            setFieldValue("taxAmount.tds", "")
                                                        }
                                                    }}
                                                    options={tdsOptions}
                                                    value={values.taxAmount.tds ? { value: values.taxAmount.tds, label: values.taxAmount.tds } : null}
                                                    labelText='TDS %'
                                                />
                                            </Box>
                                            <Typography variant="body2" color="initial">-{tdsAmount}</Typography>
                                        </Box>
                                        <Divider sx={{ marginTop: "20px" }} />
                                        <Box sx={{
                                            marginTop: "10px",
                                            display: 'flex',
                                            justifyContent: "space-between",
                                        }}>

                                            <Typography variant="subtitle1" color="initial">Total Amount: </Typography>
                                            <Typography variant="subtitle2" color="initial">{invoiceTotalAmount}</Typography>
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

export default InvoiceEditScreen