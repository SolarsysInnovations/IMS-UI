import React from 'react';
import GridDataUi from '../../../components/GridTable/GridData';
import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'customerName',
        headerName: 'Name',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceNumber',
        headerName: 'Invoice Number',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceType',
        headerName: 'Invoice Type',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceDate',
        headerName: 'Invoice Date',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceStatus',
        headerName: 'Status',
        width: 200,
        editable: true,
    },
];

interface StandardUserInvoiceListProps {
    invoiceListData: any[];
    startDate?: string;
    endDate?: string;
}

const StandardUserInvoiceList: React.FC<StandardUserInvoiceListProps> = ({
    invoiceListData,
    startDate,
    endDate,
}) => {
    const hasInvoices = invoiceListData && invoiceListData.length > 0;

    return (
        <GridDataUi 
            showToolbar={false} 
            columns={columns} 
            tableData={hasInvoices ? invoiceListData : []} // Empty grid if no invoices
            checkboxSelection={false} 
        />
    );
};

export default StandardUserInvoiceList;
