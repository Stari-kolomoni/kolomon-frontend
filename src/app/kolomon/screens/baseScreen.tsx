import React, { Component, ReactNode } from "react";

import { clearGlobalBearerToken } from "../../core/api/requests";
import Logger, { Colour } from "../../core/logger";
import Header from "./header";

const log = new Logger("base-screen", Colour.XIKETIC);

interface BasePageProps {
    children?: ReactNode,
    showHeader: boolean,
    className: string,
}
interface BasePageState {}

class BaseScreen extends Component<BasePageProps, BasePageState> {
    placeholderLogOut = (): void => {
        log.warn("Clearing token.");
        const result = clearGlobalBearerToken();
        if (result) {
            log.info("Cleared successfully!");
            window.location.reload();
        }
    };

    render(): ReactNode {
        const {
            children,
            showHeader, className,
        } = this.props;

        // Display the header only if showHeader prop is true.
        return (
            <div className={`page-main ${className}`}>
                {showHeader ? <Header /> : null}
                <div className="content">
                    {children}
                </div>
            </div>
        );
    }
}

export default BaseScreen;
