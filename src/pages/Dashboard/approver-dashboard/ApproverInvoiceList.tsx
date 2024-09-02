import GridDataUi from '../../../components/GridTable/GridData'; // Ensure correct path to GridDataUi component
import { GridColDef } from '@mui/x-data-grid'; // Assuming you are using x-data-grid for GridColDef

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


const ApproverInvoiceList = ({ companyOverviewList }: any) => {
    return (
        <>
            <GridDataUi
                showToolbar={false}
                columns={columns}
                tableData={companyOverviewList || []}
                checkboxSelection={false}
            />
        </>
    );
};


export default ApproverInvoiceList;
