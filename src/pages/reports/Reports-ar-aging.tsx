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
import { ArAgingInitialValueProps } from '../../types/types';
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
import { governmentGstType, gstType, invoiceType, AragingDate} from '../../constants/invoiceData';
import { pdfjs } from 'react-pdf';
import InvoiceUi from '../../components/Generate-Invoice/InvoiceUi';
import InvoiceGrid from '../Invoice/Invoice-grid';
import { columns } from '../../constants/grid-table-data/Reports-table-data';

const ArAgingscreen= () => {
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

    const newData = useMemo(() => {
        return serviceList?.map((item: any) => ({
            ...item,
            id: item._id
        })) || [];
    }, [serviceList]);

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
    }, [selectedServiceData, updateQty])

    useEffect(() => {
        const disAmount = (subTotalInvoiceAmount * (discountPercentage ?? 0)) / 100;
        setDiscountAmount(disAmount)

        let tdsTax = null;
        if (selectedTds) {
            if (selectedTds === "Professional Service 10%") {
                let discountPercentage = 10;
                let discountedAmount = (subTotalInvoiceAmount - disAmount) * (discountPercentage) / 100;
                setTdsAmount(discountedAmount);
                tdsTax = discountedAmount
            }
        }

        const invoiceAmount = tdsTax ? subTotalInvoiceAmount - (tdsTax + disAmount) : null;
        setInvoiceTotalAmount(invoiceAmount);
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

   
    return (
        <div>
            <Formik
                initialValues={invoiceInitialValue}
                // validationSchema={invoiceValidatiopSchema}
                validate={() => ({})}
                onSubmit={async (values: ArAgingInitialValueProps, { setSubmitting, resetForm }) => {
                    try {
                        values.servicesList = selectedServiceData;
                        values.invoiceTotalAmount = invoiceTotalAmount ?? null;
                        addInvoice(values);
                        // alert(JSON.stringify(values));
                        resetForm();
                    } catch (error) {
                        console.error("An error occurred during login:", error);
                    }
                    finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, touched, values, handleSubmit, setFieldValue }) => (
                    <div>
                        <ToastUi autoClose={2000} />
                        <TableHeader headerName={pathname} buttons={[
                            { label: 'Back', icon: Add, onClick: () => navigate(-1) }
                        ]} />
                        <ModalUi topHeight='70%' open={isModalOpen} onClose={handleCloseModal} >
                            <InvoiceUi discount={discountAmount} subtotal={subTotalInvoiceAmount} tds={tdsAmount} invoiceData={values} />
                        </ModalUi>
                        <Form id="createClientForm" noValidate >
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Box>
                                        <SelectDropdown
                                            onChange={(newValue: any) => {
                                                if (newValue) {
                                                    if (newValue.value === "This Week") {
                                                        const currentDateThisWeek = dayjs().format('DD-MM-YYYY');
                                                        const dueDateThisWeek = dayjs().add(30, 'days').format('DD-MM-YYYY');
                                                        setFieldValue("invoiceDate", currentDateThisWeek);
                                                        setFieldValue("dueDate", dueDateThisWeek);
                                                    } else if (newValue.value === "Last 7 days") {
                                                        const currentDate = dayjs().format('DD-MM-YYYY');
                                                        const dueDate = dayjs().add(45, 'days').format('DD-MM-YYYY');
                                                        setFieldValue("invoiceDate", currentDate);
                                                        setFieldValue("dueDate", dueDate);
                                                    }
                                                    else if (newValue.value === "This Month") {
                                                      const currentDateThisMonth = dayjs().format('DD-MM-YYYY');
                                                      const dueDateThisMonth = dayjs().add(45, 'days').format('DD-MM-YYYY');
                                                      setFieldValue("invoiceDate", currentDateThisMonth);
                                                      setFieldValue("dueDate", dueDateThisMonth);
                                                  }
                                                  else if (newValue.value === "Last 30 days") {
                                                    const currentDate30days = dayjs().format('DD-MM-YYYY');
                                                    const dueDate30days = dayjs().add(45, 'days').format('DD-MM-YYYY');
                                                    setFieldValue("invoiceDate", currentDate30days);
                                                    setFieldValue("dueDate", dueDate30days);
                                                }
                                                    else if (newValue.value === "Last Month") {
                                                        const currentDateLastMonth = dayjs().format('DD-MM-YYYY');
                                                        setFieldValue('invoiceDate', currentDateLastMonth)
                                                        setFieldValue("dueDate", currentDateLastMonth)
                                                    }
                                                    setFieldValue("AragingDate", newValue.value)
                                                } else {
                                                    setFieldValue("AragingDate", "")
                                                }
                                            }}
                                            options={AragingDate}
                                            value={values.AragingDate ? { value: values.AragingDate, label: values.AragingDate } : null}
                                            labelText='Custom'
                                            error={touched.AragingDate && Boolean(errors.AragingDate)}
                                            helperText={touched.AragingDate && errors.AragingDate}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={2}>
                                    <Box>
                                        <DatePickerUi
                                            label="Start Date"
                                            onChange={(date: any) => setFieldValue("invoiceDate", date)}
                                            value={values.invoiceDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <DatePickerUi
                                            label="End Date"
                                            onChange={(date: any) => console.log(date)}
                                            value={values.dueDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid container marginTop={5} marginLeft={2}>
                                <GridDataUi showToolbar={true} columns={columns} tableData={serviceList || []} checkboxSelection={false} />
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

export default ArAgingscreen