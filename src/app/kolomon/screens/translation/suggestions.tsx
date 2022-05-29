import React, { Component } from "react";
import { Suggestion } from "../../../core/api/validation";


interface WordSuggestionsProps {
    suggestions: Suggestion[],
}
interface WordSuggestionsState {}


class WordSuggestions extends Component<WordSuggestionsProps, WordSuggestionsState> {
    render() {
        const { suggestions } = this.props;

        return (
            <div className="word-suggestions slovene">
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
