import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux-store/store";
import React, { useEffect } from "react";
import { customerDelete } from "../redux-store/customer/customerDelete";
import { toast } from "react-toastify";
import { Add, RemoveRedEyeOutlined } from "@mui/icons-material";
import { fetchCustomerList } from "../redux-store/customer/fetchClientList";
import ModalUi from "../components/ui/ModalUi";
import CustomerDetails from "../pages/customer/customerDetails";
import TableHeader from "../components/layouts/TableHeader";
import usePathname from "../hooks/usePathname";

const id = 1


const MyCellRenderer = ({ row }: { row: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false); // State to manage modal open/close

    const handleModalOpen = () => setOpenModal(true); // Function to open modal
    const handleModalClose = () => setOpenModal(false); // Function to close modal
    const pathname = usePathname();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCustomerList());
    }, [dispatch]);


    const handleEditClick = () => {
        localStorage.setItem("client", JSON.stringify(row));
        console.log(row);
    };

    const handleDeleteClick = () => {
        dispatch(customerDelete({ row }))
            .then(() => {
                dispatch(fetchCustomerList());
            })
            .catch((error) => {
                console.error("Error deleting client:", error);
            });
    };



    return (
        <Stack direction="row" spacing={1}>
            <Link to={`/customer-list/edit/${id}`}>
                <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleEditClick}>
                    <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
                </IconButton>
            </Link>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleModalOpen}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <ModalUi open={openModal} onClose={handleModalClose}>
                <TableHeader headerName="Client Details" buttons={[
                    { label: 'Edit', icon: Add, onClick: () => navigate(`/customer-list/edit/${id}`) },
                ]} />
                <Box sx={{ marginTop: "15px" }}>
                    <CustomerDetails details={row} />
                </Box>
            </ModalUi>
        </Stack>
    );
};

export const columns: GridColDef[] = [
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer row={params.row} />,

    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 150,
        editable: true,
    },
    {
        field: 'customerType',
        headerName: 'Customer Type',
        width: 150,
        editable: true,
    },
    {
        field: 'companyName',
        headerName: 'companyName',
        width: 150,
        editable: true,
    },
    {
        field: 'customerEmail',
        headerName: 'customerEmail',
        width: 150,
        editable: true,
    },
    {
        field: 'phoneNumber',
        headerName: 'phoneNumber',
        width: 150,
        editable: false,
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