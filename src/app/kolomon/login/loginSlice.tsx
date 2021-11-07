import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import KolomonStorage from "../../core/storage";

export interface LoginState {
    loginState: "LOGGED_OUT" | "LOGGED_IN",
    user?: {
        username: string,
        // TODO any other user info we need
    },
}

const initialLoginState: LoginState = {
    loginState: "LOGGED_OUT",
};

export const loginSlice = createSlice({
    name: "login",
    initialState: initialLoginState,
    reducers: {
        logIn: (state, action: PayloadAction<{ username: string }>) => {
            state.loginState = "LOGGED_IN";
            state.user = {
                username: action.payload.username,
            };
        },
    },
});

// All actions as one object
export const { actions } = loginSlice;
// Destructured actions
export const { logIn } = loginSlice.actions;

export default loginSlice.reducer;