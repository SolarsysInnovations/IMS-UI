import GridDataUi from '../../../components/GridTable/GridData'
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

const StandardUserInvoiceList = ({ invoiceListData }: any) => {
    return (
        <>
            <GridDataUi showToolbar={false} columns={columns} tableData={invoiceListData || []} checkboxSelection={false} />
        </>
    )
}

export default StandardUserInvoiceList;