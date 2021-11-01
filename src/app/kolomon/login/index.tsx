import React, { ChangeEvent, Component, MouseEvent } from "react";

import { connect } from "react-redux";
import Logger, { Colour } from "../../core/logger";
import KolomonApi from "../../core/api";
import { setGlobalBearerToken } from "../../core/api/requests";

import { Button } from "../components/button";
import { Form, FormTextInput } from "../components/form";
import { Elevation } from "../components/elevation";
import { H1 } from "../components/text";
import { AppDispatch } from "../../store";
import { useAppDispatch } from "../../hooks";
import { logIn } from "./loginSlice";

const log = new Logger("login", Colour.DARK_PURPLE);

interface LoginProps {
    dispatch: AppDispatch,
}

interface LoginState {
    username: string,
    password: string,
}

class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
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
        const { dispatch } = this.props;

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

        dispatch(logIn({ username }));
        log.info(`Logged in as ${username}.`);
    };

    render(): JSX.Element {
        const { username, password } = this.state;

        return (
            <div className="login-page">
                <H1 content="Kolomon" className="kolomon-title" />

                <Elevation className="pt20 pb10 pl30 pr30">
                    <Form className="flex--column">
                        <FormTextInput
                            inputId="login-page-username"
                            label="Uporabniško ime"
                            value={username}
                            onChange={this.handleUsernameChange}
                        />
                        <FormTextInput
                            inputId="login-page-password"
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
                </Elevation>
            </div>
        );
    }
}

export default connect()(Login);
