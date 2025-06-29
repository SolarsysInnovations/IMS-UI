import React, { useState } from 'react';
import TableHeader from '../../components/layouts/TableHeader';
import { KeyboardBackspaceTwoTone } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import SelectDropdown from '../../components/ui/SelectDropdown';
import GridDataUi from '../../components/GridTable/GridData';
import DatePickerUi from '../../components/ui/DatePicker';
import dayjs from 'dayjs';
import ModalUi from '../../components/ui/ModalUi';
import { invoiceDate } from '../../constants/reportData';
import { columns } from '../../constants/grid-table-data/invoice-table-data';
import { invoicesInitialValue } from '../../constants/forms/formikInitialValues';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { ReportsValueProps } from '../../types/types';
import { reports } from '../../api/services';
import { useMutation } from '@tanstack/react-query';

const Reportsinvoice: React.FC = () => {
  const pathname = usePathname();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState<any>();
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const reportsMutation = useMutation({
    mutationFn: reports,
    onSuccess: (data) => {
      setTableData(data);
    },
  });

  return (
    <div>
      <Formik
        initialValues={invoicesInitialValue}
        validate={() => ({})}
        onSubmit={async (values: ReportsValueProps, actions: any) => {
          try {
            reportsMutation.mutate(values);
          } catch (error) {
            console.error('An unexpected error occurred', error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, values, setFieldValue, handleSubmit }) => (
          <div>
            <TableHeader
              headerName={pathname}
              buttons={[
                {
                  label: 'Back',
                  icon: KeyboardBackspaceTwoTone,
                  onClick: () => navigate(-1),
                },
              ]}
            />
            <ModalUi
              topHeight="70%"
              open={isModalOpen}
              onClose={handleCloseModal}
            ></ModalUi>
            <Form id="createClientForm" noValidate>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={4} md={2}>
                  <Box>
                    <SelectDropdown
                      onChange={(newValue: any) => {
                        if (newValue) {
                          if (newValue.value === 'Today') {
                            const currentDateNet1 =
                              dayjs().format('DD-MM-YYYY');
                            const dueDateNet1 = dayjs()
                              .add(1, 'days')
                              .format('DD-MM-YYYY');
                            setFieldValue('startDate', currentDateNet1);
                            setFieldValue('endDate', dueDateNet1);
                          } else if (newValue.value === 'This Week') {
                            const today = dayjs();
                            const lastSunday = today.day(0);
                            const nextSaturday = today.day(6);

                            const currentDateNet1 =
                              today.day() === 0
                                ? lastSunday
                                    .subtract(1, 'week')
                                    .format('DD-MM-YYYY')
                                : lastSunday.format('DD-MM-YYYY');

                            const dueDateNet1 =
                              nextSaturday.format('DD-MM-YYYY');

                            setFieldValue('startDate', currentDateNet1);
                            setFieldValue('endDate', dueDateNet1);
                          } else if (newValue.value === 'Last 7 Days') {
                            const currentDateNet2 = dayjs()
                              .add(-7, 'days')
                              .format('DD-MM-YYYY');
                            const dueDateNet2 = dayjs().format('DD-MM-YYYY');
                            setFieldValue('startDate', currentDateNet2);
                            setFieldValue('endDate', dueDateNet2);
                          } else if (newValue.value === 'This Month') {
                            const currentDateNet3 = dayjs()
                              .startOf('month')
                              .format('DD-MM-YYYY');
                            const dueDateNet3 = dayjs()
                              .endOf('month')
                              .format('DD-MM-YYYY');
                            setFieldValue('startDate', currentDateNet3);
                            setFieldValue('endDate', dueDateNet3);
                          } else if (newValue.value === 'Last 30 Days') {
                            const currentDateNet4 = dayjs()
                              .add(-30, 'days')
                              .format('DD-MM-YYYY');
                            const dueDateNet4 = dayjs().format('DD-MM-YYYY');
                            setFieldValue('startDate', currentDateNet4);
                            setFieldValue('endDate', dueDateNet4);
                          } else if (newValue.value === 'Custom') {
                            setFieldValue('startDate', '');
                            setFieldValue('endDate', '');
                          }
                          setFieldValue('invoiceDate', newValue.value);
                        } else {
                          setFieldValue('invoiceDate', '');
                        }
                      }}
                      options={invoiceDate}
                      labelText="Select"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4} md={2}>
                  <Box>
                    <DatePickerUi
                      label="Start Date"
                      onChange={(date: any) => setFieldValue('startDate', date)}
                      value={values.startDate}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <Box>
                    <DatePickerUi
                      label="End Date"
                      onChange={(date: any) => setFieldValue('endDate', date)}
                      value={values.endDate}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <ButtonSmallUi
                    label="Run Reports"
                    type="submit"
                    fullWidth
                    onClick={handleSubmit}
                  />
                </Grid>
                <Grid
                  container
                  marginTop={5}
                  marginLeft={2}
                  style={{ width: 'calc(100% - 16px)' }}
                >
                  <GridDataUi
                    showToolbar={true}
                    columns={columns}
                    tableData={tableData ?? []}
                    checkboxSelection={false}
                  />
                </Grid>
              </Grid>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Reportsinvoice;
