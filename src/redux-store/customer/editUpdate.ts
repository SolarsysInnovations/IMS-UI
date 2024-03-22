import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS, BASE_LOCAL_URL } from "../../constants/api-urls";
import { toastConfig } from "../../constants/forms/config/toastConfig";
import { toast } from "react-toastify";

interface CustomerEditUpdatePayload {
    row: any;
}

export const customerEditUpdate = createAsyncThunk<any, CustomerEditUpdatePayload>(
    'customer/update',
    async ({ row }: CustomerEditUpdatePayload) => {


        try {
            const token = localStorage.getItem('token');
            const config = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(row)
            };
            const id = row.id;
            const response = await fetch(`${API_URLS.customerUpdate}/${id}`, config);
            if (!response.ok) {
                throw new Error('Failed to update client');
            }
            const data = await response.json();
            console.log(data);
            toast.success("customer updated successfully", toastConfig)
            return data;
        } catch (error) {
            throw error;
        }
    }
);