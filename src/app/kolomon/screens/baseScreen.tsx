import React, { Component, ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../store";
import KolomonIconSVG from "../../../assets/kolomon-icon-v3.svg";
import { clearGlobalBearerToken } from "../../core/api/requests";
import Logger, { Colour } from "../../core/logger";

const log = new Logger("base-screen", Colour.XIKETIC);

const mapState = (state: RootState) => ({
    user: state.login.user,
});
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);
type BaseScreenPropsFromRedux = ConnectedProps<typeof connector>;

interface BasePageProps extends BaseScreenPropsFromRedux {
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
            children, user,
            showHeader, className,
        } = this.props;

        // Display the header only if showHeader prop is true.
        let headerContent = null;
        if (showHeader) {
            headerContent = (
                <div className="header">
                    {/* Left-aligned part */}
                    <div className="header__block header__block--left">
                        <div
                            id="header-icon"
                            dangerouslySetInnerHTML={{ __html: KolomonIconSVG }}
                        />
                        <div id="kolomon-title">Kolomon</div>
                    </div>

                    {/* TODO Search bar */}

                    {/* Right-aligned part */}
                    <span className="header__block header__block--right">
                        {
                            user
                                ? (
                                    <span className="user-block">
                                        <span id="user-info">{user.username}</span>
                                        <button
                                            type="button"
                                            className="km-button km-button--alt"
                                            onClick={this.placeholderLogOut}
                                        >
                                            Log out
                                        </button>
                                    </span>
                                )
                                : (
                                    <span id="user-info">Ni prijave</span>
                                )
                        }
                        {/* TODO User dropdown */}
                    </span>
                </div>
            );
        }

        return (
            <div className={`page-main ${className}`}>
                {headerContent}
                <div className="content">
                    {children}
                </div>
            </div>
        );
    }
}

export default connector(BaseScreen);
