import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URLS } from "../../constants/api-urls";

interface ClientListState {
    data: any;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}

const initialState: ClientListState = {
    data: [],
    status: "idle",
    error: null,
};

export const fetchClientList = createAsyncThunk<any>('clientSlice/fetchData', async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch("http://localhost:4000/client/clientList", config);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
);

const clientDataSlice = createSlice({
    name: "clientSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchClientList.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(fetchClientList.rejected, (state, action) => {
                state.status = "failed";
                state.error = "404";
            });
    },
});

export default clientDataSlice;
