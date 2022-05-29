import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import Logger, { Colour } from "./core/logger";

import { store } from "./store";
import KolomonApp from "./kolomon";

import "../scss/main.scss";

/*
 * DEBUGONLY Developer access to the programmatic API
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import KolomonApi from "./core/api";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.kolomon = KolomonApi;
/*
 * END of developer stuff.
 */

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

const rootElement = document.getElementById("root");
if (rootElement === null) {
    throw new Error("Couldn't find root element.");
}

const root = createRoot(rootElement);

root.render(<RootApp />);
