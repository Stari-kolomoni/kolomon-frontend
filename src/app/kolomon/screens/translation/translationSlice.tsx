import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExtendedEnglishWord, Link, SloveneWord } from "../../../core/api/validation";

interface ReduxEnglishWordState {
    word?: ExtendedEnglishWord,
    links?: Link[],
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
        setEnglishWord(state, action: PayloadAction<ExtendedEnglishWord>) {
            state.english.word = action.payload;
        },
        setEnglishWordLinks(state, action: PayloadAction<Link[]>) {
            state.english.links = action.payload;
        },
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
    setEnglishWord, setEnglishWordLinks, setEnglishData,
    setSloveneWord,
} = translationSlice.actions;

export default translationSlice.reducer;
