import React, { ReactNode } from "react";
import { getClassNameString } from "../../core/utilities";

interface ContainerProps {
    className?: string,
    children?: ReactNode,
    // Corresponds to km-container and km-container--narrow in _containers.scss
    containerType?: "normal" | "narrow",
}

/**
 * A normal item container. Just some padding.
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
 * A full-width flex container that vertically centers all its children.
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
