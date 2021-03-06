import React, { Component, ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Params } from "react-router-dom";

import { RootState } from "../../../store";
import { withParams, WithParamsProp } from "../../utilities";
import EnglishWordDisplay from "./englishWordDisplay";
import SloveneWordDisplay from "./sloveneWordDisplay";
import {
    clearTranslationData,
    fetchCompleteTranslation,
} from "./translationSlice";
import Logger, { Colour } from "../../../core/logger";
import BaseScreen from "../baseScreen";
import { CenteringContainer } from "../../components/container";

const log = new Logger("wordDisplay", Colour.GOLD_FUSION);


const mapState = (state: RootState) => ({
    ...state.translation,
});

const mapDispatch = {
    dispatchFetchCompleteTranslation: fetchCompleteTranslation,
    dispatchClearTranslationData: clearTranslationData,
};

const connector = connect(mapState, mapDispatch);
type WordDisplayScreenPropsFromRedux = ConnectedProps<typeof connector>;


interface WordDisplayScreenProps extends WordDisplayScreenPropsFromRedux, WithParamsProp {}

interface WordDisplayScreenState {}


class WordDisplayScreen extends Component<WordDisplayScreenProps, WordDisplayScreenState> {
    componentDidMount() {
        // We call the logic for updating because componentDidUpdate
        // is not called after first render.
        // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
        this.loadAllTranslationData();
    }

    componentDidUpdate(
        prevProps: Readonly<WordDisplayScreenProps>,
    ) {
        const { params: prevParams } = prevProps;
        const { fetched: currentFetched } = this.props;

        const previousID = this.extractEnglishWordIDFromURL(prevParams);
        const currentID = this.extractEnglishWordIDFromURL();

        // Reload if marked as unfetched
        if (currentFetched === false) {
            this.loadAllTranslationData();
            return;
        }

        // Reload if no previous URL parameter in state
        if (currentID !== null && (previousID !== currentID)) {
            this.loadAllTranslationData();
        }
    }

    extractEnglishWordIDFromURL(customParams?: Readonly<Params>): number | null {
        // User can pass custom params object in, otherwise it defaults to the params in props.
        let usableParams: Readonly<Params>;
        if (typeof customParams !== "undefined") {
            usableParams = customParams;
        } else {
            const { params } = this.props;
            usableParams = params;
        }

        if (typeof usableParams.wordId === "undefined") {
            return null;
        }

        return parseInt(usableParams.wordId, 10);
    }

    loadAllTranslationData() {
        const { dispatchFetchCompleteTranslation } = this.props;
        const englishWordIDFromURLParam = this.extractEnglishWordIDFromURL();

        if (englishWordIDFromURLParam === null) {
            throw new Error("Could not load translation data: URL parameter is null!");
        }

        log.info(`Loading translation data (id=${englishWordIDFromURLParam}).`);
        dispatchFetchCompleteTranslation(englishWordIDFromURLParam);
    }

    render() {
        const {
            fetched, english, slovene,
        } = this.props;

        // Final check before rendering.
        if (!fetched) {
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

        if (!english && !slovene) {
            throw new Error("Fetched data, but both english and slovene word are missing!");
        }

        let englishDisplay: ReactElement | null = null;
        if (english) {
            const {
                word: englishWord,
                links: englishLinks,
                suggestions: englishSuggestions,
                related: englishRelated,
            } = english;
            englishDisplay = (
                <EnglishWordDisplay
                    word={englishWord}
                    links={englishLinks}
                    suggestions={englishSuggestions}
                    related={englishRelated}
                />
            );
        }

        let sloveneDisplay: ReactElement | null = null;
        if (slovene) {
            const {
                word: sloveneWord,
            } = slovene;
            sloveneDisplay = (
                <SloveneWordDisplay word={sloveneWord} />
            );
        }

        return (
            <BaseScreen className="page-translation" showHeader>
                <CenteringContainer>
                    <div className="translation-container">
                        {englishDisplay}
                        <hr />
                        {sloveneDisplay}
                    </div>
                </CenteringContainer>
            </BaseScreen>
        );
    }
}

export default connector(withParams(WordDisplayScreen));
