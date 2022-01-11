import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import produce from "immer";

import { RootState } from "../store";
import KolomonStorage from "../core/storage";
import Logger, { Colour } from "../core/logger";
import KolomonApi from "../core/api";

import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import { logIn, LoginState } from "./screens/login/loginSlice";
import WordDisplayScreen from "./screens/wordDisplay";

const log = new Logger("kolomonapp", Colour.BITTER_LIME);

// Redux setup (mapStateToProps, mapDispatchToProps, connector)
const mapState = (state: RootState) => ({
    loginState: state.login.loginState,
});
const mapDispatch = {
    dispatchLogIn: logIn,
};
const connector = connect(mapState, mapDispatch);
type KolomonAppPropsFromRedux = ConnectedProps<typeof connector>;

// Prop & State setup (merge redux and own props)
interface KolomonAppProps extends KolomonAppPropsFromRedux {}

interface KolomonAppState {
    checkedLogin: boolean,
}

// Component
class KolomonApp extends Component<KolomonAppProps, KolomonAppState> {
    constructor(props: KolomonAppProps) {
        super(props);
        this.state = {
            checkedLogin: false,
        };
    }

    componentDidMount() {
        this.checkLoginStatus().then(() => log.debug("checkLoginStatus done"));
    }

    checkLoginStatus = async () => {
        const { dispatchLogIn } = this.props;

        // Check whether the user is already logged in
        const authStorage = new KolomonStorage("local", "auth");
        if (authStorage.exists("oauth2-bearer")) {
            // If the token is saved, verify it is valid and modify the initial state
            log.info("Detected saved token, checking validity.");
            const loggedIn = await KolomonApi.checkIfProperlyLoggedIn();

            if (loggedIn) {
                const userInfo = await KolomonApi.getLoggedInUser();
                log.info(`Valid login: ${userInfo.username}`);
                dispatchLogIn(userInfo);
            } else {
                log.info("Invalid token, user will have to log in again.");
                authStorage.delete("oauth2-bearer");
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
        log.debug(`loginState: ${loginState}`);

        if (!checkedLogin) {
            return (
                <span>Checking login...</span>
            );
        }

        if (loginState === LoginState.LOGGED_OUT) {
            return (
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route
                        path="*"
                        element={<Navigate to="/login" />}
                    />
                </Routes>
            );
        }

        return (
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/translation/:wordId" element={<WordDisplayScreen />} />
                <Route
                    path="*"
                    element={<Navigate to="/home" />}
                />
            </Routes>
        );
    }
}

export default connector(KolomonApp);
