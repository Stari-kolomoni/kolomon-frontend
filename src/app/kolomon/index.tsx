import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import produce from "immer";

import { RootState } from "../store";
import Logger, { Colour } from "../core/logger";
import KolomonApi from "../core/api";

import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import { logIn, LoginState } from "./screens/login/loginSlice";
import WordDisplayScreen from "./screens/translation";
import { clearGlobalBearerToken, globalBearerTokenExists } from "../core/api/requests";

const log = new Logger("kolomonapp", Colour.BITTER_LIME);

/*
 * Redux setup (mapStateToProps, mapDispatchToProps, connector)
 * - mapState: maps the redux state to React component props
 *   Should be a function that takes the RootState and returns an object containing props.
 * - mapDispatch: maps the redux slice actions to React component props
 *   Should be an object with keys being the props that will be available and values being the slice actions.
 * - connector: connects the maps above to the component.
 *   A simple connect(mapState, mapDispatch) call that creates the connector function (see end of file).
 */
const mapState = (state: RootState) => ({
    loginState: state.login.loginState,
});

const mapDispatch = {
    dispatchLogIn: logIn,
};

const connector = connect(mapState, mapDispatch);
type KolomonAppPropsFromRedux = ConnectedProps<typeof connector>;

/*
 * PROP AND STATE SETUP
 * This section should contain two interfaces: a <className>Props interface that extends the <className>PropsFromRedux
 * interface and a <className>State that contains typing for the state we'll be needing in the component.
 */
interface KolomonAppProps extends KolomonAppPropsFromRedux {}

interface KolomonAppState {
    checkedLogin: boolean,
}

/*
 * ACTUAL COMPONENT
 * Typed components should extend Component<props from above, state from above>.
 */
class KolomonApp extends Component<KolomonAppProps, KolomonAppState> {
    constructor(props: KolomonAppProps) {
        super(props);
        this.state = {
            checkedLogin: false,
        };
    }

    componentDidMount() {
        this.checkLoginStatus()
            .then(() => {
                log.debug("Initial login status check done.");
            });
    }

    checkLoginStatus = async () => {
        const { dispatchLogIn } = this.props;

        // Check whether the user is already logged in
        if (globalBearerTokenExists()) {
            // If the token is saved, verify it is valid and modify the initial state
            log.info("Detected existing login, checking token validity...");
            const loggedIn = await KolomonApi.checkIfProperlyLoggedIn();

            if (loggedIn) {
                const userInfo = await KolomonApi.getLoggedInUser();
                log.info(`User login is valid: username=${userInfo.username}`);
                dispatchLogIn(userInfo);
            } else {
                log.info("User login is invalid, will have to log in again.");
                clearGlobalBearerToken();
            }
        }

        this.setState(
            produce((previousState) => {
                previousState.checkedLogin = true;
            }),
        );
    };

    render() {
        const { loginState } = this.props;
        const { checkedLogin } = this.state;

        if (!checkedLogin) {
            // TODO Make this slightly more fancy with a loading indicator, or at the very least, centered.
            return (
                <span>Checking login...</span>
            );
        }

        const isLoggedOut = loginState === LoginState.LOGGED_OUT;

        return (
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/translation/:wordId" element={<WordDisplayScreen />} />
                <Route
                    path="*"
                    element={isLoggedOut ? <Navigate to="/login" /> : <Navigate to="/home" />}
                />
            </Routes>
        );
    }
}

/*
 * This connector call actually performs the state to prop and dispatch to prop mapping that was described above.
 */
export default connector(KolomonApp);
