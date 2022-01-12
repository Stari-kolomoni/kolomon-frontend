import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./kolomon/screens/login/loginSlice";
import translationReducer from "./kolomon/screens/translation/translationSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        translation: translationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
