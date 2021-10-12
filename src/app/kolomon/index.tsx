import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login";
import Home from "./home";

const NotFoundPage = () => (
    <span>
        404 Page not found.
    </span>
);

class KolomonApp extends Component {
    render(): JSX.Element {
        return (
            <Switch>
                {/* The /login path is the only one that doesn't require authentication at the moment */}
                <Route path="/login">
                    <Login />
                </Route>
                {/* All other paths should redirect to /login if the user is not logged in */}
                <Route path="*">
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>

                        {/*
                          * Kolomon currently doesn't have a "landing" page, but instead redirects
                          * the user to the login page if not logged in, or to the home page if already logged in
                          */}
                        <Route path="/">
                            <Redirect to="/home" />
                        </Route>

                        {/* When no path matches, show the 404 Not Found page */}
                        <Route path="*">
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </Route>
            </Switch>
        );
    }
}

export default KolomonApp;
