import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_LOCAL_URL, BASE_URL_NODE } from "../../constants/api-urls";

export const deleteClient = createAsyncThunk<any, { row: any }>('client/delete', async ({ row }) => {


    try {
        const token = localStorage.getItem('token');
        const config = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`https://node-js-invoice.onrender.com/client/${row.id}`, config);
        if (!response.ok) {
            throw new Error('Failed to delete client');
        }
        const data = await response.json();
        console.log(data);
        // Optionally, you can dispatch an action here to update the Redux store
        return data;
    } catch (error) {
        console.log(error);

        throw error;
    }
});


