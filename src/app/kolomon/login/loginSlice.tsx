import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../core/api/validation";

export enum LoginState {
    LOGGED_OUT = "LOGGED_OUT",
    LOGGED_IN = "LOGGED_IN",
}

export interface ReduxLoginState {
    loginState: LoginState,
    user?: User,
}

const initialLoginState: ReduxLoginState = {
    loginState: LoginState.LOGGED_OUT,
};

export const loginSlice = createSlice({
    name: "login",
    initialState: initialLoginState,
    reducers: {
        logIn: (state, action: PayloadAction<User>) => {
            state.loginState = LoginState.LOGGED_IN;
            state.user = action.payload;
        },
    },
});

// All actions as one object
export const { actions } = loginSlice;
// Destructured actions
export const { logIn } = loginSlice.actions;

export default loginSlice.reducer;
