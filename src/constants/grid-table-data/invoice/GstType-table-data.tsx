import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteGstTypeMutation, useGetGstTypeQuery, useGstTypeGetByIdMutation } from "../../../redux-store/invoice/gstTypeApi";
import { ToastContainer, toast } from "react-toastify";
import { setData, clearData } from "../../../redux-store/global/globalState";

const MyCellRenderer = ({ id }: { id: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const value = useSelector((state: any) => state.globalState.data)

    const { data: getGstType, error, isLoading, isSuccess: getSuccess, refetch } = useGetGstTypeQuery();
    const [deleteGstType, { isLoading: D_Loading, isSuccess: deleteSuccess }] = useDeleteGstTypeMutation();
    const [getGstTypeById, { }] = useGstTypeGetByIdMutation();


    const handleEditClick = async () => {
        try {
            const response = await getGstTypeById(id);
            if (response && 'data' in response) {
                const gstTypeData = response.data;
                dispatch(setData(gstTypeData));
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this gst type?");
        if (confirmed) {
            deleteGstType(id)
        }
    };

    useEffect(() => {
        if (deleteSuccess) {

        }
        refetch();
    }, [deleteSuccess, refetch]);

    return (
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="" onClick={handleEditClick}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
            </IconButton>
            <IconButton aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
            </IconButton>

        </Stack>
    );
};
export const gstTypeColumns: GridColDef[] = [

    {
        field: 'gstName',
        headerName: 'Gst Name',
        width: 200,
        editable: true,
    },
    {
        field: 'gstPercentage',
        headerName: 'Gst Percentage',
        width: 200,
        editable: false,
    },
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer id={params.row?.id} />,
    },
];