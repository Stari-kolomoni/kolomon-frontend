import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../../store";
import { withParams, WithParamsProp } from "../../utilities";
import EnglishWordDisplay from "./englishWordDisplay";
import SloveneWordDisplay from "./sloveneWordDisplay";
import KolomonApi from "../../../core/api";
import { setEnglishWord, setSloveneWord } from "./wordDisplaySlice";
import Logger, { Colour } from "../../../core/logger";
import BaseScreen from "../baseScreen";
import { CenteringContainer } from "../../components/container";

const log = new Logger("wordDisplay", Colour.GOLD_FUSION);

// Redux setup (mapStateToProps, mapDispatchToProps, connector)
const mapState = (state: RootState) => ({
    englishWord: state.wordDisplay.englishWord,
    sloveneWord: state.wordDisplay.sloveneWord,
});
const mapDispatch = {
    dispatchSetEnglishWord: setEnglishWord,
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
    async fetchEnglishWordByID(englishID: string | null): Promise<void> {
        const { dispatchSetEnglishWord } = this.props;
        log.info(`Fetching english word (id=${englishID})`);

        if (englishID === null) {
            throw new Error("Invalid english word id!");
        }

        const englishWord = await KolomonApi.getEnglishWord(parseInt(englishID, 10));
        dispatchSetEnglishWord(englishWord);
    }

    async fetchSloveneTranslation(): Promise<void> {
        const { dispatchSetSloveneWord, englishWord } = this.props;
        log.info(`Fetching slovene word associated with "${englishWord?.word}"`);

        if (typeof englishWord?.id === "undefined") {
            throw new Error("Missing english word, can't get slovene translation!");
        }

        const sloveneWord = await KolomonApi.getEnglishWordTranslation(englishWord.id);
        dispatchSetSloveneWord(sloveneWord);
    }

    render() {
        const { englishWord, sloveneWord, params } = this.props;

        // TODO Not the best approach, rethink how to check this on prop update.
        if (!englishWord) {
            this.fetchEnglishWordByID(params?.wordId || null);
            return null;
        }
        if (!sloveneWord) {
            this.fetchSloveneTranslation();
            return null;
        }

        return (
            <BaseScreen className="page-translation" showHeader>
                <span>
                    <CenteringContainer>
                        <EnglishWordDisplay word={englishWord} />
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
