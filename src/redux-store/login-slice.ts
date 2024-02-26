import { createSlice,  PayloadAction } from "@reduxjs/toolkit";
interface LoginProps {
    userName: string;
    password: string;
}

const initialState: LoginProps = {
    userName: "",
    password: "",
}

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
