import React from "react";
import { getClassNameString } from "../../core/utilities";

interface ButtonProps {
    content: string,
    type: "submit" | "reset" | "button",
    className?: string,
}

const Button = ({ content, type, className }: ButtonProps): JSX.Element => {
    return (
        <button
            // Disabled because TypeScript checks the type for us
            // (see https://github.com/yannickcr/eslint-plugin-react/issues/1555)
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={getClassNameString("km-button", className)}
        >
            {content}
        </button>
    );
};

Button.defaultProps = {
    className: null,
};

export {
    // eslint-disable-next-line import/prefer-default-export
    Button,
};
