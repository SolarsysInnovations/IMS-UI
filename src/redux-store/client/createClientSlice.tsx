import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface createClientProps {
    primaryContact: string;
    type: string;
    companyName: string;
    email: string;
    phoneNumber: number;
};

const initialState  : createClientProps= {
    primaryContact: "",
    type: "",
    companyName: "",
    email: "",
    phoneNumber : 0,
}


const createClientSlice = createSlice({
    name: "clientSlice",
    initialState,
    reducers: {
        updateCustomerType: (state, action : PayloadAction<string>) => {
            state.primaryContact = action.payload;
        },
        updateType: (state, action : PayloadAction<string>) => {
            state.type = action.payload;
        },
        companyName: (state, action : PayloadAction<string>) => {
            state.type = action.payload
        },
        email: (state, action : PayloadAction<string>) => {
            state.email = action.payload
        },
        phoneNumber: (state, action : PayloadAction<number>) => {
            state.phoneNumber = action.payload
        },
    }
});

export const {updateCustomerType, updateType, companyName, email, phoneNumber} = createClientSlice.actions;

export default createClientSlice;