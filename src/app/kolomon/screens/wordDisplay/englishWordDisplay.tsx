import React, { Component } from "react";
import { ExtendedEnglishWord } from "../../core/api/validation";
import Links from "./links";

interface EnglishWordProps {
    word: ExtendedEnglishWord
}

interface EnglishWordState {}

// Component
class EnglishWordDisplay extends Component<EnglishWordProps, EnglishWordState> {
    render() {
        const { word } = this.props;

        return (
            <div className="word word--english">
                <div className="word-name">{word.word}</div>
                <div className="word-description">{word.description}</div>
                <div className="word-suggestions-container">
                    <h5>Predlogi</h5>
                    <span className="word-suggestions">predloge</span>
                </div>
                <div className="word-related-container">
                    <h5>Povezano</h5>
                    <span className="word-related">povezane vsebine</span>
                </div>
                <div className="word-links-container">
                    <div className="word-links-inner-container">
                        <h5>Povezave & viri</h5>
                        <Links />
                    </div>
                </div>
                <div className="word-state-container">
                    <h5>Stanje</h5>
                    <span className="word-state">opis stanja</span>
                </div>
                <div className="word-last-edit">
                    Nazadnje urejeno: {word.edited_at.toString()}
                </div>
            </div>
        );
    }
}

export default EnglishWordDisplay;
