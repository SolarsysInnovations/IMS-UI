import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_LOCAL_URL } from "../../constants/api-urls";
import { toastConfig } from "../../constants/forms/config/toastConfig";
import { toast } from "react-toastify";

interface EditUpdatePayload {
    row: any;
}

export const editUpdate = createAsyncThunk<any, EditUpdatePayload>(
    'client/update',
    async ({ row }: EditUpdatePayload) => {
        console.log(row);
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
            const response = await fetch(`${BASE_LOCAL_URL}/client/update/${row.id}`, config);
            if (!response.ok) {
                throw new Error('Failed to update client');
            }
            const data = await response.json();
            console.log(data);
            toast.success("updated successfully", toastConfig)
            return data;
        } catch (error) {
            throw error;
        }
    }
);