import React, { useEffect, useState } from 'react'
import TableHeader from '../../components/layouts/TableHeader';
import { Add, Approval, KeyboardBackspaceTwoTone, Save, } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import TextFieldUi from '../../components/ui/TextField';
import { AppDispatch, } from '../../redux-store/store'
import RadioUi from '../../components/ui/RadioGroup';
import { Formik, Form } from 'formik';
import { invoiceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { invoiceCreateInitialValue } from '../../constants/forms/formikInitialValues';
import { InvoiceInitialValueProps } from '../../types/types';
import DatePickerUi from '../../components/ui/DatePicker';
import ModalUi from '../../components/ui/ModalUi';
import { generateOptions } from '../../services/utils/dropdownOptions';
import InvoiceUi from './Generate-Invoice/InvoiceUi';
import { invoiceType, } from '../../constants/invoiceData';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import TextAreaUi from '../../components/ui/TextArea';
import GstTypeScreen from './GstType/GstTypeScreen';
import TdsTaxScreen from './TdsTax/TdsTaxScreen';
import PaymentTermsScreen from './paymentTerms/PaymentTermsScreen';
import { addDays, format } from 'date-fns';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import DialogBoxUi from '../../components/ui/DialogBox';
import SelectDropdown from '../../components/ui/SelectDropdown';
import { useCreateInvoiceMutation, useGetCustomersListQuery, useGetGstTypeListQuery, useGetInvoiceListQuery, useGetPaymentTermsListQuery, useGetServiceListQuery, useGetTdsTaxListQuery, useUpdateInvoiceMutation } from '../../redux-store/api/injectedApis';
import { clearInvoiceData, setInvoiceData } from '../../redux-store/slices/invoiceSlice';
import ServiceScreen from './service/ServiceScreen';
import { useRolePermissions } from '../../hooks/useRolePermission';

interface Service {
    id: string; // Ensure id is mandatory
    serviceAccountingCode: string;
    serviceDescription: string;
    serviceAmount: number;
    serviceQty: number;
    serviceTotalAmount: number;
}
interface InvoiceGetValueProps {
    invoiceValue: any;
}

const InvoiceFormScreen = ({ invoiceValue }: InvoiceGetValueProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const navigate = useNavigate();
    // popUps
    const [popUpComponent, setPopUpComponent] = useState("");
    const { data: customers, error, isLoading, refetch: customerRefetch } = useGetCustomersListQuery();
    const { data: invoiceList, refetch: invoiceRefetch } = useGetInvoiceListQuery();
    const [addInvoice, { isSuccess: addInvoiceSuccess, isError: addInvoiceError, error: addInvoiceErrorObject }] = useCreateInvoiceMutation();
    const [updateInvoice, { isSuccess: invoiceUpdatedSuccess, isError: invoiceUpdateError, error: invoiceUpdateErrorObject }] = useUpdateInvoiceMutation();
    const [opendialogBox, setIsOpenDialogBox] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subTotalInvoiceAmount, setSubTotalInvoiceAmount] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);
    const [discountAmount, setDiscountAmount] = useState<number | null>(null);
    const [selectedTds, setSelectedTdsAmount] = useState<number | null>(null);
    const [tdsAmount, setTdsAmount] = useState<number | null>(null);
    const [invoiceTotalAmount, setInvoiceTotalAmount] = useState<number | null>();
    // * * * * * * * grid table states * * * * * * * * *
    // const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();
    const { data: serviceList } = useGetServiceListQuery();
    const { data: paymentTerms } = useGetPaymentTermsListQuery();
    const [modifiedServiceList, setModifiedServiceList] = React.useState<Service[]>([]);
    const rowIdCounter = React.useRef<number>(0); // Ref for keeping track of row IDs
    const [invoiceValues, setInvoiceValues] = useState(invoiceValue || invoiceCreateInitialValue);
    const { data: gstTypesData = [] } = useGetGstTypeListQuery();
    const { data: tdsTaxData = [] } = useGetTdsTaxListQuery();
    // * ----------- to generate the dropdown options -------------
    const customerName = generateOptions(customers, 'customerName', 'customerName');
    const gstTypeOptions = generateOptions(gstTypesData, "gstName", "gstName");
    const tdsTaxOptions = generateOptions(tdsTaxData, "taxName", "taxName");
    const paymentTermsOptions = generateOptions(paymentTerms, "termName", "termName");
    const [preview, setPreview] = useState(false);
    const [resMessage, setResMessage] = useState('');
    const { canCreateTds,canCreateGst, canCreatePayment ,canCreateService} = useRolePermissions();
    const PopupComponents = {
        GST_TYPE: 'gstType',
        PAYMENT_TERMS: 'paymentTerms',
        TDS_TAX: 'tdsTax',
        SERVICES: 'services',
        INVOICE: 'invoice'
    }

    useEffect(() => {
        customerRefetch()
    }, [dispatch, customerRefetch,])

    useEffect(() => {
        invoiceRefetch()
    }, [addInvoiceSuccess, invoiceRefetch]);

    useSnackbarNotifications({
        success: addInvoiceSuccess,
        error: addInvoiceError,
        successMessage: resMessage,
        errorMessage: 'Error adding invoice',
        errorObject: addInvoiceErrorObject,
    });

    useSnackbarNotifications({
        success: invoiceUpdatedSuccess,
        error: invoiceUpdateError,
        successMessage: resMessage,
        errorMessage: 'Error updating invoice',
        errorObject: invoiceUpdateErrorObject,
    });

    React.useEffect(() => {

        if (invoiceValues) {
            const sumSubTotal = invoiceValues.servicesList.reduce((acc: any, row: any) => acc + row.serviceTotalAmount, 0)
            setSubTotalInvoiceAmount(sumSubTotal)
            setDiscountPercentage(invoiceValues.discountPercentage)
            setSelectedTdsAmount(invoiceValues.taxAmount.tds)
        }
    }, [invoiceValues]);

    React.useEffect(() => {
        const disAmount = (subTotalInvoiceAmount * (discountPercentage ?? 0)) / 100;
        setDiscountAmount(disAmount)
        let tdsTax = null;
        if (selectedTds) {
            let discountedAmount = (subTotalInvoiceAmount - disAmount) * (selectedTds) / 100;

            setTdsAmount(discountedAmount);
            tdsTax = discountedAmount;
        } else {
            setTdsAmount(null);
        }
        const invoiceAmount = tdsTax ? subTotalInvoiceAmount - (tdsTax + disAmount) : null;
        const roundedInvoiceAmount = invoiceAmount ? Number(invoiceAmount.toFixed(2)) : null;
        setInvoiceTotalAmount(roundedInvoiceAmount);
    }, [discountPercentage, subTotalInvoiceAmount, selectedTds])

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

    // * this is for edit screen only
    React.useEffect(() => {
        if (invoiceValue) {
            const data = tdsTaxData?.find((item: any) => item?.taxName === invoiceValues.taxAmount.tds)
            setSelectedTdsAmount(data?.taxPercentage)
        }
        setTdsAmount(invoiceValues.taxAmount.tds)
    }, [invoiceValue]);

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

    return (
        <Formik
            initialValues={invoiceValues}
            validationSchema={invoiceValidationSchema}
            // validate={() => ({})}
            onSubmit={async (values: InvoiceInitialValueProps, { setSubmitting, resetForm, }) => {
                try {
                    // values.invoiceTotalAmount = invoiceTotalAmount
                    values.servicesList = invoiceValues.servicesList
                    values.totalAmount = invoiceTotalAmount ?? null;
                    if (invoiceValue) {
                        const response = await updateInvoice({ id: invoiceValue.id, data: values });
                        console.log("API Response:", response);
                        setResMessage(response.data.message);
                        console.log("sent to approver message", response.data.message)
                        dispatch(clearInvoiceData());
                        resetForm();
                        navigate(-1);
                    } else {
                        console.log("values", values);
                        const response = await addInvoice(values);
                        setResMessage(response.data.message);
                        resetForm();
                    }
                    resetForm();
                    setInvoiceValues({ ...invoiceValues })
                } catch (error) {
                    console.error("An error occurred during login:", error);
                }
                finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, touched, values, handleChange, handleSubmit, setFieldValue, isValid, dirty }) => {
                return (
                    <div>

                        <TableHeader headerName={pathname} buttons={[
                            {
                                label: 'Preview', icon: Add, onClick: () => {
                                    const updatedValue = {
                                        ...values,
                                        servicesList: invoiceValues.servicesList ?? null,
                                        totalAmount: invoiceTotalAmount ?? null,
                                    }
                                    dispatch(setInvoiceData(updatedValue as any))

                                    setPreview(false);
                                    setIsModalOpen(true);
                                    dispatch(setInvoiceData(updatedValue as any))
                                },
                                disabled: !(isValid && dirty),
                            },
                            {
                                label: 'Sent to Approver', icon: Approval, disabled: !(isValid && dirty), onClick: () => {
                                    values.invoiceStatus = "PENDING";
                                    handleSubmit()
                                }
                            },
                            { label: 'Back', icon: KeyboardBackspaceTwoTone, onClick: () => navigate(-1) },
                            {
                                label: 'Save', icon: Save, onClick: async () => {
                                    handleSubmit()
                                },
                                // disabled: !(isValid && dirty)
                            },
                        ]} />
                        {/* ---------- payment Terms, gst type, tds tax screens ---------- */}
                        <DialogBoxUi
                            open={opendialogBox}
                            content={
                                <>
                                    {
                                        popUpComponent === PopupComponents.GST_TYPE ? <GstTypeScreen /> :
                                            popUpComponent === PopupComponents.PAYMENT_TERMS ? <PaymentTermsScreen /> :
                                                popUpComponent === PopupComponents.TDS_TAX ? <TdsTaxScreen /> :
                                                    popUpComponent === PopupComponents.SERVICES ? <ServiceScreen /> :
                                                        popUpComponent === PopupComponents.INVOICE ? <InvoiceUi preview={preview} discount={discountAmount} subtotal={subTotalInvoiceAmount} tds={tdsAmount} isModalOpen={setIsModalOpen} /> : null
                                    }
                                </>
                            }
                            handleClose={() => {
                                setIsOpenDialogBox(false)
                                setPopUpComponent("")

                            }}
                        />
                        <Form id="createClientForm" noValidate >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box>
                                        <RadioUi value={values.invoiceType} required={true} disabled={false} onChange={(newValue: any) => {
                                            if (newValue) {
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
                                            disabled
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
                                                    if (newValue) {
                                                        const selectedCustomerDetails = customers?.find((customer: any) => newValue.value === customer?.customerName);
                                                    }
                                                    setFieldValue("customerName", newValue.value)
                                                } else {
                                                    setFieldValue("customerName", "")
                                                }
                                            }}
                                            required={true}
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
                                            onMouseDown={() => {
                                                setIsOpenDialogBox(true)
                                                setPopUpComponent(PopupComponents.GST_TYPE)
                                                // navigate("/customer/create")
                                            }}
                                            button={canCreateGst}
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    const selectedGstType = gstTypesData.find((item: any) => item.gstName === newValue.value)
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
                                            required={true}
                                            options={gstTypeOptions}
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
                                            disabled
                                            fullWidth={false}
                                            label='Gst Percentage'
                                            name='gstPercentage'
                                            type="number"
                                            endAdornment="%"
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
                                            required={true}
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
                                            button={canCreatePayment}
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
                                            required={true}
                                            options={paymentTermsOptions}
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
                                            disabled
                                            required={true}
                                            label="Start Date"
                                            onChange={(date: string) => {
                                                setFieldValue("startDate", date);
                                            }}
                                            value={values.startDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <DatePickerUi
                                            disabled
                                            required={true}
                                            label="Due Date"
                                            onChange={(date: string) => {
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
                                                                button={canCreateService}
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
                                                button={canCreateTds}
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

export default InvoiceFormScreen