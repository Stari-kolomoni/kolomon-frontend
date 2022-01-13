import React, { Component } from "react";

import { ExtendedEnglishWord, Link, RelatedWord, Suggestion } from "../../../core/api/validation";
import WordLinks from "./links";
import WordSuggestions from "./suggestions";
import WordRelated from "./related";

interface EnglishWordProps {
    word: ExtendedEnglishWord,
    links: Link[],
    suggestions: Suggestion[],
    related: RelatedWord[],
}

interface EnglishWordState {}

// Component
class EnglishWordDisplay extends Component<EnglishWordProps, EnglishWordState> {
    render() {
        const {
            word, links,
            suggestions, related,
        } = this.props;

        return (
            <div className="word word--english">
                <div className="word-name">{word.word}</div>
                <div className="word-description">{word.description}</div>
                <div className="word-suggestions-container">
                    <h5>Predlogi</h5>
                    <WordSuggestions suggestions={suggestions} />
                </div>
                <div className="word-related-container">
                    <h5>Povezano</h5>
                    <WordRelated relatedWords={related} language="english" />
                </div>
                <div className="word-links-container">
                    <div className="word-links-inner-container">
                        <h5>Povezave & viri</h5>
                        <WordLinks links={links} />
                    </div>
                </div>
                <div className="word-state-container">
                    <h5>Stanje</h5>
                    <span className="word-state" />
                </div>
                <div className="word-last-edit">
                    Nazadnje urejeno: {word.edited_at.toString()}
                </div>
            </div>
        );
    }
}

export default EnglishWordDisplay;
