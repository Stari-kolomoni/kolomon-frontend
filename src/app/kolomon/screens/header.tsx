import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../store";
import KolomonIconSVG from "../../../assets/kolomon-icon-v3.svg";
import { clearGlobalBearerToken } from "../../core/api/requests";
import Logger, { Colour } from "../../core/logger";
import { withNavigation, WithNavigationProp } from "../utilities";

const log = new Logger("header", Colour.MYRTLE_GREEN);


const mapState = (state: RootState) => ({
    user: state.login.user,
});
const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type HeaderPropsFromRedux = ConnectedProps<typeof connector>;


interface HeaderProps extends HeaderPropsFromRedux, WithNavigationProp {}

interface HeaderState {}


class Header extends Component<HeaderProps, HeaderState> {
    placeholderLogOut = (): void => {
        log.warn("Clearing token.");
        const result = clearGlobalBearerToken();

        if (result) {
            log.info("Cleared successfully!");
            window.location.reload();
        }
    };

    navigateToHomePage = (): void => {
        const { navigate } = this.props;
        navigate("/home");
    };

    render() {
        const { user } = this.props;

        return (
            <div className="header">
                {/* Left-aligned part */}
                <button
                    className="header__block header__block--left"
                    onClick={this.navigateToHomePage}
                    type="button"
                >
                    <div
                        id="header-icon"
                        dangerouslySetInnerHTML={{ __html: KolomonIconSVG }}
                    />
                    <div id="kolomon-title">Kolomon</div>
                </button>

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
}

export default withNavigation(connector(Header));
