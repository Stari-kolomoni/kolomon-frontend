import React, { Component, ReactElement } from "react";

import {
    ExtendedEnglishWord, Link, RelatedWord, Suggestion,
} from "../../../core/api/validation";
import WordLinks from "./links";
import WordSuggestions from "./suggestions";
import WordRelated from "./related";
import Logger, { Colour } from "../../../core/logger";

const log = new Logger("english word", Colour.BITTER_LIME);

interface EnglishWordProps {
    word: ExtendedEnglishWord,
    links: Link[],
    suggestions: Suggestion[],
    related: RelatedWord[],
}

interface EnglishWordState {}

// Component
class EnglishWordDisplay extends Component<EnglishWordProps, EnglishWordState> {
    componentDidMount() {
        log.debug("English word mounted.");
    }

    render() {
        const {
            word, links,
            suggestions, related,
        } = this.props;

        let date: Date;

        const hasBeenEdited = word.edited_at !== null;
        if (hasBeenEdited) {
            if (!word.edited_at) {
                throw new Error(`Entry ${word.id} was edited, but its reponse has no word.edited_at?!`);
            } else {
                date = new Date(word.edited_at);
            }
        } else {
            date = new Date(word.created_at);
        }

        const dateString = date.toDateString();

        let lastEditContents: ReactElement;

        if (word.edited_by_name) {
            lastEditContents = (
                <div className="word-last-edit">
                    {hasBeenEdited ? "uredil" : "ustvaril"} uporabnik
                    &nbsp;<span id="user-name">{word.edited_by_name}</span>
                    &nbsp;({dateString})
                </div>
            );
        } else {
            lastEditContents = (
                <div className="word-last-edit">
                    {hasBeenEdited ? "uredil" : "ustvaril"} neznan uporabnik
                    ({dateString})
                </div>
            );
        }

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

                {lastEditContents}
            </div>
        );
    }
}

export default EnglishWordDisplay;
