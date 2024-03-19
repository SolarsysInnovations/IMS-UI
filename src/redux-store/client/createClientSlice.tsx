import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_LOCAL_URL } from "../../constants/api-urls";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/forms/config/toastConfig";


interface CreateClientProps {
    primaryContact: string;
    type: string;
    companyName: string;
    customerEmail: string;
    phoneNumber: number | undefined;
    paymentTerms: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    contactName: string;
    contactEmail: string;
    contactPhone: number | undefined;
};

const initialState: CreateClientProps = {
    primaryContact: "",
    type: "",
    companyName: "",
    customerEmail: "",
    phoneNumber: undefined,
    paymentTerms: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: undefined,
}

export const createClient = createAsyncThunk<any, CreateClientProps>(
    'client/create',
    async (createClientProps: CreateClientProps, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createClientProps) // Pass the entire object
            };
            const response = await fetch(`${BASE_LOCAL_URL}/client/createClient`, config);
            if (!response.ok) {
                throw new Error('Failed to create client');
            }
            const responseData = await response.json();
            console.log(responseData);
            toast.success("created client successfully", toastConfig)
            // Optionally, you can dispatch an action here to update the Redux store
            return responseData;
        } catch (error) {
            // You can handle errors here or reject with a value
            return rejectWithValue(error);
        }
    }
);


const createClientSlice = createSlice({
    name: "clientSlice",
    initialState,
    reducers: {
        updateCustomerType: (state, action: PayloadAction<string>) => {
            state.primaryContact = action.payload;
        },
        updateType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        },
        companyName: (state, action: PayloadAction<string>) => {
            state.type = action.payload
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