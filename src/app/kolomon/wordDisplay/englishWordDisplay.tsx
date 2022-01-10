import React, { Component } from "react";
import { ExtendedEnglishWord } from "../../core/api/validation";

interface EnglishWordProps {
    word: ExtendedEnglishWord
}

interface EnglishWordState {}

// Component
class EnglishWordDisplay extends Component<EnglishWordProps, EnglishWordState> {
    constructor(props: EnglishWordProps) {
        super(props);
    }

    render() {
        const { word } = this.props;

        return (
            <span>
                English word: {word.word}
            </span>
        );
    }
}

export default EnglishWordDisplay;
