import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URLS, BASE_LOCAL_URL } from "../../constants/api-urls";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/forms/config/toastConfig";


interface CreateCustomerProps {
    customerName: string;
    customerType: string;
    companyName: string;
    customerEmail: string;
    phoneNumber: number | undefined;
    paymentTerms: string;
    country: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    contactName: string;
    contactEmail: string;
    contactPhone: number | undefined;
};

const initialState: CreateCustomerProps = {
    customerName: "",
    customerType: "",
    companyName: "",
    customerEmail: "",
    phoneNumber: 0,
    paymentTerms: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: 0,
}

export const customerCreate = createAsyncThunk<any, CreateCustomerProps>(
    'customer/create',
    async (createCustomerProps: CreateCustomerProps, { rejectWithValue }) => {
        console.log("Values:", createCustomerProps);
        try {
            const token = localStorage.getItem('token');
            const config = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createCustomerProps) // Pass the entire object
            };
            const response = await fetch(API_URLS.customerCreate, config);
            if (!response.ok) {
                throw new Error('Failed to create customer');
            }
            const responseData = await response.json();
            console.log(responseData);
            toast.success("created customer successfully", toastConfig)
            // Optionally, you can dispatch an action here to update the Redux store
            return responseData;
        } catch (error) {
            // You can handle errors here or reject with a value
            return rejectWithValue(error);
        }
    }
);


const createClientSlice = createSlice({
    name: "customerSlice",
    initialState,
    reducers: {
        updateCustomerType: (state, action: PayloadAction<string>) => {
            state.customerName = action.payload;
        },
        updateType: (state, action: PayloadAction<string>) => {
            state.customerType = action.payload;
        },
        companyName: (state, action: PayloadAction<string>) => {
            state.customerType = action.payload
        },
        customerEmail: (state, action: PayloadAction<string>) => {
            state.customerEmail = action.payload
        },
        phoneNumber: (state, action: PayloadAction<number>) => {
            state.phoneNumber = action.payload
        },
    }
});

export const { updateCustomerType, updateType, companyName, customerEmail, phoneNumber } = createClientSlice.actions;

export default createClientSlice;