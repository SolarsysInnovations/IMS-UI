import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

interface GridDataProps {
    columns?: any;
    tableData?: any;
    checkboxSelection?: any;
}
export default function GridDataUi({ checkboxSelection, columns, tableData }: GridDataProps) {

    return (
        <Box sx={{ height: "fit-content", width: '100%', }}>
            <DataGrid
                // {...data}
                sx={{
                    overflow: "hidden",
                    borderRadius: "10px",
                    "& .MuiDataGrid-root": {
                        color: `#fff`
                    },
                    "& .MuiIconButton-label": {
                        color: `#fff`
                    },
                    "& .MuiDataGrid-toolbarContainer": {
                        padding: " 2px 4px 0px 0px",
                        backgroundColor: "#fafaff",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                    },
                    "& .MuiButton-root": {
                        color: "grey.600",
                        backgroundColor: "transparent",
                    },
                    "& ::-webkit-scrollbar": {
                        height: "8px!important",
                        width: "80px!important",

                    },
                    "& ::-webkit-scrollbar-track": {
                        backgroundColor: "#f5f5f5"
                    },
                    "& ::-webkit-scrollbar-thumb": {
                        width: "80px!important",
                        borderRadius: "10px",
                        backgroundColor: "grey.200"
                    }
                }}
                rows={tableData}
                columns={columns}
                initialState={{
                    // * below pagination for grid table
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                localeText={{
                    toolbarDensity: 'Size',
                    toolbarDensityLabel: 'Size',
                    toolbarDensityCompact: 'Small',
                    toolbarDensityStandard: 'Medium',
                    toolbarDensityComfortable: 'Large',
                }}
                slots={{
                    toolbar: GridToolbar,
                }}
                slotProps={{
                    toolbar: {
                        // * below global search field
                        showQuickFilter: true,
                    },
                }}
                rowHeight={40}
                columnBuffer={2} columnThreshold={2}
                pageSizeOptions={[15]}
                // * below checkbox selection multi and single
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick

            />
        </Box>
    );
}