import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoggedInUser {
    id: number,
    username: string,
}

export interface LoginState {
    loginState: "LOGGED_OUT" | "LOGGED_IN",
    user?: LoggedInUser,
}

const initialLoginState: LoginState = {
    loginState: "LOGGED_OUT",
};

export const loginSlice = createSlice({
    name: "login",
    initialState: initialLoginState,
    reducers: {
        logIn: (state, action: PayloadAction<LoggedInUser>) => {
            state.loginState = "LOGGED_IN";
            state.user = {
                id: action.payload.id,
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
