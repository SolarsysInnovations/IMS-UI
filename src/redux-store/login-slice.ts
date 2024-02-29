import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URLS } from "../constants/api-urls";
import axios from "axios";

interface LoginProps {
    userName: string;
    password: string;
}

const initialState: LoginProps = {
    userName: "",
    password: "",
}

interface LoginData {
    email: string;
    password: string;
}

// * -------------------------------- user login api --------------------------------
export const userLogin = createAsyncThunk(
    "auth/login",
    async (data: LoginData) => {
        try {
            const response = await axios.post(API_URLS.login, data);
            const token = response.data.token;
            // * Store the token in local storage
            localStorage.setItem("token", token);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// * -------------------------------- user login slice --------------------------------
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        resetLogin: (state) => {
            state.userName = "";
            state.password = "";
        }
    },
});

export const { setUsername, setPassword, resetLogin } = loginSlice.actions;

export default loginSlice;
