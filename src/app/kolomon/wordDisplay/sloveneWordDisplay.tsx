import React, { Component } from "react";
import { SloveneWord } from "../../core/api/validation";

interface SloveneWordProps {
    word: SloveneWord
}

interface SloveneWordState {}

// Component
class SloveneWordDisplay extends Component<SloveneWordProps, SloveneWordState> {
    constructor(props: SloveneWordProps) {
        super(props);
    }

    render() {
        const { word } = this.props;

        return (
            <span>
                Slovene word: {word.word}
            </span>
        );
    }
}

export default SloveneWordDisplay;
