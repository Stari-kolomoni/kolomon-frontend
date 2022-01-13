import React, { Component } from "react";
import { RelatedWord } from "../../../core/api/validation";

interface WordRelatedProps {
    relatedWords: RelatedWord[],
    language: "slovene" | "english",
}
interface WordRelatedState {}

class WordRelated extends Component<WordRelatedProps, WordRelatedState> {
    render() {
        const { relatedWords, language } = this.props;

        return (
            <div className={`word-related ${language}`}>
                {relatedWords.map((word) => (
                    <span
                        key={word.id}
                        className="related"
                    >
                        {word.word}
                    </span>
                ))}
            </div>
        );
    }
}

export default WordRelated;
