import React, { ChangeEvent, useEffect, useState } from 'react';
import TableHeader from '../../components/layouts/TableHeader';
import {
  Add,
  Approval,
  KeyboardBackspaceTwoTone,
  Save,
} from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import TextFieldUi from '../../components/ui/TextField';
import { AppDispatch } from '../../app/store';
import RadioUi from '../../components/ui/RadioGroup';
import { Form, Formik } from 'formik';
import { invoiceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { invoiceCreateInitialValue } from '../../constants/forms/formikInitialValues';
import { InvoiceInitialValueProps } from '../../types/types';
import DatePickerUi from '../../components/ui/DatePicker';
import { generateOptions } from '../../services/utils/dropdownOptions';
import InvoiceUi from './Generate-Invoice/InvoiceUi';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import TextAreaUi from '../../components/ui/TextArea';
import GstTypeScreen from './GstType/GstTypeScreen';
import TdsTaxScreen from './TdsTax/TdsTaxScreen';
import PaymentTermsScreen from './paymentTerms/PaymentTermsScreen';
import { addDays, format } from 'date-fns';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import DialogBoxUi from '../../components/ui/DialogBox';
import SelectDropdown from '../../components/ui/SelectDropdown';
import {
  useCreateInvoiceMutation,
  useGetCustomersListQuery,
  useGetGstTypeListQuery,
  useGetInvoiceListQuery,
  useGetPaymentTermsListQuery,
  useGetServiceListQuery,
  useGetTdsTaxListQuery,
  useUpdateInvoiceMutation,
} from '../../redux-store/api/injectedApis';
import {
  clearInvoiceData,
  setInvoiceData,
} from '../../redux-store/slices/invoiceSlice';
import ServiceScreen from './service/ServiceScreen';
import { useRolePermissions } from '../../hooks/useRolePermission';
import CancelIcon from '@mui/icons-material/Close';

interface Service {
  id: string;
  serviceAccountingCode: string;
  serviceDescription: string;
  serviceAmount: number;
  serviceHours: number;
  serviceTotalAmount: number;
}
interface InvoiceGetValueProps {
  invoiceValue: any;
}

const invoiceType = [
  { value: 'Retainer', label: 'Retainer' },
  { value: 'Onetime', label: 'Onetime' },
];

const InvoiceFormScreen = ({ invoiceValue }: InvoiceGetValueProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const navigate = useNavigate();
  const [popUpComponent, setPopUpComponent] = useState('');
  const { data: customers, refetch: customerRefetch } =
    useGetCustomersListQuery();
  const { refetch: invoiceRefetch } = useGetInvoiceListQuery();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [image, setImage] = useState<string | null>(null);
  const [
    addInvoice,
    {
      isSuccess: addInvoiceSuccess,
      isError: addInvoiceError,
      error: addInvoiceErrorObject,
    },
  ] = useCreateInvoiceMutation();
  const [
    updateInvoice,
    {
      isSuccess: invoiceUpdatedSuccess,
      isError: invoiceUpdateError,
      error: invoiceUpdateErrorObject,
    },
  ] = useUpdateInvoiceMutation();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const [subTotalInvoiceAmount, setSubTotalInvoiceAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(
    null,
  );
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [selectedTds, setSelectedTds] = useState<number | null>(null);
  const [tdsAmount, setTdsAmount] = useState<number | null>(null);
  const [invoiceTotalAmount, setInvoiceTotalAmount] = useState<number | null>();
  const [retainerAmount, setRetainerAmount] = useState(0);
  // * * * * * * * grid table states * * * * * * * * *
  // const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();
  const { data: serviceList } = useGetServiceListQuery();
  const { data: paymentTerms } = useGetPaymentTermsListQuery();
  const [modifiedServiceList, setModifiedServiceList] = React.useState<
    Service[]
  >([]);
  const rowIdCounter = React.useRef<number>(0); // Ref for keeping track of row IDs
  const [invoiceValues, setInvoiceValues] = useState(
    invoiceValue ?? invoiceCreateInitialValue,
  );
  const { data: gstTypesData = [] } = useGetGstTypeListQuery();
  const { data: tdsTaxData = [] } = useGetTdsTaxListQuery();
  const [redirect, setRedirect] = useState(false);
  // * ----------- to generate the dropdown options -------------
  const customerName = generateOptions(
    customers,
    'customerName',
    'customerName',
  );
  const gstTypeOptions = generateOptions(gstTypesData, 'gstName', 'gstName');
  const tdsTaxOptions = generateOptions(tdsTaxData, 'taxName', 'taxName');
  const paymentTermsOptions = generateOptions(
    paymentTerms,
    'termName',
    'termName',
  );
  const [preview, setPreview] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const { canCreateTds, canCreateGst, canCreatePayment, canCreateService } =
    useRolePermissions();

  const PopupComponents = {
    GST_TYPE: 'gstType',
    PAYMENT_TERMS: 'paymentTerms',
    TDS_TAX: 'tdsTax',
    SERVICES: 'services',
    INVOICE: 'invoice',
  };

  useEffect(() => {
    customerRefetch();
  }, [dispatch, customerRefetch]);

  useEffect(() => {
    invoiceRefetch();
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
    successMessage: resMessage || 'Invoice Updated Successfully',
    errorMessage: 'Error updating invoice',
    errorObject: invoiceUpdateErrorObject,
  });

  useEffect(() => {
    if (addInvoiceSuccess || invoiceUpdatedSuccess) {
      setRedirect(true);
    }
  }, [addInvoiceSuccess, invoiceUpdatedSuccess]);

  useEffect(() => {
    if (redirect) {
      navigate(-1);
    }
  }, [redirect, navigate]);

  useEffect(() => {
    if (invoiceValues) {
      const sumSubTotal = invoiceValues.servicesList.reduce(
        (acc: any, row: any) => acc + row.serviceTotalAmount,
        0,
      );
      setSubTotalInvoiceAmount(sumSubTotal);
      setDiscountPercentage(invoiceValues.discountPercentage);
      setSelectedTds(invoiceValues.taxAmount.tds);
    }
  }, [invoiceValues]);

  useEffect(() => {
    const subtotalAfterRetainer = Math.max(
      subTotalInvoiceAmount + retainerAmount,
      0,
    );

    const disAmount = (subtotalAfterRetainer * (discountPercentage ?? 0)) / 100;
    setDiscountAmount(disAmount);

    let tdsTax = null;
    if (selectedTds) {
      let discountedAmount =
        ((subtotalAfterRetainer - disAmount) * selectedTds) / 100;
      setTdsAmount(discountedAmount);
      tdsTax = discountedAmount;
    } else {
      setTdsAmount(null);
    }

    const invoiceAmount = tdsTax
      ? subtotalAfterRetainer - (tdsTax + disAmount)
      : subtotalAfterRetainer - disAmount;

    const roundedInvoiceAmount = Number(invoiceAmount.toFixed(2));
    setInvoiceTotalAmount(roundedInvoiceAmount);
  }, [subTotalInvoiceAmount, retainerAmount, discountPercentage, selectedTds]);

  useEffect(() => {
    if (serviceList) {
      const mappedServiceList = serviceList.map((s: any) => ({
        id: `${rowIdCounter.current++}`, // Manually assign unique ID
        serviceAccountingCode: s.serviceAccountingCode,
        serviceDescription: s.serviceDescription,
        serviceHours: 0,
        serviceAmount: s.serviceAmount,
        serviceTotalAmount: 0,
      }));
      setModifiedServiceList(mappedServiceList);
    }
  }, [serviceList]);

  // * this is for edit screen only
  useEffect(() => {
    if (invoiceValue) {
      const data = tdsTaxData?.find(
        (item: any) => item?.taxName === invoiceValues.taxAmount.tds,
      );
      setSelectedTds(data?.taxPercentage);
    }
    setTdsAmount(invoiceValues.taxAmount.tds);
  }, [invoiceValue]);

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target;
    const parsedValue = parseInt(value); // Parse the value to an integer
    setInvoiceValues((prevInvoiceValues: any) => {
      const updatedServicesList = prevInvoiceValues.servicesList.map(
        (service: any, serviceIndex: any) => {
          if (serviceIndex === index) {
            const serviceHours = isNaN(parsedValue) ? 0 : parsedValue;
            const serviceTotalAmount = serviceHours * service.serviceAmount;
            return {
              ...service,
              serviceHours,
              serviceTotalAmount,
            };
          }
          return service;
        },
      );
      return {
        ...prevInvoiceValues,
        servicesList: updatedServicesList,
      };
    });
  };

  const handleAddRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newRow = {
      id: `row_${Date.now()}`,
      serviceAccountingCode: '',
      serviceHours: 0,
      serviceAmount: 0,
      serviceTotalAmount: 0,
    };
    const updatedServicesList = [...invoiceValues.servicesList, newRow];
    setInvoiceValues((prevState: any) => ({
      ...prevState,
      servicesList: updatedServicesList,
    }));
  };

  const handleRemoveRow = (id: string) => {
    // Find the index of the row with the provided id in invoiceValues.servicesList
    const index = invoiceValues.servicesList.findIndex(
      (row: any) => row.id === id,
    );
    if (index !== -1) {
      // Create a new array without the removed row
      const updatedServicesList = invoiceValues.servicesList.filter(
        (_: any, idx: any) => idx !== index,
      );
      // Update the state with the new array
      setInvoiceValues((prevState: any) => ({
        ...prevState,
        servicesList: updatedServicesList,
      }));
    }
  };
  const paymentOptions: any[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' },
  ];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maybefile = event.target.files?.[0];
    if (!maybefile) {
      console.error('No file selected');
      return;
    }
    const file: File = maybefile;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a JPG or PNG image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result as string;
        const processedImage = image.replace(/^data:image\/[a-z]+;base64,/, '');
        setImage(processedImage);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = async () => {
    if (imagePreview) {
      setImagePreview(null);
    }
  };

  function handlePopupComponents(popUpComponent: string) {
    if (popUpComponent === PopupComponents.GST_TYPE) {
      return <GstTypeScreen />;
    } else if (popUpComponent === PopupComponents.PAYMENT_TERMS) {
      return <PaymentTermsScreen />;
    } else if (popUpComponent === PopupComponents.TDS_TAX) {
      return <TdsTaxScreen />;
    } else if (popUpComponent === PopupComponents.SERVICES) {
      return <ServiceScreen />;
    } else if (popUpComponent === PopupComponents.INVOICE) {
      return (
        <InvoiceUi
          preview={preview}
          discount={discountAmount}
          subtotal={subTotalInvoiceAmount}
          tds={tdsAmount}
          setIsModalOpen={setIsModalOpen}
        />
      );
    } else {
      return null;
    }
  }

  return (
    <Formik
      initialValues={invoiceValues}
      validationSchema={invoiceValidationSchema}
      onSubmit={async (
        values: InvoiceInitialValueProps,
        { setSubmitting, resetForm },
      ) => {
        try {
          values.servicesList = invoiceValues.servicesList;
          values.totalAmount = invoiceTotalAmount ?? null;
          if (invoiceValue) {
            const response = await updateInvoice({
              id: invoiceValue.id,
              data: values,
            });
            setResMessage(response.data.message);
            dispatch(clearInvoiceData());
            resetForm();
            navigate(-1);
          } else {
            const updatedInvoiceValues = {
              ...values,
              signatureFile: image,
            };
            const response = await addInvoice(updatedInvoiceValues);
            setResMessage(response.data.message);
            resetForm();
          }
          resetForm();
          setInvoiceValues({ ...invoiceValues });
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        isValid,
        dirty,
      }) => {
        return (
          <div>
            <TableHeader
              headerName={pathname}
              buttons={[
                {
                  label: 'Preview',
                  icon: Add,
                  onClick: () => {
                    const updatedValue = {
                      ...values,
                      servicesList: invoiceValues.servicesList ?? null,
                      totalAmount: invoiceTotalAmount ?? null,
                    };
                    dispatch(setInvoiceData(updatedValue));

                    setPreview(false);
                    setIsModalOpen(true);
                    dispatch(setInvoiceData(updatedValue));
                  },
                  disabled: !(isValid && dirty),
                },
                {
                  label: 'Sent to Approver',
                  icon: Approval,
                  disabled: !(isValid && dirty),
                  onClick: () => {
                    values.invoiceStatus = 'PENDING';
                    handleSubmit();
                  },
                },
                {
                  label: 'Back',
                  icon: KeyboardBackspaceTwoTone,
                  onClick: () => navigate(-1),
                },
                {
                  label: 'Save',
                  icon: Save,
                  onClick: async () => {
                    handleSubmit();
                  },
                },
              ]}
            />
            {/* ---------- payment Terms, gst type, tds tax screens ---------- */}
            <DialogBoxUi
              open={openDialogBox}
              content={handlePopupComponents(popUpComponent)}
              handleClose={() => {
                setOpenDialogBox(false);
                setPopUpComponent('');
              }}
            />
            <Form id="createClientForm" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <RadioUi
                      value={values.invoiceType}
                      required={true}
                      disabled={false}
                      onChange={(newValue: any) => {
                        if (newValue) {
                          setFieldValue('invoiceType', newValue.target.value);
                        } else {
                          setFieldValue('invoiceType', '');
                        }
                      }}
                      groupName="type"
                      options={invoiceType}
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
                      label="Invoice Number"
                      name="invoiceNumber"
                      type="text"
                      value={(() => {
                        return values.invoiceNumber;
                      })()}
                      onChange={handleChange}
                      error={
                        touched.invoiceNumber && Boolean(errors.invoiceNumber)
                      }
                      helperText={touched.invoiceNumber && errors.invoiceNumber}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <SelectDropdown
                      labelText="Customer Name"
                      required={true}
                      options={customerName}
                      value={values.customerName}
                      onChange={(newValue: any) => {
                        if (newValue) {
                          const selectedCustomerDetails = customers?.find(
                            (customer: any) =>
                              newValue.value === customer.customerName,
                          );

                          if (selectedCustomerDetails) {
                            setFieldValue(
                              'customerName',
                              selectedCustomerDetails.customerName,
                            );
                            setFieldValue(
                              'customerId',
                              selectedCustomerDetails.id,
                            );
                            setFieldValue(
                              'customerEmail',
                              selectedCustomerDetails.customerEmail,
                            );
                            setFieldValue(
                              'customerPhone',
                              selectedCustomerDetails.customerPhone,
                            );
                            // Add more fields if required
                          }
                        } else {
                          setFieldValue('customerName', '');
                          setFieldValue('customerId', '');
                        }
                      }}
                      error={
                        touched.customerName && Boolean(errors.customerName)
                      }
                      helperText={touched.customerName && errors.customerName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <SelectDropdown
                      onMouseDown={() => {
                        setOpenDialogBox(true);
                        setPopUpComponent(PopupComponents.GST_TYPE);
                      }}
                      button={canCreateGst}
                      onChange={(newValue: any) => {
                        if (newValue) {
                          const selectedGstType = gstTypesData.find(
                            (item: any) => item.gstName === newValue.value,
                          );
                          if (selectedGstType) {
                            setFieldValue(
                              'gstPercentage',
                              selectedGstType.gstPercentage,
                            );
                            setFieldValue('gstType', newValue.value);
                          } else {
                            setFieldValue('gstType', '');
                            setFieldValue('gstPercentage', null);
                          }
                        } else {
                          setFieldValue('gstType', '');
                          setFieldValue('gstPercentage', null);
                        }
                      }}
                      required={true}
                      options={gstTypeOptions}
                      value={
                        values.gstType
                          ? {
                              value: values.gstType,
                              label: values.gstType,
                            }
                          : null
                      }
                      labelText="Gst Type"
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
                      label="Gst Percentage"
                      name="gstPercentage"
                      type="number"
                      endAdornment="%"
                      value={values.gstPercentage ?? ''}
                      onChange={handleChange}
                      error={
                        touched.gstPercentage && Boolean(errors.gstPercentage)
                      }
                      helperText={touched.gstPercentage && errors.gstPercentage}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <TextFieldUi
                      required={true}
                      fullWidth={false}
                      label="GstIn Number"
                      name="gstInNumber"
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
                    {values.invoiceType === 'Retainer' ? (
                      <SelectDropdown
                        onMouseDown={() => {
                          setPopUpComponent(PopupComponents.PAYMENT_TERMS);
                          setOpenDialogBox(true);
                        }}
                        onChange={(newValue: any) => {
                          if (newValue) {
                            // Determine the number of days based on the selected term
                            let totalDays;
                            switch (newValue.value) {
                              case 'monthly':
                                totalDays = 30;
                                break;
                              case 'quarterly':
                                totalDays = 45;
                                break;
                              case 'annually':
                                totalDays = 365;
                                break;
                              default:
                                totalDays = 0; // Default to 0 if an unknown term is selected
                            }

                            if (totalDays > 0) {
                              const today = new Date();
                              const startDate = format(today, 'dd-MM-yyyy');
                              const dueDate = format(
                                addDays(today, totalDays),
                                'dd-MM-yyyy',
                              );
                              setFieldValue('startDate', startDate);
                              setFieldValue('dueDate', dueDate);
                              setFieldValue('paymentTerms', newValue.value);
                            } else {
                              setFieldValue('startDate', '');
                              setFieldValue('dueDate', '');
                            }
                          } else {
                            setFieldValue('paymentTerms', '');
                            setFieldValue('startDate', '');
                            setFieldValue('dueDate', '');
                          }
                        }}
                        required={true}
                        options={paymentOptions}
                        value={
                          values.paymentTerms
                            ? {
                                value: values.paymentTerms,
                                label:
                                  values.paymentTerms[0].toUpperCase() +
                                  values.paymentTerms.slice(1).toLowerCase(),
                              }
                            : null
                        }
                        labelText="Payment Terms"
                        error={
                          touched.paymentTerms && Boolean(errors.paymentTerms)
                        }
                        helperText={touched.paymentTerms && errors.paymentTerms}
                      />
                    ) : (
                      <SelectDropdown
                        button={canCreatePayment}
                        onMouseDown={() => {
                          setPopUpComponent(PopupComponents.PAYMENT_TERMS);
                          setOpenDialogBox(true);
                        }}
                        onChange={(newValue: any) => {
                          if (newValue) {
                            const selectedPaymentTerms = paymentTerms?.find(
                              (item) => item.termName === newValue.value,
                            );
                            if (selectedPaymentTerms) {
                              const today = new Date();
                              const startDate = format(today, 'dd-MM-yyyy');
                              const dueDate = format(
                                addDays(today, selectedPaymentTerms.totalDays),
                                'dd-MM-yyyy',
                              );
                              setFieldValue('startDate', startDate);
                              setFieldValue('dueDate', dueDate);
                              setFieldValue('paymentTerms', newValue.value);
                            } else {
                              setFieldValue('startDate', '');
                              setFieldValue('dueDate', '');
                            }
                          } else {
                            setFieldValue('paymentTerms', '');
                            setFieldValue('startDate', '');
                            setFieldValue('dueDate', '');
                          }
                        }}
                        required={true}
                        options={paymentTermsOptions}
                        value={
                          values.paymentTerms
                            ? {
                                value: values.paymentTerms,
                                label: values.paymentTerms,
                              }
                            : null
                        }
                        labelText="Payment Terms"
                        error={
                          touched.paymentTerms && Boolean(errors.paymentTerms)
                        }
                        helperText={touched.paymentTerms && errors.paymentTerms}
                      />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={2}>
                  <Box>
                    <DatePickerUi
                      disabled
                      required={true}
                      label="Start Date"
                      onChange={(date: string) => {
                        setFieldValue('startDate', date);
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
                        setFieldValue('dueDate', date);
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
                          <TableCell sx={{ width: '140px' }}>
                            Service Accounting Code
                          </TableCell>
                          <TableCell sx={{ width: '320px' }} align="center">
                            Description
                          </TableCell>
                          <TableCell sx={{ width: '50px' }} align="center">
                            Hours
                          </TableCell>

                          <TableCell sx={{ width: '100px' }} align="center">
                            Service Amount
                          </TableCell>
                          <TableCell sx={{ width: '100px' }} align="right">
                            Amount
                          </TableCell>
                          <TableCell align="center"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoiceValues?.servicesList?.map(
                          (item: any, index: any) => (
                            <TableRow key={item.id}>
                              <TableCell component="th" scope="row">
                                <SelectDropdown
                                  onMouseDown={() => {
                                    setOpenDialogBox(true);
                                    setPopUpComponent(PopupComponents.SERVICES);
                                  }}
                                  button={canCreateService}
                                  options={modifiedServiceList.map(
                                    (service) => ({
                                      label: service.serviceAccountingCode,
                                      value: service.serviceAccountingCode,
                                    }),
                                  )}
                                  value={
                                    item.serviceAccountingCode
                                      ? {
                                          label: item.serviceAccountingCode,
                                          value: item.serviceAccountingCode,
                                        }
                                      : null
                                  }
                                  onChange={(e: any) => {
                                    if (e) {
                                      const selectedService =
                                        modifiedServiceList.find(
                                          (service) =>
                                            service.serviceAccountingCode ===
                                            e.value,
                                        );
                                      if (selectedService) {
                                        const updatedServiceList = [
                                          ...invoiceValues.servicesList,
                                        ];
                                        updatedServiceList[index] = {
                                          ...selectedService,
                                          id: item.id,
                                        };
                                        setInvoiceValues((prevState: any) => ({
                                          ...prevState,
                                          servicesList: updatedServiceList,
                                        }));
                                      }
                                    } else {
                                      const updatedServiceList = [
                                        ...invoiceValues.servicesList,
                                      ];
                                      updatedServiceList[index] = {
                                        ...updatedServiceList[index],
                                        serviceAccountingCode: '',
                                        serviceHours: 0,
                                        serviceTotalAmount: 0,
                                      };
                                      setInvoiceValues((prevState: any) => ({
                                        ...prevState,
                                        servicesList: updatedServiceList,
                                      }));
                                    }
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Tooltip title={item?.serviceDescription}>
                                  <Typography align="center" variant="body2">
                                    {item?.serviceDescription?.slice(0, 30) +
                                      '...'}
                                  </Typography>
                                </Tooltip>
                              </TableCell>

                              <TableCell align="right">
                                <TextFieldUi
                                  type="number"
                                  value={item?.serviceHours}
                                  // label='INout sample'
                                  onChange={(e) =>
                                    handleQuantityChange(e, index)
                                  }
                                />
                              </TableCell>
                              <TableCell align="right">
                                <TextFieldUi
                                  type="number"
                                  value={item?.serviceAmount}
                                  // label='INout sample'
                                />
                              </TableCell>
                              <TableCell align="right">
                                {item?.serviceTotalAmount}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  type="button"
                                  onClick={() => handleRemoveRow(item?.id)}
                                >
                                  <CancelIcon color="secondary" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                        <ButtonSmallUi
                          type="button"
                          onClick={handleAddRow}
                          label="Add"
                        />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <TextAreaUi
                      variant="standard"
                      onChange={(e) => {
                        if (e) {
                          setFieldValue('notes', e.target.value);
                        } else {
                          setFieldValue('notes', '');
                        }
                      }}
                      value={values?.notes}
                      rows={1}
                      label="Notes"
                    />
                  </Grid>
                  <Grid mt={2} item xs={12}>
                    <TextAreaUi
                      variant="standard"
                      onChange={(e) => {
                        if (e) {
                          setFieldValue('termsAndConditions', e.target.value);
                        } else {
                          setFieldValue('termsAndConditions', '');
                        }
                      }}
                      value={values?.termsAndConditions}
                      rows={1}
                      label="Terms And Conditions"
                    />
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body2" color="initial">
                      Sub Total:
                    </Typography>
                    <Typography variant="body2" color="initial">
                      {subTotalInvoiceAmount}
                    </Typography>
                  </Box>
                  {values.invoiceType === 'Retainer' && (
                    <Box
                      sx={{
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {' '}
                      <Box>
                        <TextFieldUi
                          required={true}
                          fullWidth={false}
                          label="Retainer Fee"
                          name="retainerFee"
                          type="number"
                          value={values.retainerFee ?? ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            const parsedValue =
                              value !== '' ? parseFloat(value) : 0;
                            setRetainerAmount(parsedValue);
                            setFieldValue('retainerFee', parsedValue);
                          }}
                          error={
                            touched.retainerFee && Boolean(errors.retainerFee)
                          }
                          helperText={touched.retainerFee && errors.retainerFee}
                        />
                      </Box>
                      <Typography variant="body2" color="initial">
                        +{retainerAmount}
                      </Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '30px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TextFieldUi
                        width="100px"
                        label="Discount"
                        name="discount"
                        type="number"
                        endAdornment="%"
                        value={values.discountPercentage ?? ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          const parsedValue =
                            value !== '' ? parseFloat(value) : null;
                          setDiscountPercentage(parsedValue);
                          setFieldValue('discountPercentage', parsedValue);
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="initial">
                      -{discountAmount}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <SelectDropdown
                        onMouseDown={() => {
                          setOpenDialogBox(true);
                          setPopUpComponent(PopupComponents.TDS_TAX);
                          // navigate("/customer/create")
                        }}
                        button={canCreateTds}
                        width="150px"
                        onChange={(newValue: any) => {
                          if (newValue) {
                            const selectedTdsTax = tdsTaxData.find(
                              (item) => item.taxName === newValue.value,
                            );
                            if (selectedTdsTax) {
                              setFieldValue('taxAmount.tds', newValue.value);
                              setSelectedTds(selectedTdsTax.taxPercentage);
                            } else {
                              setFieldValue('taxAmount.tds', '');
                              setSelectedTds(null);
                            }
                          } else {
                            setFieldValue('taxAmount.tds', '');
                            setSelectedTds(null);
                          }
                        }}
                        options={tdsTaxOptions}
                        value={
                          values.taxAmount.tds
                            ? {
                                value: values.taxAmount.tds,
                                label: values.taxAmount.tds,
                              }
                            : null
                        }
                        labelText="TDS %"
                      />
                    </Box>
                    <Typography variant="body2" color="initial">
                      -{tdsAmount}
                    </Typography>
                  </Box>
                  <Divider sx={{ marginTop: '20px' }} />
                  <Box
                    sx={{
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="subtitle1" color="initial">
                      Total Amount:{' '}
                    </Typography>
                    <Typography variant="subtitle2" color="initial">
                      {invoiceTotalAmount}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    {!imagePreview && (
                      <Box>
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="contained-button-file"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            sx={{ marginTop: '10px' }}
                          >
                            Upload
                          </Button>
                        </label>
                      </Box>
                    )}
                    {imagePreview && (
                      <Box
                        sx={{
                          marginTop: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'relative',
                        }}
                      >
                        <img
                          src={imagePreview as string}
                          alt="Preview"
                          style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'contain',
                            border: '1px solid grey',
                            borderRadius: '4px',
                          }}
                        />
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ marginTop: '10px' }}
                          onClick={handleDeleteClick}
                        >
                          Remove
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default InvoiceFormScreen;
