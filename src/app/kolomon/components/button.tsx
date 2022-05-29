import React, { MouseEventHandler } from "react";
import { getClassNameString } from "../../core/utilities";

interface ButtonProps {
    content: string,
    type: "submit" | "reset" | "button",
    className?: string,
    id?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

/**
 * Create a new Button.
 *
 * @param content Button text.
 * @param type Button type (submit, reset or button).
 * @param className Any additional CSS classes to apply.
 * @param onClick On click event handler to add to the button.
 * @param id ID of the button.
 * @constructor
 */
const Button = ({
    content, type, className, onClick, id,
}: ButtonProps): JSX.Element => (
    <button
        // Disabled because TypeScript checks the type for us
        // (see https://github.com/yannickcr/eslint-plugin-react/issues/1555)
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={getClassNameString("km-button", className)}
        onClick={onClick}
        id={id}
    >
        {content}
    </button>
);

Button.defaultProps = {
    className: null,
    onClick: null,
    id: null,
};

export {
    // eslint-disable-next-line import/prefer-default-export
    Button,
};
