import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Add, RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../components/ui/ModalUi";
import CustomerDetails from "../../pages/customer/customerDetails";
import TableHeader from "../../components/layouts/TableHeader";
import usePathname from "../../hooks/usePathname";
import { useDeleteCustomerMutation, useGetCustomersQuery } from "../../redux-store/customer/customerApi";
import { toastConfig } from "../forms/config/toastConfig";

const id = 1


const MyCellRenderer = ({ row }: { row: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false); // State to manage modal open/close
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const [deleteCustomer, { isLoading: deleteLoading, error: deleteError, isSuccess }] = useDeleteCustomerMutation();
    const handleModalOpen = () => setOpenModal(true); // Function to open modal
    const handleModalClose = () => setOpenModal(false); // Function to close modal
    const pathname = usePathname();
    const navigate = useNavigate();

    const handleEditClick = () => {
        localStorage.setItem("customer", JSON.stringify(row));
        console.log(row);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully deleted the new customer", toastConfig)
        }
        refetch();
    }, [isSuccess, refetch])

    const handleDeleteClick = () => {
        const id = row.id;
        console.log(id);
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
        if (confirmed) {
            deleteCustomer(id);
        }
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
        field: 'customerPhone',
        headerName: 'customerPhone',
        width: 150,
        editable: false,
    },
    {
        field: 'contactPersons',
        headerName: 'contactPersons',
        width: 250,
        editable: false,
        renderCell: (params: any) => {
            console.log('params.value:', params.row);
            return (
                <ul className="flex">
                    {params.value?.map((person: any) => {
                        console.log('person:', person);
                        return (
                            <li key={person.id}>{person.contactName}</li>
                        );
                    })}
                </ul>
            );
        },
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