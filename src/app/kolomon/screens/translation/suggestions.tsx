import React, { Component } from "react";
import { Suggestion } from "../../../core/api/validation";

interface WordSuggestionsProps {
    suggestions: Suggestion[],
    language: "english" | "slovene",
}
interface WordSuggestionsState {}

class WordSuggestions extends Component<WordSuggestionsProps, WordSuggestionsState> {
    render() {
        const { suggestions, language } = this.props;

        return (
            <div className={`word-suggestions ${language}`}>
                {suggestions.map((suggestion) => (
                    <span
                        key={suggestion.id}
                        className="suggestion"
                    >
                        {suggestion.suggestion}
                        {/* TODO Other attributes */}
                    </span>
                ))}
            </div>
        );
    }
}

export default WordSuggestions;
