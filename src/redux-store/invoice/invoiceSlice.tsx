import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL_NODE } from "../../constants/api-urls";


interface InvoiceListState {
    data: any;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}

const initialState: InvoiceListState = {
    data: [],
    status: "idle",
    error: null,
};

export const fetchInvoiceList = createAsyncThunk<any>('invoice/fetchData', async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`${BASE_URL_NODE}/service/list`, config);
        if (!response.ok) {
            throw new Error('Failed to fetch service data');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}
);

const invoiceListDataSlice = createSlice({
    name: "invoiceSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoiceList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInvoiceList.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(fetchInvoiceList.rejected, (state, action) => {
                state.status = "failed";
                state.error = "404";
            });
    },
});

export default invoiceListDataSlice;
