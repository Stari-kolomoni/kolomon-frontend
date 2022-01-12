import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../../store";
import { withParams, WithParamsProp } from "../../utilities";
import EnglishWordDisplay from "./englishWordDisplay";
import SloveneWordDisplay from "./sloveneWordDisplay";
import KolomonApi from "../../../core/api";
import { setEnglishData, setEnglishWord, setEnglishWordLinks, setSloveneWord } from "./translationSlice";
import Logger, { Colour } from "../../../core/logger";
import BaseScreen from "../baseScreen";
import { CenteringContainer } from "../../components/container";

const log = new Logger("wordDisplay", Colour.GOLD_FUSION);

// Redux setup (mapStateToProps, mapDispatchToProps, connector)
const mapState = (state: RootState) => ({
    // englishWord: state.translation.englishWord,
    // englishWordLinks: state.translation.englishWordLinks,
    // sloveneWord: state.translation.sloveneWord,
    ...state.translation,
});
const mapDispatch = {
    dispatchSetEnglishData: setEnglishData,
    dispatchSetSloveneWord: setSloveneWord,
};
const connector = connect(mapState, mapDispatch);
type WordDisplayScreenPropsFromRedux = ConnectedProps<typeof connector>;

// Prop & State setup (merge redux and own props)
interface WordDisplayScreenProps
    extends WordDisplayScreenPropsFromRedux, WithParamsProp {}
interface WordDisplayScreenState {}

// Component
class WordDisplayScreen
    extends Component<WordDisplayScreenProps, WordDisplayScreenState> {
    async fetchCompleteEnglishWord(englishID: string | null): Promise<void> {
        const { dispatchSetEnglishData } = this.props;
        log.info(`Fetching english word (id=${englishID})`);

        if (englishID === null) {
            throw new Error("Invalid english word id!");
        }

        const wordID = parseInt(englishID, 10);

        const englishWord = await KolomonApi.getEnglishWord(wordID);
        const englishWordLinks = await KolomonApi.getAllEnglishWordLinks(wordID);

        dispatchSetEnglishData({
            word: englishWord,
            links: englishWordLinks,
        });
    }

    async fetchCompleteSloveneTranslation(): Promise<void> {
        const {
            dispatchSetSloveneWord,
            english: { word: englishWord },
        } = this.props;
        log.info(`Fetching slovene word associated with "${englishWord?.word}"`);

        if (typeof englishWord?.id === "undefined") {
            throw new Error("Missing english word, can't get slovene translation!");
        }

        const sloveneWord = await KolomonApi.getEnglishWordTranslation(englishWord.id);
        dispatchSetSloveneWord(sloveneWord);
    }

    render() {
        const {
            english: { word: englishWord, links: englishLinks },
            slovene: { word: sloveneWord },
            params,
        } = this.props;

        // TODO Not the best approach, rethink how to check this on prop update.
        if (!englishWord) {
            this.fetchCompleteEnglishWord(params?.wordId || null);
            return null;
        }
        if (!sloveneWord) {
            this.fetchCompleteSloveneTranslation();
            return null;
        }
        if (!englishLinks) {
            throw new Error("English word is not empty, but its links are?");
        }

        return (
            <BaseScreen className="page-translation" showHeader>
                <span>
                    <CenteringContainer>
                        <EnglishWordDisplay word={englishWord} links={englishLinks} />
                    </CenteringContainer>
                    <hr />
                    <CenteringContainer>
                        <SloveneWordDisplay word={sloveneWord} />
                    </CenteringContainer>
                </span>
            </BaseScreen>
        );
    }
}

export default connector(withParams(WordDisplayScreen));
