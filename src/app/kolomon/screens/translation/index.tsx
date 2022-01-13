import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../../store";
import { withParams, WithParamsProp } from "../../utilities";
import EnglishWordDisplay from "./englishWordDisplay";
import SloveneWordDisplay from "./sloveneWordDisplay";
import {
    clearTranslationData, fetchCompleteTranslation,
} from "./translationSlice";
import Logger, { Colour } from "../../../core/logger";
import BaseScreen from "../baseScreen";
import { CenteringContainer } from "../../components/container";
import produce from "immer";

const log = new Logger("wordDisplay", Colour.GOLD_FUSION);

// Redux setup (mapStateToProps, mapDispatchToProps, connector)
const mapState = (state: RootState) => ({
    ...state.translation,
});
const mapDispatch = {
    dispatchFetchCompleteTranslation: fetchCompleteTranslation,
    dispatchClearTranslationData: clearTranslationData,
};
const connector = connect(mapState, mapDispatch);
type WordDisplayScreenPropsFromRedux = ConnectedProps<typeof connector>;

// Prop & State setup (merge redux and own props)
interface WordDisplayScreenProps
    extends WordDisplayScreenPropsFromRedux, WithParamsProp {}
interface WordDisplayScreenState {
    lastUrlID: number | null,
}

// Component
class WordDisplayScreen
    extends Component<WordDisplayScreenProps, WordDisplayScreenState> {
    constructor(props: WordDisplayScreenProps) {
        super(props);

        this.state = {
            lastUrlID: null,
        };
    }

    componentDidMount() {
        const {
            english,
        } = this.props;
        const { lastUrlID } = this.state;

        // If the word changes, fetch it
        if (lastUrlID == null || (english && english.word.id !== lastUrlID)) {
            this.loadAllData();
        }
    }

    loadAllData() {
        const { params, dispatchFetchCompleteTranslation } = this.props;
        const englishWordIDFromURLParam = parseInt(params?.wordId || "-1", 10);

        dispatchFetchCompleteTranslation(englishWordIDFromURLParam);
        this.setState(
            produce((previousState: WordDisplayScreenState) => {
                previousState.lastUrlID = englishWordIDFromURLParam;
            }),
        );
    }

    render() {
        const {
            english, slovene,
        } = this.props;

        // Final check before rendering.
        if (!english || !slovene) {
            return (
                <BaseScreen className="page-translation" showHeader>
                    <CenteringContainer>
                        <div className="translation-container">
                            <span>Loading...</span>
                            <hr />
                            <span>Loading...</span>
                        </div>
                    </CenteringContainer>
                </BaseScreen>
            );
        }

        const {
            word: englishWord,
            links: englishLinks,
            suggestions: englishSuggestions,
            related: englishRelated,
        } = english;

        const {
            word: sloveneWord,
        } = slovene;

        return (
            <BaseScreen className="page-translation" showHeader>
                <CenteringContainer>
                    <div className="translation-container">
                        <EnglishWordDisplay
                            word={englishWord}
                            links={englishLinks}
                            suggestions={englishSuggestions}
                            related={englishRelated}
                        />
                        <hr />
                        <SloveneWordDisplay word={sloveneWord} />
                    </div>
                </CenteringContainer>
            </BaseScreen>
        );
    }
}

export default connector(withParams(WordDisplayScreen));
