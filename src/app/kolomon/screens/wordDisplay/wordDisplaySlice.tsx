import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExtendedEnglishWord, SloveneWord } from "../../core/api/validation";

export interface ReduxWordDisplayState {
    englishWord?: ExtendedEnglishWord,
    sloveneWord?: SloveneWord,
}

const initialWordDisplayState: ReduxWordDisplayState = {};

export const wordDisplaySlice = createSlice({
    name: "wordDisplay",
    initialState: initialWordDisplayState,
    reducers: {
        setEnglishWord(state, action: PayloadAction<ExtendedEnglishWord>) {
            state.englishWord = action.payload;
        },
        setSloveneWord(state, action: PayloadAction<SloveneWord>) {
            state.sloveneWord = action.payload;
        },
    },
});

// All actions as one object
export const { actions } = wordDisplaySlice;
// Destructured actions
export const { setEnglishWord, setSloveneWord } = wordDisplaySlice.actions;

export default wordDisplaySlice.reducer;
