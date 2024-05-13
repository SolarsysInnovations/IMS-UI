import React, { useEffect, useMemo, useState } from 'react'
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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
import { useGetServiceQuery, useUpdateServiceMutation } from '../../redux-store/service/serviceApi';
import DatePickerUi from '../../components/ui/DatePicker';
import dayjs from 'dayjs';
import ModalUi from '../../components/ui/ModalUi';
import { generateOptions } from '../../services/utils/dropdownOptions';
import { useAddInvoiceMutation, useUpdateInvoiceMutation } from '../../redux-store/invoice/invcoiceApi';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import InvoiceUi from '../../components/Generate-Invoice/InvoiceUi';
import DemoInvoice from './Demo-Invocie';
import { gstType, invoiceType, paymentTerms, tdsOptions } from '../../constants/invoiceData';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { useGetGstTypeQuery } from '../../redux-store/invoice/gstTypeApi';
import { useGetTdsTaxQuery } from '../../redux-store/invoice/tdsTaxApi';
import TextAreaUi from '../../components/ui/TextArea';
import GstTypeScreen from './GstType/GstTypeScreen';
import TdsTaxScreen from './TdsTax/TdsTaxScreen';
import { useGetPaymentTermsQuery } from '../../redux-store/invoice/paymentTerms';
import PaymentTermsScreen from './paymentTerms/PaymentTermsScreen';
import { formatDate } from '../../services/utils/dataFormatter';

interface Service {
    id: string; // Ensure id is mandatory
    serviceAccountingCode: string;
    serviceDescription: string;
    serviceAmount: number;
    quantity: number;
    price: number;
}

const InvoiceEdit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const invoiceStateDetails = useSelector((state: any) => state.customerState.data);

    const pathname = usePathname();
    const navigate = useNavigate();
    // popUps
    const [invoicePopUp, setInvoicePopup] = useState(false);
    const [gstTypePopUp, setGstTypePopup] = useState(false);
    const [tdsTaxPopUp, setTdsTaxPopup] = useState(false);
    const [paymentTermsPopUp, setPaymentTermsPopUp] = useState(false);
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const [updateInvoice, { isSuccess, isError, }] = useUpdateInvoiceMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subTotalInvoiceAmount, setSubTotalInvoiceAmount] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);
    const [discountAmount, setDiscountAmount] = useState<null | number>(null);
    const [selectedTds, setSelectedTdsAmount] = useState<number | null>(null);
    const [tdsAmount, setTdsAmount] = useState<number | null>(null);
    const [invoiceTotalAmount, setInvoiceTotalAmount] = useState<number | null>()
    // * * * * * * * grid table states * * * * * * * * *
    // const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();
    const { data: serviceList } = useGetServiceQuery();
    const { data: paymentTerms } = useGetPaymentTermsQuery();
    const [modifiedServiceList, setModifiedServiceList] = React.useState<Service[]>([]);
    const [rows, setRows] = React.useState<any[]>([]); // Initialize rows as an empty array
    const rowIdCounter = React.useRef<number>(0); // Ref for keeping track of row IDs
    const [invoiceValues, setInvoiceValues] = useState(invoiceStateDetails);
    const { data: gstTypesData = [] } = useGetGstTypeQuery();
    const { data: tdsTaxData = [] } = useGetTdsTaxQuery();

    console.log("invoice values", invoiceValues);

    // * ----------- to generate the dropdown options -------------
    const customerName = generateOptions(customers, 'customerName', 'customerName');
    const gstTypeOptions = generateOptions(gstTypesData, "gstName", "gstName")
    const tdsTaxOptions = generateOptions(tdsTaxData, "taxName", "taxName")
    const paymentTermsOptions = generateOptions(paymentTerms, "termName", "termName")
    React.useEffect(() => {
        if (invoiceValues) {
            const sumSubTotal = invoiceValues.servicesList.reduce((acc: any, row: any) => acc + row.price, 0)
            setSubTotalInvoiceAmount(sumSubTotal)
        }
    }, [invoiceValues]);

    React.useEffect(() => {
        const disAmount = (subTotalInvoiceAmount * (discountPercentage ?? 0)) / 100;
        setDiscountAmount(disAmount)
        let tdsTax = null;
        if (selectedTds) {
            let discountedAmount = (subTotalInvoiceAmount - disAmount) * (selectedTds) / 100;
            setTdsAmount(discountedAmount);
            tdsTax = discountedAmount
        } else {
            setTdsAmount(null);
        }
        const invoiceAmount = tdsTax ? subTotalInvoiceAmount - (tdsTax + disAmount) : null;
        const roundedInvoiceAmount = invoiceAmount ? Number(invoiceAmount.toFixed(2)) : null;
        setInvoiceTotalAmount(roundedInvoiceAmount);
    }, [discountPercentage, subTotalInvoiceAmount, selectedTds, invoiceStateDetails])



    React.useEffect(() => {
        if (serviceList) {
            const mappedServiceList = serviceList.map((s: any) => ({
                id: `${rowIdCounter.current++}`, // Manually assign unique ID
                serviceAccountingCode: s.serviceAccountingCode,
                serviceDescription: s.serviceDescription,
                quantity: 0,
                serviceAmount: s.serviceAmount,
                price: 0,
            }));
            setModifiedServiceList(mappedServiceList);
        }
    }, [serviceList]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        const parsedValue = parseInt(value); // Parse the value to an integer
        setInvoiceValues((prevInvoiceValues: any) => {
            const updatedServicesList = prevInvoiceValues.servicesList.map((service: any, serviceIndex: any) => {
                if (serviceIndex === index) {
                    const quantity = isNaN(parsedValue) ? 0 : parsedValue; // If parsedValue is NaN, set quantity to 0
                    const price = quantity * service.serviceAmount; // Calculate the amount
                    return {
                        ...service,
                        quantity,
                        price // Update the amount in the service
                    };
                }
                return service;
            });
            return {
                ...prevInvoiceValues,
                servicesList: updatedServicesList
            };
        });
    };

    const handleAddRow = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const newRow = {
            id: `row_${Date.now()}`,
            serviceAccountingCode: "",
            quantity: 0,
            serviceAmount: 0,
            price: 0
        };
        const updatedServicesList = [...invoiceValues.servicesList, newRow];
        setInvoiceValues((prevState: any) => ({
            ...prevState,
            servicesList: updatedServicesList
        }));
    };

    const handleRemoveRow = (id: string) => {
        // Find the index of the row with the provided id in invoiceValues.servicesList
        const index = invoiceValues.servicesList.findIndex((row: any) => row.id === id);
        if (index !== -1) {
            // Create a new array without the removed row
            const updatedServicesList = invoiceValues.servicesList.filter((_: any, idx: any) => idx !== index);
            // Update the state with the new array
            setInvoiceValues((prevState: any) => ({
                ...prevState,
                servicesList: updatedServicesList
            }));
        }
    };

    useEffect(() => {
        refetch()
    }, [dispatch, refetch])

    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully created the new  Invoice", toastConfig)
        }
    }, [isSuccess])

    return (
        <Formik
            initialValues={invoiceValues || []}
            // validationSchema={invoiceValidationSchema}
            validate={() => ({})}
            onSubmit={async (values: InvoiceInitialValueProps, { setSubmitting, resetForm }) => {
                try {
                    values.servicesList = invoiceValues.servicesList
                    values.invoiceTotalAmount = invoiceTotalAmount ?? null;
                    console.log(values);

                    await updateInvoice({
                        id: values.id ?? undefined,
                        invoiceData: values
                    });
                    // // alert(JSON.stringify(values));

                    console.log("values", values);
                    resetForm();
                    navigate("/invoice/list");
                } catch (error) {
                    console.error("An error occurred during login:", error);
                }
                finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => {
                if (values.discountPercentage) {
                    setDiscountPercentage(values.discountPercentage)
                }
                if (values.taxAmount.tds) {
                    const selectedTdsTax = tdsTaxData?.find((item) => item.taxName === values.taxAmount.tds);
                    const percentage = selectedTdsTax?.taxPercentage;
                    setSelectedTdsAmount(percentage)
                }
                console.log(values);
                return (
                    <div>
                        <ToastUi autoClose={2000} />
                        <TableHeader headerName={pathname} buttons={[
                            { label: 'Preview', icon: Add, onClick: () => setIsModalOpen(true) },
                            { label: 'Back', icon: Add, onClick: () => navigate(-1) },
                            { label: 'Save', icon: Add, onClick: handleSubmit },
                        ]} />
                        <ModalUi topHeight='40%' open={isModalOpen} onClose={() => {
                            setIsModalOpen(false)
                            setInvoicePopup(false)
                            setGstTypePopup(false)
                            setTdsTaxPopup(false)
                            setPaymentTermsPopUp(false)
                        }} >
                            <>
                                {invoicePopUp && (
                                    <InvoiceUi discount={discountAmount} subtotal={subTotalInvoiceAmount} tds={tdsAmount} invoiceData={values} />
                                )}
                                {gstTypePopUp && (
                                    <GstTypeScreen />
                                )}
                                {tdsTaxPopUp && (
                                    <TdsTaxScreen />
                                )}
                                {paymentTermsPopUp && (<PaymentTermsScreen />)}
                            </>
                        </ModalUi>
                        <Form id="createClientForm" noValidate >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box>
                                        <RadioUi value={values.invoiceType} onChange={(newValue: any) => {
                                            if (newValue) {
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
                                <Grid item xs={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                    }}>
                                        <Typography variant="subtitle2" color="initial">Created at : {formatDate(new Date(values.invoiceDate))}</Typography>
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
                                                    setFieldValue("customerName", newValue.value)
                                                } else {
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
                                            onMouseDown={() => {
                                                setIsModalOpen(true)
                                                setGstTypePopup(true)
                                                // navigate("/customer/create")
                                                console.log("Add new");
                                            }}
                                            button={true}
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    const selectedGstType = gstTypesData.find((item) => item.gstName === newValue.value)
                                                    if (selectedGstType) {
                                                        setFieldValue("gstPercentage", selectedGstType.gstPercentage)
                                                        setFieldValue("gstType", newValue.value)
                                                    } else {
                                                        setFieldValue("gstType", "")
                                                        setFieldValue("gstPercentage", null)
                                                    }
                                                } else {
                                                    setFieldValue("gstType", "")
                                                    setFieldValue("gstPercentage", null)
                                                }
                                            }}
                                            options={gstTypeOptions}
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
                                            button={true}
                                            onMouseDown={() => {
                                                setIsModalOpen(true)
                                                setPaymentTermsPopUp(true);
                                            }}
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    const selectedPaymentTerms = paymentTerms?.find((item) => item.termName === newValue.value)
                                                    if (selectedPaymentTerms) {
                                                        setFieldValue("startDate", selectedPaymentTerms.startDate)
                                                        setFieldValue("dueDate", selectedPaymentTerms.dueDate)
                                                        setFieldValue("paymentTerms", newValue.value)
                                                    } else {
                                                        setFieldValue("startDate", "")
                                                        setFieldValue("dueDate", "")
                                                    }
                                                } else {
                                                    setFieldValue("paymentTerms", "")
                                                    setFieldValue("startDate", "")
                                                    setFieldValue("dueDate", "")
                                                }
                                            }}
                                            options={paymentTermsOptions}
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
                                            label="Start Date"
                                            onChange={(date: any) => setFieldValue("startDate", date)}
                                            value={values.startDate ? formatDate(new Date(values.startDate)) : null}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <DatePickerUi
                                            label="Due Date"
                                            onChange={(date: any) => console.log(date)}
                                            value={values.dueDate ? formatDate(new Date(values.dueDate)) : null}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Service Accounting Code</TableCell>
                                                    <TableCell sx={{ width: "140px" }} align="left">Quantity</TableCell>
                                                    <TableCell sx={{ width: "140px" }} align="left">Service Amount</TableCell>
                                                    <TableCell sx={{ width: "140px" }} align="right">Amount</TableCell>
                                                    <TableCell align="left"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {invoiceValues?.servicesList?.map((item: any, index: any) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell component="th" scope="row">
                                                            <SelectDropdown
                                                                onMouseDown={() => {
                                                                    // navigate("/customer/create")
                                                                    console.log("Add new");
                                                                }}
                                                                button={true}
                                                                options={modifiedServiceList.map((service) => ({
                                                                    label: service.serviceAccountingCode,
                                                                    value: service.serviceAccountingCode
                                                                }))}
                                                                value={item.serviceAccountingCode ? { label: item.serviceAccountingCode, value: item.serviceAccountingCode } : null}
                                                                onChange={(e: any) => {
                                                                    if (e) {
                                                                        const selectedService = modifiedServiceList.find(service => service.serviceAccountingCode === e.value);
                                                                        if (selectedService) {
                                                                            const updatedServiceList = [...invoiceValues.servicesList];
                                                                            updatedServiceList[index] = { ...selectedService, id: item.id }; // Update the existing service in the list
                                                                            setInvoiceValues((prevState: any) => ({
                                                                                ...prevState,
                                                                                servicesList: updatedServiceList
                                                                            }));
                                                                        }
                                                                    } else {
                                                                        const updatedServiceList = [...invoiceValues.servicesList];
                                                                        updatedServiceList[index] = {
                                                                            ...updatedServiceList[index],
                                                                            serviceAccountingCode: "",
                                                                            quantity: 0,
                                                                            price: 0
                                                                        };
                                                                        setInvoiceValues((prevState: any) => ({
                                                                            ...prevState,
                                                                            servicesList: updatedServiceList
                                                                        }));
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextFieldUi
                                                                type='number'
                                                                value={item?.quantity}
                                                                // label='INout sample'
                                                                onChange={(e) => handleQuantityChange(e, index)}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextFieldUi type='number' value={item?.serviceAmount}
                                                            // label='INout sample'
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">{item?.price}</TableCell>
                                                        <TableCell align="right">
                                                            <ButtonSmallUi type='button' onClick={() => handleRemoveRow(item?.id)} label='Remove' />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <ButtonSmallUi type='button' onClick={handleAddRow} label='Add' />
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid item xs={12}>
                                        <TextAreaUi variant='standard' onChange={(e) => {
                                            if (e) {
                                                setFieldValue("notes", e.target.value);
                                            } else {
                                                setFieldValue("notes", "");
                                            }
                                        }} value={values?.notes} rows={1} label='Notes' />
                                    </Grid>
                                    <Grid mt={2} item xs={12}>
                                        <TextAreaUi variant='standard' onChange={(e) => {
                                            if (e) {
                                                setFieldValue("termsAndConditions", e.target.value);
                                            } else {
                                                setFieldValue("termsAndConditions", "");
                                            }
                                        }} value={values?.termsAndConditions} rows={1} label='Terms And Conditions' />
                                    </Grid>
                                </Grid>

                                <Grid item xs={6}>
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
                                            {/* <Typography variant="body2" color="initial">Discount Amount Typography> */}
                                            <TextFieldUi
                                                width='100px'
                                                label='Discount %'
                                                name='discount'
                                                type="number"
                                                value={values.discountPercentage ?? ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    console.log(value);
                                                    const parsedValue = value !== "" ? parseFloat(value) : null;
                                                    setDiscountPercentage(parsedValue);
                                                    setFieldValue("discountPercentage", parsedValue);
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
                                                onMouseDown={() => {
                                                    setIsModalOpen(true)
                                                    setTdsTaxPopup(true)
                                                    // navigate("/customer/create")
                                                    console.log("Add new");
                                                }}
                                                button={true}
                                                width='150px'
                                                onChange={(newValue: any) => {
                                                    if (newValue) {
                                                        const selectedTdsTax = tdsTaxData.find((item) => item.taxName === newValue.value);
                                                        if (selectedTdsTax) {
                                                            setFieldValue("taxAmount.tds", newValue.value)
                                                            setSelectedTdsAmount(selectedTdsTax.taxPercentage)
                                                        } else {
                                                            setFieldValue("taxAmount.tds", "")
                                                            setSelectedTdsAmount(null)
                                                        }
                                                    }
                                                    else {
                                                        setFieldValue("taxAmount.tds", "")
                                                        setSelectedTdsAmount(null)
                                                    }
                                                }}
                                                options={tdsTaxOptions}
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
                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                )
            }
            }
        </Formik >
    )
}

export default InvoiceEdit