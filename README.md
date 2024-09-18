import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon, GridToolbar, GridValueGetterParams, useGridApiRef } from '@mui/x-data-grid';
import { Stack, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const columns: GridColDef[] = [
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => {
            const onClick = (e: any) => {
                const currentRow = params.row;
                return alert(JSON.stringify(currentRow, null, 4));
            };

            return (
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="" onClick={onClick}>
                        <EditIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
                    </IconButton>
                    <IconButton aria-label="" onClick={onClick}>
                        <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
                    </IconButton>
                </Stack>
            );
        },

    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'name',
        width: 250,
        editable: true,
    },
    {
        field: 'username',
        headerName: 'username',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'email',
        width: 150,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'phone',
        width: 150,
        editable: true,
    },
    {
        field: 'website',
        headerName: 'website',
        width: 150,
        editable: true,
    },
    {
        field: 'website',
        headerName: 'website',
        width: 150,
        editable: true,
    },
    {
        field: 'website',
        headerName: 'website',
        width: 150,
        editable: true,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];


export default function GridDataUi() {


    const [tableData, setTableData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                console.log(response.data);

                setTableData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [])



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
                // checkboxSelection
                disableRowSelectionOnClick

            />
        </Box>
    );
}