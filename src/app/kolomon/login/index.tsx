import React, { Component } from "react";
import { Form, FormTextInput } from "../components/form";

class Login extends Component {
    render(): JSX.Element {
        return (
            <Form>
                <FormTextInput
                    inputId="login-page-username"
                    label="Uporabniško ime"
                />
                <FormTextInput
                    inputId="login-page-password"
                    label="Geslo"
                />
            </Form>
        );
    }
}

export default Login;
