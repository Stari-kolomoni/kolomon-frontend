import React from "react";

interface H1Props {
    content?: string,
    className?: string,
}

const H1 = ({ content, className }: H1Props): JSX.Element => (
    <h1 className={className}>{content}</h1>
);

H1.defaultProps = {
    content: "",
    className: null,
};

export {
    // eslint-disable-next-line import/prefer-default-export
    H1,
};
