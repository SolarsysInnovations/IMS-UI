import { Box,IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import ServiceDetails from "../../pages/service/serviceDetails";
import TableHeader from "../../components/layouts/TableHeader";
import usePathname from "../../hooks/usePathname";
import { useDeleteServiceMutation, useGetServiceQuery, useGetServiceByIdMutation,useUpdateServiceMutation, setServiceData } from "../../redux-store/service/serviceApi";
import React from "react";

const id = 1

const MyCellRenderer = ({ id, contactPersons }: any) => {
    // const [serviceDetails, setServiceDetails] = useLocalStorage(LocalStorageKeys.SERVICE_EDIT, null);
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false);
    const { data: services, error, isLoading, refetch } = useGetServiceQuery();
    const [deletedService, { isLoading: deleteLoading, error: deleteError, isSuccess, data: deletedData, }] = useDeleteServiceMutation<{ deletedService: any, error: any, isLoading: any, isSuccess: any, data: any }>();
    const [getService, { data: serviceData, isSuccess: C_success, isError: C_error }] = useGetServiceByIdMutation<{ data: any, isSuccess: any, isError: any }>();
    // const [deleteService, { isLoading: D_Loading, isSuccess: D_Success }] = useDeleteServiceMutation();

    // useEffect(() => {
    //     if (serviceData) {
    //         console.log('service:', serviceData);
    //         setServiceDetails(serviceData);
    //     }
    // }, [serviceData]);
    const pathname = usePathname();
    const navigate = useNavigate();

    return (
        <Stack direction="row" spacing={1}>
                {/* <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleEditClick}>
                    <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
                </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
             <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleModalOpen}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>  */}
          
                <TableHeader headerName="Client Details" buttons={[
                    { label: 'Edit', icon: Add, onClick: () => navigate(`/customer/edit/${id}`) },
                ]} />
                <Box sx={{ marginTop: "15px" }}>
                    <ServiceDetails details={id} />
                </Box>
           
        </Stack>
    );
};


export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'id',
        width: 200,
        editable: true,
        
    },
    {
        field: 'Customer Name',
        headerName: 'Customer Name',
        width: 180,
        editable: false,
    },
    {
        field: 'serviceAccountingCode',
        headerName: '0-30 Days',
        width: 180,
        editable: true,
    },
    {
        field: 'serviceDescription',
        headerName: '30-45 Days',
        width: 240,
        editable: false,
    },
    {
        field: 'serviceAmount',
        headerName: 'Above 45 Days',
        width: 180,
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