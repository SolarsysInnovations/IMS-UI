// DynamicFormDemo.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import { invoiceInitialValue } from '../constants/forms/formikInitialValues';
import { InvoiceInitialValueProps } from '../types/types';
import { invoiceScreenForm } from '../constants/form-data/form-data-json';
import FormFieldRenderer from '../components/Form-renderer/Form-field-renderer';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useGetCustomersQuery } from '../redux-store/customer/customerApi';
import { generateOptions } from '../services/utils/dropdownOptions';
import dayjs from 'dayjs';
import { useGetServiceQuery } from '../redux-store/service/serviceApi';
import InvoiceGrid from './Invoice/Invoice-grid';
import MultiSelectUi from '../components/ui/MultiSelect';
import InvoiceCalculation from './Invoice/InvoiceCalculation';
import { useNavigate } from 'react-router-dom';
import ModalUi from '../components/ui/ModalUi';
import InvoiceUi from '../components/Generate-Invoice/InvoiceUi';
import { columns } from '../constants/grid-table-data/invoice/invoice-service-table-data';
import { invoiceValidationSchema } from '../constants/forms/validations/validationSchema';

const DynamicFormDemo = () => {
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
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
    const navigate = useNavigate();

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

    const customerOptions = generateOptions(customers, 'customerName', 'customerName');
    const serviceAccountCode = generateOptions(serviceList, "serviceAccountingCode", "serviceAccountingCode")

    const updatedInvoiceScreenForm = invoiceScreenForm.map(field => {
        if (field.name === 'customerName') {
            return {
                ...field,
                options: customerOptions
            };
        }
        return field;
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Formik
                initialValues={invoiceInitialValue}
                // validate={() => ({})}
                validationSchema={invoiceValidationSchema}
                onSubmit={async (values: InvoiceInitialValueProps, { setSubmitting }) => {
                    try {
                        values.servicesList = selectedServiceData;
                        values.invoiceTotalAmount = invoiceTotalAmount ?? null;
                        console.log(values);
                        alert(JSON.stringify(values));
                    } catch (error) {
                        console.error("An error occurred during form submission:", error);
                    }
                    finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => (
                    <div>
                        <Form id="createClientForm" noValidate >
                            <ModalUi topHeight='70%' open={isModalOpen} onClose={handleCloseModal} >
                                <InvoiceUi discount={discountAmount} subtotal={subTotalInvoiceAmount} tds={tdsAmount} invoiceData={values} />
                            </ModalUi>
                            <Grid container spacing={2}>
                                {updatedInvoiceScreenForm.map((field) => (
                                    <FormFieldRenderer
                                        errors={errors}
                                        touched={touched}
                                        handleBack={() => navigate(-1)}
                                        handleSave={handleSubmit}
                                        handlePreviewInvoice={() => setIsModalOpen(true)}
                                        key={field.name}
                                        field={field}
                                        formData={values}
                                        onChange={handleChange}
                                        setFormData={(fieldName: string, value: any) => {
                                            if (field.name === 'paymentTerms') {
                                                if (value === "Net 30") {
                                                    const currentDateNet30 = dayjs().format('DD-MM-YYYY');
                                                    const dueDateNet30 = dayjs().add(30, 'days').format('DD-MM-YYYY');
                                                    setFieldValue("invoiceDate", currentDateNet30);
                                                    setFieldValue("dueDate", dueDateNet30);
                                                } else if (value === "Net 45") {
                                                    const currentDateNet45 = dayjs().format('DD-MM-YYYY');
                                                    const dueDateNet45 = dayjs().add(45, 'days').format('DD-MM-YYYY');
                                                    setFieldValue("invoiceDate", currentDateNet45);
                                                    setFieldValue("dueDate", dueDateNet45);
                                                } else if (value === "Due On Receipt") {
                                                    const currentDate = dayjs().format('DD-MM-YYYY');
                                                    setFieldValue('invoiceDate', currentDate);
                                                    setFieldValue("dueDate", currentDate);
                                                }
                                            } else if (field.name === 'gstType') {
                                                if (value === "Local" || value === "Interstate") {
                                                    setFieldValue("gstPercentage", "0.18");
                                                } else if (value === "SEZ") {
                                                    setFieldValue("gstPercentage", "0");
                                                }
                                            }
                                            setFieldValue(fieldName, value);
                                        }}
                                    />
                                ))}
                                <Grid item xs={6}>
                                    <MultiSelectUi
                                        options={serviceAccountCode?.filter((option: { value: string }) => !values.service.some((item: string) => item === option.value))}
                                        label='Select Services'
                                        value={values.service.map(item => ({ value: item, label: item }))}
                                        onChange={(event: React.ChangeEvent<{}>, newValue: any | any[]) => {
                                            if (Array.isArray(newValue)) {
                                                const newServiceValues = newValue.map(item => (item.value));
                                                setFieldValue("service", newServiceValues);
                                                const selectedServiceCodes = newValue.map(item => item.value);
                                                setSelectedServiceCode(selectedServiceCodes);
                                                values.servicesList = selectedServiceData;
                                            } else if (newValue !== null) {
                                                const newServiceValues = [{ value: newValue.value }];
                                                setFieldValue("service", newServiceValues);
                                            } else {
                                                setFieldValue("service", []);
                                            }
                                        }}
                                        error={touched.service && Boolean(errors.service)}
                                        helperText={touched.service && errors.service}
                                    />
                                </Grid>
                                {selectedServiceData.length === 0 ? "" : (
                                    <InvoiceGrid setUpdateQty={setUpdateQty} values={values} columns={columns} hideFooter={true}
                                        pagination={true} showToolbar={false} tableData={values.service.length === 0 ? [] : selectedServiceData || []} />
                                )}
                                <InvoiceCalculation discountAmount={discountAmount} invoiceTotalAmount={invoiceTotalAmount} tdsAmount={tdsAmount} setDiscountPercentage={setDiscountPercentage} setFieldValue={setFieldValue} setSelectedTdsAmount={setSelectedTdsAmount} subTotalInvoiceAmount={subTotalInvoiceAmount} values={values} />
                            </Grid>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default DynamicFormDemo;
