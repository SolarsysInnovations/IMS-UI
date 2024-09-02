import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { useEffect, useState } from "react";
import React from "react";
import DialogBoxUi from "../../components/ui/DialogBox";
import { useDeleteServiceMutation, useGetServiceListQuery, useGetSingleServiceMutation } from "../../redux-store/api/injectedApis";
import { setServiceData } from "../../redux-store/slices/serviceSlice";
import ServiceCreate from "../../pages/service/service-create-screen";
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";
import ActionButtons from "../../components/ui/ActionButtons";
import { useRolePermissions } from "../../hooks/useRolePermission";


const MyCellRenderer = ({ id }: { id: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false);
    const { refetch } = useGetServiceListQuery();
    const [deletedService, { error: deleteServiceErrorObject, isSuccess: deleteServiceSuccess, isError: deleteServiceError, }] = useDeleteServiceMutation();
    const [getService,] = useGetSingleServiceMutation();
    const [opendialogBox, setIsOpenDialogBox] = useState(false);
    const { canEditServices, canDeleteServices } = useRolePermissions();

    useEffect(() => {
        refetch();
    }, [deleteServiceSuccess, refetch]);

    useSnackbarNotifications({
        error: deleteServiceError,
        errorMessage: 'Error adding Service',
        errorObject: deleteServiceErrorObject,
        success: deleteServiceSuccess,
        successMessage: 'Service deleted successfully',
    });

    const handleEditClick = async () => {
        try {
            const response = await getService(id);
            if ('data' in response) {
                const serviceData = response.data;
                dispatch(setServiceData(serviceData));
                setOpenModal(true);
                setIsOpenDialogBox(true);

            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this service?");
        if (confirmed) {
            deletedService(id);
        }
    };
    return (
        <Stack direction="row" spacing={1}>
            <ActionButtons
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
                canDelete={canDeleteServices}
                canEdit={canEditServices}
            />
            {/* <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleEditClick}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </IconButton> */}
            {/* <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleModalOpen}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton> */}
            <DialogBoxUi
                open={opendialogBox}
                content={
                    <>
                        <ServiceCreate setIsOpenDialogBox={setIsOpenDialogBox} />
                    </>
                }
                handleClose={() => {
                    setIsOpenDialogBox(false)
                }}
            />
        </Stack>
    );
};


export const columns: GridColDef[] = [

    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer id={params.row?.id} />,
    },
    // {
    //     field: 'id',
    //     headerName: 'id',
    //     width: 200,
    //     editable: true,

    // },
    {
        field: 'serviceAccountingCode',
        headerName: 'Service Code',
        width: 130,
        editable: true,
    },
    {
        field: 'serviceDescription',
        headerName: 'Service Description',
        width: 350,
        editable: false,
    },
    {
        field: 'serviceAmount',
        headerName: 'Service Amount',
        width: 200,
        editable: false,
    },
    // {
    //     field: 'qty',
    //     headerName: 'Qty',
    //     width: 150,
    //     editable: true,
    //     valueGetter: (params: any) => params.value || 0,
    //     valueSetter: (params: GridValueSetterParams) => {
    //         let newValue = params.value; // New value entered by the user
    //         let row = { ...params.row }; // Copy the row object
    //         // Update the qty field in the row object
    //         row.qty = newValue;
    //         console.log(row.qty);
    //         handleRowUpdate(row);
    //         // Return the updated row object
    //         return row;
    //     }
    // },
    // {
    //     field: 'totalAmount',
    //     headerName: 'Total Amount',
    //     width: 150,
    //     editable: false,
    //     valueGetter: (params: any) => params.value || 0,
    // },

];