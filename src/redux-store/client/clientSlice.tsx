import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    email: "",
    password: "",
};

const clientSlice = createSlice({
    name: "clientSlice",
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.email = action.payload;
        },
        updateEmail: (state, action) => {
            state.password = action.payload;
        },
    }
});

export const { updateEmail, updateName } = clientSlice.actions;

export default clientSlice;
