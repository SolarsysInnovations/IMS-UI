import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { useEffect } from "react";
import { useGetServiceQuery } from "../../redux-store/service/serviceApi";
import { handleRowUpdate } from "../../pages/Invoice/Invoice-create-screen";

const id = 1

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'id',
        width: 200,
        editable: true,
    },
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