import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";

const id = 1

export const columns: GridColDef[] = [

    {
        field: 'serviceAccountingCode',
        headerName: 'Service Code',
        width: 200,
        editable: true,
    },
    {
        field: 'serviceAmount',
        headerName: 'Service Amount',
        width: 200,
        editable: false,
    },
    {
        field: 'qty',
        headerName: 'Qty',
        width: 150,
        editable: true,
        valueGetter: (params: any) => params.value || 0,
        valueSetter: (params: GridValueSetterParams) => {
            let newValue = params.value; // New value entered by the user
            let row = { ...params.row }; // Copy the row object
            // Update the qty field in the row object
            row.qty = newValue;
            // Return the updated row object
            return row;
        }
    },
    {
        field: 'totalAmount',
        headerName: 'Total Amount',
        width: 150,
        editable: false,
        valueGetter: (params: any) => params.value || 0,
    },

];