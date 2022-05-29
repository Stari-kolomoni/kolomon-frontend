import React, { Component } from "react";
import { SloveneWord } from "../../../core/api/validation";


interface SloveneWordProps {
    word: SloveneWord
}

interface SloveneWordState {}


class SloveneWordDisplay extends Component<SloveneWordProps, SloveneWordState> {
    render() {
        const { word } = this.props;

        return (
            <div className="word word--slovene">
                <div className="word-name">{word.word}</div>
                <div className="word-description">{word.description}</div>
                <div className="word-related-container">
                    <h5>Povezano</h5>
                    <span className="word-related">povezane vsebine</span>
                </div>
                <div className="word-links-container">
                    <h5>Povezave & viri</h5>
                    <span className="word-links">povezave tukaj</span>
                </div>
                <div className="word-last-edit">
                    Nazadnje urejeno: {word.edited_at?.toString()}
                </div>
            </div>
        );
    }
}

export default SloveneWordDisplay;
