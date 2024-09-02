import React, { useState } from 'react'
import TableHeader from '../../components/layouts/TableHeader';
import { Add, KeyboardBackspaceTwoTone } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, } from '@mui/material';
import { AppDispatch, RootState } from '../../redux-store/store'
import { Formik, Form } from 'formik';
import SelectDropdown from '../../components/ui/SelectDropdown';
import GridDataUi from '../../components/GridTable/GridData';
import DatePickerUi from '../../components/ui/DatePicker';
import dayjs from 'dayjs';
import ModalUi from '../../components/ui/ModalUi';
import { invoiceDate } from '../../constants/reportData';
import { columns } from '../../constants/grid-table-data/invoice-table-data';
import { invoicesInitialValue } from '../../constants/forms/formikInitialValues';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { InvoicesInitialValueProps } from '../../types/types';
import { useGetReportInvoiceMutation } from '../../redux-store/api/injectedApis';

const Reportsinvoice: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const navigate = useNavigate();
    // const { data: reportList } = useGetReportQuery(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ArAging] = useGetReportInvoiceMutation();
    const [tableData, setTableData] = useState<any>()
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    return (
        <div>
            <Formik
                initialValues={invoicesInitialValue}
                validate={() => ({})}
                onSubmit={async (values: InvoicesInitialValueProps, { setSubmitting, resetForm }) => {
                    try {
                        const response = await ArAging(values);
                        // Check if the response contains data or error
                        if ('data' in response) {
                            // If data exists, log it
                            const data = response.data
                            setTableData(data)
                            // Reset form or update state with the data
                            resetForm();
                        } else if ('error' in response) {
                            // If error exists, handle the error
                            console.error("An error occurred", response.error);
                            // Handle error state or display error message
                        }
                    } catch (error) {
                        // Catch any unexpected errors during mutation call
                        console.error("An unexpected error occurred", error);
                    }
                    finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, touched, values, setFieldValue, handleSubmit }) => (
                    <div>
                        <TableHeader headerName={pathname} buttons={[
                            { label: 'Back', icon: KeyboardBackspaceTwoTone, onClick: () => navigate(-1) }
                        ]} />
                        <ModalUi topHeight='70%' open={isModalOpen} onClose={handleCloseModal} >
                        </ModalUi>
                        <Form id="createClientForm" noValidate >
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Box>
                                        <SelectDropdown
                                             onChange={(newValue: any) => {
                                                if (newValue) {
                                                    if (newValue.value === "Today") {
                                                        const currentDateNet1 = dayjs().format('MM-DD-YYYY');
                                                        const dueDateNet1 = dayjs().add(0, 'days').format('MM-DD-YYYY');
                                                        setFieldValue("startDate", currentDateNet1);
                                                        setFieldValue("endDate", dueDateNet1);                                                        
                                                    }
                                                    else if (newValue.value === "This Week") {
                                                        const today = dayjs();
                                                        const lastSunday = today.day(0); 
                                                        const nextSaturday = today.day(6);
                                                    
                                                        const currentDateNet1 = today.day() === 0 
                                                            ? lastSunday.subtract(1, 'week').format('MM-DD-YYYY')
                                                            : lastSunday.format('MM-DD-YYYY');
                                                    
                                                        const dueDateNet1 = nextSaturday.format('MM-DD-YYYY');
                                                    
                                                        setFieldValue("startDate", currentDateNet1);
                                                        setFieldValue("endDate", dueDateNet1);
                                                    } else if (newValue.value === "Last 7 Days") {
                                                        const currentDateNet2 = dayjs().add(-7, 'days').format('MM-DD-YYYY');
                                                        const dueDateNet2 = dayjs().format('MM-DD-YYYY');
                                                        setFieldValue("startDate", currentDateNet2);
                                                        setFieldValue("endDate", dueDateNet2);
                                                    }
                                                    else if (newValue.value === "This Month") {
                                                        const currentDateNet3 = dayjs().startOf('month').format('MM-DD-YYYY');
                                                        const dueDateNet3 = dayjs().endOf('month').format('MM-DD-YYYY');
                                                        setFieldValue('startDate', currentDateNet3)
                                                        setFieldValue("endDate", dueDateNet3)
                                                    } else if (newValue.value === "Last 30 Days") {
                                                        const currentDateNet4 = dayjs().add(-30, 'days').format('MM-DD-YYYY');
                                                        const dueDateNet4 =  dayjs().format('MM-DD-YYYY');
                                                        setFieldValue('startDate', currentDateNet4)
                                                        setFieldValue("endDate", dueDateNet4)
                                                    } else if (newValue.value === "Custom") {
                                                        const currentDate = dayjs().format('MM-DD-YYYY');
                                                        setFieldValue('startDate', "")
                                                        setFieldValue("endDate", "")
                                                    }
                                                    setFieldValue("invoiceDate", newValue.value)
                                                } else {
                                                    setFieldValue("invoiceDate", "")
                                                }
                                            }}
                                            options={invoiceDate}
                                          //  value={values.invoiceDate ? { value: values.invoiceDate, label: values.invoiceDate } : null}
                                            labelText='Select'
                                           // error={touched.invoiceDate && Boolean(errors.invoiceDate)}
                                        // helperText={touched.invoiceDate && errors.invoiceDate}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={2}>
                                    <Box>
                                        <DatePickerUi
                                            label="Start Date"
                                            onChange={(date: any) => setFieldValue("startDate", date)}
                                            value={values.startDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <DatePickerUi
                                            label="End Date"
                                            onChange={(date: any) => setFieldValue("endDate", date)}
                                            value={values.endDate}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <ButtonSmallUi size='small' label='Run Reports' variant='contained' onClick={handleSubmit} />
                                </Grid>
                                <Grid container marginTop={5} marginLeft={2} style={{ width: 'calc(100% - 16px)' }}>
                                    <GridDataUi showToolbar={true} columns={columns} tableData={tableData || []} checkboxSelection={false} />
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

export default Reportsinvoice