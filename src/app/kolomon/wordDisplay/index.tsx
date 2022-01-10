import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Params } from "react-router-dom";

import { RootState } from "../../store";
import { withParams } from "../utilities";
import EnglishWordDisplay from "./englishWordDisplay";
import SloveneWordDisplay from "./sloveneWordDisplay";
import KolomonApi from "../../core/api";
import { setEnglishWord, setSloveneWord } from "./wordDisplaySlice";
import Logger, { Colour } from "../../core/logger";

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
type WordDisplayPropsFromRedux = ConnectedProps<typeof connector>;

// Prop & State setup (merge redux and own props)
interface WordDisplayProps extends WordDisplayPropsFromRedux {
    params: Readonly<Params>
}

interface WordDisplayState {}

// Component
class MainWordDisplay extends Component<WordDisplayProps, WordDisplayState> {
    constructor(props: WordDisplayProps) {
        super(props);
    }

    async fetchEnglishWordByID(englishID: string | null) {
        const { dispatchSetEnglishWord } = this.props;
        log.info(`Fetching english word (id=${englishID})`);

        if (englishID === null) {
            throw new Error("Invalid english word id!");
        }

        const englishWord = await KolomonApi.getEnglishWord(parseInt(englishID, 10));
        dispatchSetEnglishWord(englishWord);
    }

    // eslint-disable-next-line class-methods-use-this
    fetchSloveneTranslation() {
        // TODO
        return null;
    }

    render() {
        const { englishWord, sloveneWord, params } = this.props;

        // TODO Not the best approach, rethink how to check this on prop update.
        if (!englishWord) {
            this.fetchEnglishWordByID(params?.wordId || null);
        }
        if (englishWord && !sloveneWord) {
            this.fetchSloveneTranslation();
        }

        return (
            <span>
                {
                    englishWord ? <EnglishWordDisplay word={englishWord} /> : null
                }
                <hr />
                {
                    sloveneWord ? <SloveneWordDisplay word={sloveneWord} /> : null
                }
            </span>
        );
    }
}

export default withParams(connector(MainWordDisplay));
