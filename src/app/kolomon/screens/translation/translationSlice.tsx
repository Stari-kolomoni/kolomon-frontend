import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ExtendedEnglishWord, Link, Suggestion,
    SloveneWord, RelatedWord,
} from "../../../core/api/validation";
import KolomonApi from "../../../core/api";

/*
 * State
 */
interface ReduxEnglishWordState {
    word: ExtendedEnglishWord,
    links: Link[],
    suggestions: Suggestion[],
    related: RelatedWord[],
}

interface ReduxSloveneWordState {
    word: SloveneWord,
}

export interface ReduxWordDisplayState {
    english: ReduxEnglishWordState | null,
    slovene: ReduxSloveneWordState | null,
}

const initialWordDisplayState: ReduxWordDisplayState = {
    english: null,
    slovene: null,
};

/*
 * Fetching logic and thunks
 */
const _fetchCompleteEnglishWord = async (wordID: number) => {
    const englishWord = await KolomonApi.getEnglishWord(wordID);
    const englishWordLinks = await KolomonApi.getAllEnglishWordLinks(wordID);
    const englishSuggestions
        = await KolomonApi.getAllEnglishWordTranslationSuggestions(wordID);
    const englishRelated = await KolomonApi.getAllEnglishWordRelatedWords(wordID);

    return {
        word: englishWord,
        links: englishWordLinks,
        suggestions: englishSuggestions,
        related: englishRelated,
    } as ReduxEnglishWordState;
};

const _fetchCompleteSloveneWord = async (englishWordID: number) => {
    const sloveneWord = await KolomonApi.getEnglishWordTranslation(englishWordID);

    return {
        word: sloveneWord,
    } as ReduxSloveneWordState;
};

export const fetchCompleteEnglishWord = createAsyncThunk(
    "translation/fetchCompleteEnglishWord",
    _fetchCompleteEnglishWord,
);

export const fetchCompleteSloveneWord = createAsyncThunk(
    "translation/fetchCompleteSloveneWord",
    _fetchCompleteSloveneWord,
);

export const fetchCompleteTranslation = createAsyncThunk(
    "translation/fetchCompleteTranslation",
    async (englishWordID: number) => {
        const englishData = await _fetchCompleteEnglishWord(englishWordID);
        const sloveneData = await _fetchCompleteSloveneWord(englishWordID);

        return {
            english: englishData,
            slovene: sloveneData,
        };
    },
);

/*
 * Slice
 */
export const translationSlice = createSlice({
    name: "wordDisplay",
    initialState: initialWordDisplayState,
    reducers: {
        // Allows setting multiple english word values at the same time
        updateEnglishData(state, action: PayloadAction<ReduxEnglishWordState>) {
            state.english = {
                ...state.english,
                ...action.payload,
            };
        },
        clearEnglishData(state) {
            state.english = null;
        },

        updateSloveneData(state, action: PayloadAction<ReduxSloveneWordState>) {
            state.slovene = {
                ...state.slovene,
                ...action.payload,
            };
        },
        clearSloveneData(state) {
            state.slovene = null;
        },

        clearTranslationData(state) {
            state.english = null;
            state.slovene = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchCompleteEnglishWord.fulfilled,
            (state, action) => {
                state.english = action.payload;
            },
        );

        builder.addCase(
            fetchCompleteSloveneWord.fulfilled,
            (state, action) => {
                state.slovene = action.payload;
            },
        );

        builder.addCase(
            fetchCompleteTranslation.fulfilled,
            (state, action) => {
                state.english = action.payload.english;
                state.slovene = action.payload.slovene;
            },
        );
    },
});



// All actions as one object
export const { actions } = translationSlice;
// Destructured actions
export const {
    updateEnglishData,
    clearEnglishData,
    updateSloveneData,
    clearSloveneData,
    clearTranslationData,
} = translationSlice.actions;

export default translationSlice.reducer;
