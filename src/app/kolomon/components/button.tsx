import React, { MouseEventHandler } from "react";
import { getClassNameString } from "../../core/utilities";

interface ButtonProps {
    content: string,
    type: "submit" | "reset" | "button",
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

const Button = ({
    content, type, className, onClick,
}: ButtonProps): JSX.Element => (
    <button
        // Disabled because TypeScript checks the type for us
        // (see https://github.com/yannickcr/eslint-plugin-react/issues/1555)
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={getClassNameString("km-button", className)}
        onClick={onClick}
    >
        {content}
    </button>
);

Button.defaultProps = {
    className: null,
    onClick: null,
};

export {
    // eslint-disable-next-line import/prefer-default-export
    Button,
};
