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
import { invoiceEditInitialValue } from '../../constants/forms/formikInitialValues';
import { useGetCustomersQuery } from '../../redux-store/customer/customerApi';
import { InvoiceInitialValueProps } from '../../types/types';
import { useGetServiceQuery, useUpdateServiceMutation } from '../../redux-store/service/serviceApi';
import DatePickerUi from '../../components/ui/DatePicker';
import dayjs from 'dayjs';
import ModalUi from '../../components/ui/ModalUi';
import { generateOptions } from '../../services/utils/dropdownOptions';
import { useAddInvoiceMutation } from '../../redux-store/invoice/invcoiceApi';
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
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';
import { formatDate } from '../../services/utils/dataFormatter';
import { addDays, format } from 'date-fns';
import ServiceCreate from '../service/service-create-screen';
import DialogBoxUi from '../../components/ui/DialogBox';
import { clearData } from '../../redux-store/global/globalState';
import SendEmail from './Send-email';
import ServiceScreen from './service/ServiceScreen';

interface Service {
    id: string; // Ensure id is mandatory
    serviceAccountingCode: string;
    serviceDescription: string;
    serviceAmount: number;
    serviceQty: number;
    serviceTotalAmount: number;
}

const InvoiceEdit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const navigate = useNavigate();
    const invoiceStateDetails = useSelector((state: any) => state.customerState.data);

    // popUps
    const [popUpComponent, setPopUpComponent] = useState("");
    const [invoiceFinalData, setInvoiceFinalData] = useState();
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const [addInvoice, { isSuccess, isError, }] = useAddInvoiceMutation();
    const [opendialogBox, setIsOpenDialogBox] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmailModalOpen, setisEmailModalOpen] = useState(false);
    const [emailPopUp, setEmailPopUp] = useState(false);
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
    const { data: gstTypesData = [] } = useGetGstTypeQuery();
    const { data: tdsTaxData = [] } = useGetTdsTaxQuery();
    const [invoiceValues, setInvoiceValues] = useState(invoiceStateDetails);
    // * ----------- to generate the dropdown options -------------
    const customerName = generateOptions(customers, 'customerName', 'customerName');
    const gstTypeOptions = generateOptions(gstTypesData, "gstName", "gstName");
    const tdsTaxOptions = generateOptions(tdsTaxData, "taxName", "taxName");
    const paymentTermsOptions = generateOptions(paymentTerms, "termName", "termName");

    console.log(invoiceStateDetails);

    const PopupComponents = {
        GST_TYPE: 'gstType',
        PAYMENT_TERMS: 'paymentTerms',
        TDS_TAX: 'tdsTax',
        SERVICES: 'services',
        INVOICE: 'invoice'
    }

    React.useEffect(() => {
        if (invoiceValues) {
            const sumSubTotal = invoiceValues.servicesList.reduce((acc: any, row: any) => acc + row.serviceTotalAmount, 0)
            setSubTotalInvoiceAmount(sumSubTotal)
            setDiscountPercentage(invoiceValues.discountPercentage)
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
                serviceQty: 0,
                serviceAmount: s.serviceAmount,
                serviceTotalAmount: 0,
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
                    const serviceQty = isNaN(parsedValue) ? 0 : parsedValue; // If parsedValue is NaN, set quantity to 0
                    const serviceTotalAmount = serviceQty * service.serviceAmount; // Calculate the amount
                    return {
                        ...service,
                        serviceQty,
                        serviceTotalAmount // Update the amount in the service
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
            serviceQty: 0,
            serviceAmount: 0,
            serviceTotalAmount: 0
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
            initialValues={invoiceValues}
            // validationSchema={invoiceValidationSchema}
            validate={() => ({})}
            onSubmit={async (values: InvoiceInitialValueProps, { setSubmitting, resetForm }) => {
                try {
                    // values.invoiceTotalAmount = invoiceTotalAmount
                    values.servicesList = invoiceValues.servicesList
                    values.totalAmount = invoiceTotalAmount ?? null;
                    await addInvoice(values);
                    // alert(JSON.stringify(values));
                    console.log(values);

                    resetForm();
                    setInvoiceValues({ ...invoiceValues })
                    navigate('/invoice/list')
                } catch (error) {
                    console.error("An error occurred during login:", error);
                }
                finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => {
                return (
                    <div>
                        <ToastUi autoClose={2000} />
                        <TableHeader headerName={pathname} buttons={[
                            {
                                label: 'Preview', icon: Add, onClick: () => {
                                    setIsModalOpen(true)
                                    // setInvoicePopup(true)
                                    // values.invoiceTotalAmount = invoiceTotalAmount
                                    values.servicesList = invoiceValues.servicesList
                                    values.totalAmount = invoiceTotalAmount ?? null;
                                    setInvoiceFinalData(values as any)
                                }
                            },
                            { label: 'Back', icon: Add, onClick: () => navigate(-1) },
                            { label: 'Save', icon: Add, onClick: handleSubmit },
                        ]} />
                        {/* ---------- payment Terms, gst type, tds tax screens ---------- */}
                        <DialogBoxUi
                            open={opendialogBox} // Set open to true to display the dialog initially
                            // title="Custom Dialog Title"
                            content={
                                <>
                                    {
                                        popUpComponent === PopupComponents.GST_TYPE ? <GstTypeScreen /> :
                                            popUpComponent === PopupComponents.PAYMENT_TERMS ? <PaymentTermsScreen /> :
                                                popUpComponent === PopupComponents.TDS_TAX ? <TdsTaxScreen /> :
                                                    popUpComponent === PopupComponents.SERVICES ? <ServiceScreen /> :
                                                        popUpComponent === PopupComponents.INVOICE ? <InvoiceUi /> : null
                                    }
                                </>
                            }
                            // actions={
                            //     <Button autoFocus onClick={handleClose}>
                            //         Save changes
                            //     </Button>
                            // }
                            handleClose={() => {
                                setIsOpenDialogBox(false)
                                setPopUpComponent("")

                            }}
                        />
                        {/* <ModalUi topHeight='90%' open={isModalOpen} onClose={() => {
                            setIsModalOpen(false)
                            setInvoicePopup(false)
                        }} >
                            <>
                                {invoicePopUp && (
                                    <InvoiceUi discount={discountAmount} subtotal={subTotalInvoiceAmount} tds={tdsAmount} invoiceData={invoiceFinalData}  emailModalOpen={setisEmailModalOpen} emailPopup={setEmailPopUp} isModalOpen={setIsModalOpen} invoicePopup={setInvoicePopup} gstTypePopup={setGstTypePopup} tdsTaxPopup={setTdsTaxPopup} paymentTermsPopUp={setPaymentTermsPopUp}/>
                                )}
                            </>
                        </ModalUi> */}

                        <ModalUi topHeight='60%' open={isModalOpen} onClose={() => {
                            setIsModalOpen(false)
                            setEmailPopUp(false)
                        }} >
                            <InvoiceUi discount={discountAmount} subtotal={subTotalInvoiceAmount} tds={tdsAmount} invoiceData={invoiceFinalData} />
                        </ModalUi>
                        <Form id="createClientForm" noValidate >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
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
                                {/* <Grid item xs={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                    }}>
                                        <Typography variant="subtitle2" color="initial">Created at : {formatDate(values.invoiceDate)}</Typography>
                                    </Box>
                                </Grid> */}
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
                                                    if (newValue) {
                                                        const selectedCustomerDetails = customers?.find((customer: any) => newValue.value === customer?.customerName);
                                                    }
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
                                                setIsOpenDialogBox(true)
                                                setPopUpComponent(PopupComponents.GST_TYPE)
                                                // navigate("/customer/create")
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
                                            endAdornment="%"
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
                                                setPopUpComponent(PopupComponents.PAYMENT_TERMS);
                                                setIsOpenDialogBox(true)
                                            }}
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    const selectedPaymentTerms = paymentTerms?.find((item) => item.termName === newValue.value)
                                                    if (selectedPaymentTerms) {
                                                        const today = new Date();
                                                        const startDate = format(today, 'dd-MM-yyyy');
                                                        const dueDate = format(addDays(today, selectedPaymentTerms.totalDays), 'dd-MM-yyyy')
                                                        setFieldValue("startDate", startDate)
                                                        setFieldValue("dueDate", dueDate)
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
                                            onChange={(date: Date) => {
                                                setFieldValue("startDate", date);
                                            }}
                                            value={values.startDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <DatePickerUi
                                            label="Due Date"
                                            onChange={(date: Date) => {
                                                setFieldValue("dueDate", date);
                                            }}
                                            value={values.dueDate}
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
                                                                    setIsOpenDialogBox(true)
                                                                    setPopUpComponent(PopupComponents.SERVICES)
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
                                                                            serviceQty: 0,
                                                                            serviceTotalAmount: 0
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
                                                                value={item?.serviceQty}
                                                                // label='INout sample'
                                                                onChange={(e) => handleQuantityChange(e, index)}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextFieldUi type='number' value={item?.serviceAmount}
                                                            // label='INout sample'
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">{item?.serviceTotalAmount}</TableCell>
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
                                                label='Discount'
                                                name='discount'
                                                type="number"
                                                endAdornment="%"
                                                value={values.discountPercentage ?? ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
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
                                                    setIsOpenDialogBox(true)
                                                    setPopUpComponent(PopupComponents.TDS_TAX)
                                                    // navigate("/customer/create")
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