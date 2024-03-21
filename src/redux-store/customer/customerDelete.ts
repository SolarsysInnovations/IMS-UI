import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS, BASE_LOCAL_URL, BASE_URL_NODE } from "../../constants/api-urls";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/forms/config/toastConfig";

export const customerDelete = createAsyncThunk<any, { row: any }>('customer/delete', async ({ row }) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const id = row.id;

        const response = await fetch(`${API_URLS.customerDelete}/${id}`, config);
        if (!response.ok) {
            throw new Error('Failed to delete customer');
        }
        const data = await response.json();
        console.log(data);
        toast.success("customer deleted successfully", toastConfig)

        // Optionally, you can dispatch an action here to update the Redux store
        return data;
    } catch (error) {
        console.log(error);

        throw error;
    }
});


