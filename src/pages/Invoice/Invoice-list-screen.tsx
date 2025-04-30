import React, { useState, useCallback } from "react";
import { Box, Grid, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import GridDataUi from "../../components/GridTable/GridData";
import TableHeader from "../../components/layouts/TableHeader";
import SelectDropdown from "../../components/ui/SelectDropdown";
import DatePickerUi from "../../components/ui/DatePicker";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { AppDispatch } from "../../redux-store/store";
import { clearInvoiceData } from "../../redux-store/slices/invoiceSlice";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import { useGetInvoiceListScreenMutation } from "../../redux-store/api/injectedApis";
import { Formik } from "formik";
import { MyCellRenderer } from "../../constants/grid-table-data/invoice-list-screen-table-data";
import { GridColDef } from "@mui/x-data-grid";
export interface TaxAmountProps {
  tds: string;
}

export interface ServiceListProps {
  id: number;
  serviceAccountingCode: string;
  serviceAmount: number;
  serviceHours: number;
  serviceTotalAmount: number;
}

export interface InvoiceInitialValueProps {
  id?: string;
  invoiceDate: Date;
  invoiceType: string;
  invoiceNumber: string;
  customerName: string;
  gstType: string;
  gstPercentage: number | null;
  startDate: string;
  dueDate: string;
  gstInNumber: string;
  paymentTerms: string;
  invoiceStatus: string;
  totalAmount: number | null;
  discountPercentage: number | null;
  notes: string;
  retainerFee: null;
  termsAndConditions: string;
  taxAmount: TaxAmountProps;
  servicesList: ServiceListProps[];
}

const InvoiceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [getInvoiceListScreen] = useGetInvoiceListScreenMutation();
  const [invoiceList, setInvoiceList] = useState<InvoiceInitialValueProps[]>(
    []
  );
  const [error, setError] = useState(null);
  // const { refetch } = useGetInvoiceListQuery();

  const handleApplyFilter = async (
    startDate: Dayjs | null,
    endDate: Dayjs | null
  ) => {
    const formattedStartDate = startDate ? startDate.format("DD-MM-YYYY") : "";
    const formattedEndDate = endDate ? endDate.format("DD-MM-YYYY") : "";
    try {
      const response = await getInvoiceListScreen({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }).unwrap();
      setInvoiceList(response);
        setFilterApplied(true);
    } catch (error) {
      console.error("Error fetching filtered dashboard data:", error);
      setIsLoading(false);
    }
  };


  // const handleApplyFilter = useCallback(
  //   async (startDate: Dayjs | null, endDate: Dayjs | null) => {
  //     if (!startDate || !endDate || filterApplied) {
  //       console.warn(
  //         "Both start date and end date must be selected, or filter is already applied."
  //       );
  //       return;
  //     }

  //     setIsLoading(true);
  //     const formattedStartDate = startDate
  //       ? startDate.format("DD-MM-YYYY")
  //       : "";
  //     const formattedEndDate = endDate ? endDate.format("DD-MM-YYYY") : "";
  //     try {
  //       const response = await getInvoiceListScreen({
  //         startDate: formattedStartDate,
  //         endDate: formattedEndDate,
  //       }).unwrap();
  //       setInvoiceList(response);
  //       setFilterApplied(true);
  //       setError(null);
  //     } catch (error) {
  //       console.error("Error fetching filtered invoice data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [startDate, endDate, filterApplied, getInvoiceListScreen]
  // );

  const handleDropdownChange = (newValue: any, setFieldValue: Function) => {
    const today = dayjs();
    setIsCustomRange(newValue.value === "Custom");

    if (newValue) {
      if (newValue.value === "Today") {
        setFieldValue("startDate", today);
        setFieldValue("endDate", today);
        setStartDate(today);
        setEndDate(today);
      } else if (newValue.value === "This Week") {
        setFieldValue("startDate", today.startOf("week"));
        setFieldValue("endDate", today.endOf("week"));
        setStartDate(today.startOf("week"));
        setEndDate(today.endOf("week"));
      } else if (newValue.value === "Last 7 Days") {
        setFieldValue("startDate", today.subtract(7, "days"));
        setFieldValue("endDate", today);
        setStartDate(today.subtract(7, "days"));
        setEndDate(today);
      } else if (newValue.value === "This Month") {
        setFieldValue("startDate", today.startOf("month"));
        setFieldValue("endDate", today.endOf("month"));
        setStartDate(today.startOf("month"));
        setEndDate(today.endOf("month"));
      } else if (newValue.value === "Last 30 Days") {
        setFieldValue("startDate", today.subtract(30, "days"));
        setFieldValue("endDate", today);
        setStartDate(today.subtract(30, "days"));
        setEndDate(today);
      } else if (newValue.value === "Custom") {
        setFieldValue("startDate", null);
        setFieldValue("endDate", null);
        setStartDate(null);
        setEndDate(null);
      }
    }
  };

  const handleDeleteInvoiceLocally = (deletedInvoiceId: any) => {
    setInvoiceList((prevList) =>
      prevList.filter((invoice) => invoice.id !== deletedInvoiceId)
    );
    // Optional: Refetch to ensure data is in sync with the server
  };

  //    useEffect(() => {
  //     // Only set invoiceList when filters are applied
  //     if (filterApplied && invoiceList) {
  //         setInvoiceList(invoiceList);
  //     }
  // }, [invoiceList, filterApplied])

  const columnsLists: GridColDef[] = [
    {
      field: "Action",
      headerName: "Action",
      width: 140,
      editable: false,
      renderCell: (params: any) => (
        <MyCellRenderer
          row={params.row}
          onDelete={handleDeleteInvoiceLocally}
        />
      ),
    },
    {
      field: "invoiceType",
      headerName: "Invoice Type",
      width: 140,
      editable: true,
    },
    {
      field: "invoiceNumber",
      headerName: "Invoice Number",
      width: 150,
      editable: true,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 150,
      editable: false,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 140,
      editable: false,
    },
    {
      field: "invoiceStatus",
      headerName: "Invoice Status",
      width: 150,
      editable: false,
    },
  ];

  return (
    <Box px={0} py={2}>
      <TableHeader
        headerName="Invoices"
        buttons={[
          {
            label: "Create Invoice",
            icon: Add,
            onClick: () => {
              dispatch(clearInvoiceData());
              navigate("/invoice/create");
            },
          },
        ]}
      />
      <Box mb={3}>
        <Formik
          initialValues={{
            startDate: startDate,
            endDate: endDate,
          }}
          onSubmit={(values) =>
            handleApplyFilter(values.startDate, values.endDate)
          }
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={4} md={2}>
                  <SelectDropdown
                    defaultValue={{ value: "This Month", label: "This Month" }}
                    onChange={(newValue: any) =>
                      handleDropdownChange(newValue, setFieldValue)
                    }
                    options={[
                      { value: "Today", label: "Today" },
                      { value: "This Week", label: "This Week" },
                      { value: "Last 7 Days", label: "Last 7 Days" },
                      { value: "This Month", label: "This Month" },
                      { value: "Last 30 Days", label: "Last 30 Days" },
                      { value: "Custom", label: "Custom" },
                    ]}
                    labelText="Select Date Range"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <DatePickerUi
                    label="Start Date"
                    onChange={(date) =>
                      setFieldValue("startDate", dayjs(date, "DD-MM-YYYY"))
                    }
                    value={values.startDate || undefined}
                    disabled={!isCustomRange}
                    sx={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <DatePickerUi
                    label="End Date"
                    onChange={(date) =>
                      setFieldValue("endDate", dayjs(date, "DD-MM-YYYY"))
                    }
                    value={values.endDate || undefined}
                    disabled={!isCustomRange}
                    sx={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <ButtonSmallUi label="Apply Filter" type="submit" fullWidth />
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>

      {error && filterApplied && (
        <Typography variant="caption" color="error">
          *Please apply the filters to display the invoices* {error}
        </Typography>
      )}

      <GridDataUi
        showToolbar
        columns={columnsLists}
        tableData={invoiceList || []}
        checkboxSelection={false}
      />
    </Box>
  );
};

export default InvoiceList;
