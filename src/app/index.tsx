import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "../scss/main.scss";

import { BrowserRouter } from "react-router-dom";
import Logger, { Colour } from "./core/logger";

import { store } from "./store";
import KolomonApp from "./kolomon";

// DEBUGONLY Developer access to the programmatic API
if (!IS_PRODUCTION) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import KolomonApi from "./core/api";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.kolomon = KolomonApi;
}

const log = new Logger("index", Colour.BDAZZLED_BLUE);

/*
 * DEBUGONLY
 * Demonstrate the available console colours.
 */
if (!IS_PRODUCTION) {
    log.groupCollapsed("Console Colours");
    Object.entries(Colour).forEach(([key, value]) => {
        new Logger(key, value).debug(`colour: ${key}`);
    });
    log.groupEnd();
}

const RootApp = () => (
    <Provider store={store}>
        <BrowserRouter>
            <KolomonApp />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    <RootApp />,
    document.getElementById("root"),
);
