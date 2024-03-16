import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL_NODE } from "../../constants/api-urls";


interface ServiceListState {
    data: any;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}

const initialState: ServiceListState = {
    data: [],
    status: "idle",
    error: null,
};

export const fetchServiceList = createAsyncThunk<any>('service/fetchData', async () => {
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


const serviceListDataSlice = createSlice({
    name: "serviceSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchServiceList.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(fetchServiceList.rejected, (state, action) => {
                state.status = "failed";
                state.error = "404";
            });
    },
});

export default serviceListDataSlice;
