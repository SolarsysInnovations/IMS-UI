import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_LOCAL_URL } from "../../constants/api-urls";


interface createClientProps {
    primaryContact: string;
    type: string;
    companyName: string;
    email: string;
    phoneNumber: number;
};

const initialState: createClientProps = {
    primaryContact: "",
    type: "",
    companyName: "",
    email: "",
    phoneNumber: 0,
}
interface CreateClientProps {
    // Define the properties needed for creating a client
    primaryContact: string;
    type: string;
    companyName: string;
    email: string;
    phoneNumber: number;
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
        email: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        phoneNumber: (state, action: PayloadAction<number>) => {
            state.phoneNumber = action.payload
        },
    }
});

export const { updateCustomerType, updateType, companyName, email, phoneNumber } = createClientSlice.actions;

export default createClientSlice;