import React, { ChangeEvent, Component, FormEvent } from "react";
import { Form, FormTextInput } from "../components/form";
import Logger, { Colour } from "../../core/logger";
import KolomonApi from "../../core/api";
import { setGlobalBearerToken } from "../../core/api/requests";
import { Button } from "../components/button";
import { Elevation } from "../components/elevation";
import { H1 } from "../components/text";

const log = new Logger("login", Colour.DARK_PURPLE);

interface LoginProps {}

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

    handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        // TODO perform API login, save token to localStorage

        const { username, password } = this.state;

        log.info(`Logging in as ${username}.`);
        const token = await KolomonApi.getUserToken(username, password);

        if (token === null) {
            // TODO incorrect credentials
            return;
        }

        log.debug("Setting bearer token.");
        setGlobalBearerToken(token);

        log.info(`Logged in as ${username}`);
    };

    render(): JSX.Element {
        const { username, password } = this.state;

        return (
            <div className="login-page">
                <H1 content="Kolomon" className="kolomon-title" />

                <Elevation className="pt20 pb10 pl30 pr30">
                    <Form onSubmit={this.handleSubmit} className="flex--column">
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
                        />
                    </Form>
                </Elevation>
            </div>
        );
    }
}

export default Login;
