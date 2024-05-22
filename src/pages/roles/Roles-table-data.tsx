import React from 'react';
import { DataGrid, GridColDef, GridToolbar, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack } from '@mui/material';
import { GridDeleteIcon } from "@mui/x-data-grid";
import Box from '@mui/material/Box';

interface GridDataProps {
    showToolbar: boolean;
    columns: GridColDef[];
    tableData: any[];
    checkboxSelection: boolean;
    onRowEdit?: (id: string) => void;
    onRowDelete: (id: string) => void;
}

const RolesGridDataUi: React.FC<GridDataProps> = ({ showToolbar, columns, tableData, checkboxSelection, onRowEdit, onRowDelete }) => {

    const handleEditButtonClick = (id: string) => {
        if (onRowEdit) {
            onRowEdit(id);
        }
    };
    const handleDeleteButtonClick = (id: string) => {
        onRowDelete(id);
    };

    const modifiedColumns = columns.map(col => {
        if (col.field === 'Action') {
            return {
                ...col,
                renderCell: (params: GridRenderCellParams) => (
                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => handleEditButtonClick(params.id.toString())}>
                            <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small'/>
                        </IconButton>
                        <IconButton sx={{ padding: "2px" }} aria-label="" onClick={() => handleDeleteButtonClick(params.id.toString())}>
                            <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
                        </IconButton>
                    </Stack>
                ),
            };
        }
        return col;
    });

    return (
        <Box sx={{ height: "fit-content", width: '100%', }}>
            <DataGrid
                rows={tableData}
                columns={modifiedColumns}
                initialState={{
                    // * below pagination for grid table
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick
                components={{
                    Toolbar: showToolbar ? () => <div>Toolbar</div> : undefined,
                }}
                 localeText={{
                    toolbarDensity: 'Size',
                    toolbarDensityLabel: 'Size',
                    toolbarDensityCompact: 'Small',
                    toolbarDensityStandard: 'Medium',
                    toolbarDensityComfortable: 'Large',
                }}
                slots={{
                    toolbar: showToolbar ? GridToolbar : undefined,
                }}

                slotProps={{
                    toolbar: {
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: false },
                        showQuickFilter: true,
                    }
                }}
                rowHeight={40}
                columnBuffer={2} columnThreshold={2}
                pageSizeOptions={[15]}
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
                    },
                    "& .css-ha70k2-MuiInputBase-root-MuiInput-root": {
                        fontSize: "12px"
                    },
                    ".css-1qgbav7-MuiButtonBase-root-MuiButton-root": {
                        fontSize: "12px"
                    }

                }}
            />
        </Box>
    );
};

export default RolesGridDataUi;