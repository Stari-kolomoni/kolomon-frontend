import React, { ReactNode } from "react";
import { getClassNameString } from "../../core/utilities";

interface ElevationProps {
    className?: string,
    children?: ReactNode,
}

const Elevation = ({ className, children }: ElevationProps): JSX.Element => (
    <div className={getClassNameString("km-elevated", className)}>
        {children}
    </div>
);

Elevation.defaultProps = {
    className: null,
    children: null,
};

export {
    // eslint-disable-next-line import/prefer-default-export
    Elevation,
};
