import React, { ChangeEvent, Component, MouseEvent } from "react";
import { connect, ConnectedProps } from "react-redux";
import produce from "immer";
import { Navigate } from "react-router-dom";

import { RootState } from "../../../store";
import Logger, { Colour } from "../../../core/logger";
import KolomonApi from "../../../core/api";
import { setGlobalBearerToken } from "../../../core/api/requests";

import { Button } from "../../components/button";
import { Form, FormTextInput } from "../../components/form";
import { ElevatedContainer } from "../../components/container";
import { H1 } from "../../components/text";
import { logIn, LoginState as LoginSliceState } from "./loginSlice";
import BaseScreen from "../baseScreen";

const log = new Logger("login", Colour.DARK_PURPLE);

const mapState = (state: RootState) => ({
    isLoggedIn: state.login.loginState,
    loggedInUser: state.login.user,
});
const mapDispatch = {
    dispatchLogIn: logIn,
};
const connector = connect(mapState, mapDispatch);
type LoginPropsFromRedux = ConnectedProps<typeof connector>;

interface LoginProps extends LoginPropsFromRedux {}

interface LoginState {
    username: string,
    password: string,
    performRedirectToHome: boolean,
}

class LoginScreen extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            performRedirectToHome: false,
        };
    }

    handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        const { username, password } = this.state;
        const { dispatchLogIn } = this.props;

        log.info(`Logging in as ${username}.`);
        const token = await KolomonApi.getUserToken(username, password);

        if (token === null) {
            log.warn("Incorrect credentials.");
            return;
        }

        log.debug("Setting bearer token.");
        setGlobalBearerToken(token);

        log.debug("Checking login status...");
        const loggedIn = await KolomonApi.checkIfProperlyLoggedIn();
        if (!loggedIn) {
            log.error("Got token, but invalid login?!");
            return;
        }

        const loggedInUser = await KolomonApi.getLoggedInUser();

        dispatchLogIn(loggedInUser);
        log.info(`Logged in as ${loggedInUser.username}.`);

        log.info("Redirecting to /home");
        this.setState(
            produce((previousState) => {
                previousState.performRedirectToHome = true;
            }),
        );
    };

    render(): JSX.Element {
        const { username, password, performRedirectToHome } = this.state;
        const { isLoggedIn } = this.props;

        if (performRedirectToHome || isLoggedIn === LoginSliceState.LOGGED_IN) {
            return (
                <Navigate to="/home" />
            );
        }

        return (
            <BaseScreen className="page-login" showHeader={false}>
                <H1 content="Kolomon" className="kolomon-title" />

                <ElevatedContainer className="pt20 pb10 pl30 pr30">
                    <Form className="flex--column">
                        <FormTextInput
                            id="login-page-username"
                            label="Uporabniško ime"
                            value={username}
                            onChange={this.handleUsernameChange}
                        />
                        <FormTextInput
                            id="login-page-password"
                            label="Geslo"
                            value={password}
                            onChange={this.handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            content="Prijava"
                            className="flex-self--align-center mt15 pl25 pr25"
                            onClick={this.handleSubmit}
                        />
                    </Form>
                </ElevatedContainer>
            </BaseScreen>
        );
    }
}

export default connector(LoginScreen);
