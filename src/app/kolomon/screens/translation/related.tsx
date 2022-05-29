import React, { Component } from "react";
import { RelatedWord } from "../../../core/api/validation";
import { withNavigation, WithNavigationProp } from "../../utilities";


interface WordRelatedProps extends WithNavigationProp {
    relatedWords: RelatedWord[],
    language: "slovene" | "english",
}
interface WordRelatedState {}


class WordRelated extends Component<WordRelatedProps, WordRelatedState> {
    render() {
        const { relatedWords, language, navigate } = this.props;

        return (
            <div className={`word-related ${language}`}>
                {relatedWords.map((word) => (
                    <span
                        key={word.id}
                        className="related"
                        role="link"
                        tabIndex={0}
                        onClick={() => navigate(`/translation/${word.id}`)}
                        onKeyDown={() => navigate(`/translation/${word.id}`)}
                    >
                        {word.word}
                    </span>
                ))}
            </div>
        );
    }
}

export default withNavigation(WordRelated);
