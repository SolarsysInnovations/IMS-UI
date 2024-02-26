import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URLS } from "../../constants/api-urls";


interface LoginData {
    email: string;
    password: string;
}
export const userLogin = createAsyncThunk(
    "auth/login",
    async (data: LoginData) => {
        try {
            const response = await axios.post(API_URLS.login, data);
            const token = response.data.token;
            // Store the token in local storage
            localStorage.setItem("token", token);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);
