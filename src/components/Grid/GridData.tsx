import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { Stack, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
        field: 'firstName',
        headerName: 'First name',
        width: 250,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const generateRandomData = () => {
    const rows = [];
    for (let i = 1; i <= 1000; i++) {
        const lastName = getRandomLastName();
        const firstName = getRandomFirstName();
        const age = getRandomAge();
        rows.push({ id: i, lastName, firstName, age });
    }
    return rows;
};

const getRandomLastName = () => {
    const lastNames = ['Snow', 'Lannister', 'Stark', 'Targaryen', 'Melisandre', 'Clifford', 'Frances', 'Roxie'];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const getRandomFirstName = () => {
    const firstNames = ['Jon', 'Cersei', 'Jaime', 'Arya', 'Daenerys', 'Ferrara', 'Rossini', 'Harvey'];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const getRandomAge = () => {
    // Generate a random age between 1 and 100
    return Math.floor(Math.random() * 100) + 1;
};

const rows = generateRandomData();
// console.log(rows);


export default function GridDataUi() {
    return (
        <Box sx={{ height: "fit-content", width: '100%' }}>
            <DataGrid
                sx={{
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
                    }
                }}
                rows={rows}
                columns={columns}
                initialState={{
                    // * below pagination for grid table
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
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
                columnBuffer={2} columnThreshold={2}
                pageSizeOptions={[15]}

                // * below checkbox selection multi and single
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}