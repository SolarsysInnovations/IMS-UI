import { Grid } from '@mui/material';
import React from 'react'
import GridDataUi from '../../components/GridTable/GridData';

interface InvoiceGridProps {
    columns: any;
    onCellEditStop?: (params: any, event: any) => void;
    hideFooter: boolean;
    pagination: boolean;
    showToolbar: boolean;
    tableData: any[];
    values: any;
    setUpdateQty: any;
}
const InvoiceGrid = ({ setUpdateQty, values, columns, onCellEditStop, hideFooter, pagination, showToolbar, tableData }: InvoiceGridProps) => {
    return (
        <Grid item xs={12}>
            <GridDataUi
                onCellEditStop={(params: any, event: any) => {
                    const newValue = event.target.value;
                    const rowId = params.id;
                    const updatedRowData = {
                        ...params.row,
                        qty: newValue
                    };
                    setUpdateQty(updatedRowData)
                }}
                hideFooter={hideFooter}
                pagination={pagination}
                showToolbar={showToolbar}
                columns={columns}
                tableData={tableData}
            />
        </Grid>
    )
}

export default InvoiceGrid