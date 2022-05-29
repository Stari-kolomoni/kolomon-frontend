import React, { Component, ReactNode } from "react";

import { clearGlobalBearerToken } from "../../core/api/requests";
import Logger, { Colour } from "../../core/logger";
import Header from "./header";

const log = new Logger("baseScreen", Colour.XIKETIC);


interface BasePageProps {
    children?: ReactNode,
    showHeader: boolean,
    className: string,
}

interface BasePageState {}

/**
 * Page abstraction (all pages/"screens" should be wrapped in this).
 */
class BaseScreen extends Component<BasePageProps, BasePageState> {
    placeholderLogOut = (): void => {
        log.info("Clearing token.");
        const wasCleared = clearGlobalBearerToken();

        if (wasCleared) {
            log.info("Cleared successfully!");
            window.location.reload();
        } else {
            log.warn("Couldn't clear the token, possibly wasn't set.");
        }
    };

    render(): ReactNode {
        const {
            children,
            showHeader,
            className,
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
