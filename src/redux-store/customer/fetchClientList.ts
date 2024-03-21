import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URLS, BASE_LOCAL_URL, BASE_URL_NODE } from "../../constants/api-urls";

interface CustomerListState {
    data: any;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}

const initialState: CustomerListState = {
    data: [],
    status: "idle",
    error: null,
};

export const fetchCustomerList = createAsyncThunk<any>('customer/fetchData', async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(API_URLS.customerList, config);
        if (!response.ok) {
            throw new Error('Failed to fetch customer data');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}
);

const customerDataSlice = createSlice({
    name: "clientSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCustomerList.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(fetchCustomerList.rejected, (state, action) => {
                state.status = "failed";
                state.error = "404";
            });
    },
});

export default customerDataSlice;
