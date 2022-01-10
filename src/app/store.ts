import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./kolomon/login/loginSlice";
import wordDisplayReducer from "./kolomon/wordDisplay/wordDisplaySlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        wordDisplay: wordDisplayReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
