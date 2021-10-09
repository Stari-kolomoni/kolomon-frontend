import React from "react";
import ReactDOM from "react-dom";

import Logger, { Colour } from "./core/logger";
import KolomonApp from "./kolomon";

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

ReactDOM.render(<KolomonApp />, document.getElementById("root"));
