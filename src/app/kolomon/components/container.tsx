import React, { ReactNode } from "react";
import { getClassNameString } from "../../core/utilities";

interface ContainerProps {
    className?: string,
    children?: ReactNode,
    // Corresponds to km-container and km-container--narrow in _containers.scss
    containerType?: "normal" | "narrow",
}

/**
 * Create a new ("normal") item container, which is just some padding.
 *
 * @param className Any additional CSS classes to apply.
 * @param children Automatically passed children components.
 * @param containerType Container type (normal or narrow), dictates the amount of padding.
 * @constructor
 */
const Container = (
    { className, children, containerType }: ContainerProps,
): JSX.Element => {
    const containerClass = containerType === "normal"
        ? "km-container"
        : "km-container--narrow";

    return (
        <div className={getClassNameString(containerClass, className)}>
            {children}
        </div>
    );
};

Container.defaultProps = {
    className: "",
    children: "",
    containerType: "normal",
};

interface ElevatedContainerProps {
    className?: string,
    children?: ReactNode,
}

/**
 * An "elevated" item container.
 * Slightly rounded counter with a slightly lighter background colour, implying elevation.
 */

/**
 * Create a new ("elevated") item container.
 * Slightly rounded corners with a slightly lighter background colour, implying surface elevation.
 *
 * @param className Additional CSS classes to apply.
 * @param children Automatically passed children components.
 * @constructor
 */
const ElevatedContainer = (
    { className, children }: ElevatedContainerProps,
): JSX.Element => (
    <div className={getClassNameString("km-elevated", className)}>
        {children}
    </div>
);

ElevatedContainer.defaultProps = {
    className: null,
    children: null,
};

interface CenteringFullWidthContainerProps {
    className?: string,
    children?: ReactNode,
}

/**
 * Create a new full-width flex container that vertically centers all of its children.
 *
 * @param className Additional CSS classes to apply.
 * @param children Automatically passed children components.
 * @constructor
 */
const CenteringContainer = (
    { className, children }: CenteringFullWidthContainerProps,
): JSX.Element => (
    <div className={getClassNameString("km-centering-container", className)}>
        {children}
    </div>
);

CenteringContainer.defaultProps = {
    className: "",
    children: "",
};

export {
    Container,
    ElevatedContainer,
    CenteringContainer,
};
