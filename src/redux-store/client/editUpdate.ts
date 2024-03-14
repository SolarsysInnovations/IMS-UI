import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_LOCAL_URL } from "../../constants/api-urls";

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
            // Optionally, you can dispatch an action here to update the Redux store
            return data;
        } catch (error) {
            throw error;
        }
    }
);