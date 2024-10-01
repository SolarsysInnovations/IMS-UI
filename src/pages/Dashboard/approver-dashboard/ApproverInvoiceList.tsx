import React from 'react';
import GridDataUi from '../../../components/GridTable/GridData'; // Ensure correct path to GridDataUi component
import { GridColDef } from '@mui/x-data-grid'; 

export const columns: GridColDef[] = [
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 200,
        editable: false,
    },
    {
        field: 'invoiceNumber',
        headerName: 'Invoice Number',
        width: 200,
        editable: false,
    },
    {
        field: 'invoiceType',
        headerName: 'Invoice Type',
        width: 200,
        editable: false,
    },
    {
        field: 'invoiceDate',
        headerName: 'Invoice Date',
        width: 200,
        editable: false,
    },
    {
        field: 'invoiceStatus',
        headerName: 'Status',
        width: 200,
        editable: false,
    },
    {
        field: 'retainerFee',
        headerName: 'Retainer Fee',
        width: 150,
        editable: false,
    },
    {
        field: 'gstPercentage',
        headerName: 'GST (%)',
        width: 150,
        editable: false,
    },
    {
        field: 'totalAmount',
        headerName: 'Total Amount',
        width: 200,
        editable: false,
    },
    {
        field: 'invoiceStages',
        headerName: 'Stage',
        width: 200,
        editable: false,
        valueGetter: (params) => params.row.invoiceStages?.stage1 || 'N/A',
    },
    {
        field: 'taxAmount',
        headerName: 'Tax Type',
        width: 150,
        editable: false,
        valueGetter: (params) => params.row.taxAmount?.tds || 'N/A',
    },
];

const ApproverInvoiceList = ({ companyOverviewList, startDate, endDate }: { companyOverviewList: any; startDate?: string; endDate?: string; }) => {
    // Filter to only include pending invoices
    const filteredInvoices = companyOverviewList?.filter((invoice: any) => {
        return invoice.invoiceStatus === 'PENDING'; // Adjust condition if needed
    }) || [];

    // Check if the date filters are applied
    const hasFiltersApplied = Boolean(startDate && endDate);

    return (
        <>
            {hasFiltersApplied ? (
                filteredInvoices.length > 0 ? (
                    <GridDataUi
                        showToolbar={false}
                        columns={columns}
                        tableData={filteredInvoices} // Pass the filtered data
                        checkboxSelection={false}
                    />
                ) : (
                    <div>No pending invoices found for the selected date range.</div>
                )
            ) : (
                <GridDataUi
                    showToolbar={false}
                    columns={columns}
                    tableData={[]} // Empty data for grid
                    checkboxSelection={false}
                />
            )}
        </>
    );
};

export default ApproverInvoiceList;
