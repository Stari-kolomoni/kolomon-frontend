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
            <div className="word word--english">
                <div className="word-name">{word.word}</div>
                <div className="word-description">{word.description}</div>
                <div className="word-suggestions">Predlogi</div>
                <div className="word-related">Povezano</div>
                <div className="word-links">Povezave & viri</div>
                <div className="word-state">Stanje</div>
                <div className="word-last-edit">
                    Nazadnje urejeno: {word.edited_at.toString()}
                </div>
            </div>
        );
    }
}

export default EnglishWordDisplay;
