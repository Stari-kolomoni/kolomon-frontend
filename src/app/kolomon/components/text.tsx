import React from "react";

interface HeadingProps {
    content?: string,
    className?: string,
}

const H1 = ({ content, className }: HeadingProps): JSX.Element => (
    <h1 className={className}>{content}</h1>
);

H1.defaultProps = {
    content: "",
    className: null,
};

const H2 = ({ content, className }: HeadingProps): JSX.Element => (
    <h2 className={className}>{content}</h2>
);

H2.defaultProps = {
    content: "",
    className: null,
};

export {
    // eslint-disable-next-line import/prefer-default-export
    H1, H2,
};
