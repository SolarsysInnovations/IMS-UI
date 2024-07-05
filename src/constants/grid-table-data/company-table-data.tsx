import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../components/ui/ModalUi";
import ServiceDetails from "../../pages/service/serviceDetails";
import TableHeader from "../../components/layouts/TableHeader";
import usePathname from "../../hooks/usePathname";
import { useDeleteCompanyMutation, useGetCompanyQuery, useUpdateCompanyMutation, setCompanyData, clearCompanyData, useGetCompanyDataByIdMutation } from "../../redux-store/company/companiesApi";
import { toastConfig } from "../forms/config/toastConfig";
import { LocalStorageKeys, useLocalStorage } from "../../hooks/useLocalStorage";
import React from "react";
import CompanyEdit from "../../pages/company/companyEditscreen";

const MyCellRenderer = ({ id, onDeleteSuccess }: { id: any, onDeleteSuccess: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false);
    const { data: services, refetch } = useGetCompanyQuery();
    const [deleteCompany, { isSuccess: deleteSuccess }] = useDeleteCompanyMutation();
    const [getCompany, { data: companyData }] = useGetCompanyDataByIdMutation();
    const pathname = usePathname();
    const navigate = useNavigate();

    useEffect(() => {
        if (companyData) {
            dispatch(setCompanyData(companyData));
        }
    }, [companyData, dispatch]);

    const handleModalOpen = async () => {
        setOpenModal(true);
        try {
            await getCompany(id);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    }

    const handleModalClose = () => {
        dispatch(clearCompanyData())
        setOpenModal(false);
    }

    useEffect(() => {
        refetch();
    }, [deleteSuccess, refetch]);

    const handleEditClick = async () => {
        try {
            const response = await getCompany(id);
            if ('data' in response) {
                const companyData = response.data;
                await dispatch(setCompanyData(companyData));
                // navigate(`/customer/edit/${id}`);
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    };

    useEffect(() => {
        if (deleteSuccess) {
            onDeleteSuccess();
        }
        refetch();
    }, [deleteSuccess, onDeleteSuccess]);

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this company?");
        if (confirmed) {
            deleteCompany(id);
        }
    };

    return (
        <Stack direction="row" spacing={1}>
            <IconButton sx={{ padding: "3px" }} aria-label="edit" onClick={handleEditClick}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="delete" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="view" onClick={handleModalOpen}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <ModalUi open={openModal} onClose={handleModalClose}>
                <Box sx={{ marginTop: "15px" }}>
                    <CompanyEdit />
                </Box>
            </ModalUi>
        </Stack>
    );
};

export const columns = (onDeleteSuccess: () => void): GridColDef[] => [
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => {
            console.log("row",params.row?.id); // Log the id here
            return <MyCellRenderer id={params.row?.id} onDeleteSuccess={onDeleteSuccess} />;
        },
    },
    
    {
        field: 'id',
        headerName: 'ID',
        width: 200,
        editable: true,
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width: 200,
        editable: true,
    },
    {
        field: 'userName',
        headerName: 'User Name',
        width: 200,
        editable: false,
    },
    {
        field: 'userRole',
        headerName: 'User Role',
        width: 200,
        editable: false,
    },
    {
        field: 'userAccess',
        headerName: 'User Access',
        width: 200,
        editable: false,
    },
    {
        field: 'companyEmail',
        headerName: 'Company Email',
        width: 200,
        editable: false,
    },
];
