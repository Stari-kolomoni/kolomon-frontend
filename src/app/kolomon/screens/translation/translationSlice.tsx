import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ExtendedEnglishWord, Link, Suggestion,
    SloveneWord,
} from "../../../core/api/validation";

interface ReduxEnglishWordState {
    word?: ExtendedEnglishWord,
    links?: Link[],
    suggestions?: Suggestion[],
}

export interface ReduxWordDisplayState {
    english: ReduxEnglishWordState,
    slovene: {
        word?: SloveneWord,
    },
}

const initialWordDisplayState: ReduxWordDisplayState = {
    english: {},
    slovene: {},
};

export const translationSlice = createSlice({
    name: "wordDisplay",
    initialState: initialWordDisplayState,
    reducers: {
        // Allows setting multiple english word values at the same time
        setEnglishData(state, action: PayloadAction<ReduxEnglishWordState>) {
            state.english = {
                ...state.english,
                ...action.payload,
            };
        },

        setSloveneWord(state, action: PayloadAction<SloveneWord>) {
            state.slovene.word = action.payload;
        },
    },
});

// All actions as one object
export const { actions } = translationSlice;
// Destructured actions
export const {
    setEnglishData,
    setSloveneWord,
} = translationSlice.actions;

export default translationSlice.reducer;
