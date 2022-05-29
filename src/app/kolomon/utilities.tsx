/**
 * A set of Higher order components that wrap a React Component with an additional
 * prop for React Router navigation, parameters, etc.
 */

import React, { ComponentType, FunctionComponent, ReactElement } from "react";
import {
    NavigateFunction, Params, useNavigate, useParams,
} from "react-router-dom";

export interface WithNavigationProp {
    navigate: NavigateFunction
}

/**
 * Wrap a component in the react-router-dom's useNavigate hook, passing the new navigation prop as "navigate".
 *
 * @param ComponentToWrap Component to wrap with navigation prop.
 */
export const withNavigation = <T extends WithNavigationProp>(
    ComponentToWrap: ComponentType<T>,
): FunctionComponent<Omit<T, keyof WithNavigationProp>> => {
    return (
        props: Omit<T, keyof WithNavigationProp>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ): ReactElement => <ComponentToWrap {...props} navigate={useNavigate()} />;
};


export interface WithParamsProp {
    params: Readonly<Params>
}

/**
 * Wrap a component in the react-router-com's useParams hook, passing the new params prop as "params".
 *
 * @param ComponentToWrap Component to wrap with params prop.
 */
export const withParams = <T extends WithParamsProp>(
    ComponentToWrap: ComponentType<T>,
): FunctionComponent<Omit<T, keyof WithParamsProp>> => {
    return (
        props: Omit<T, keyof WithParamsProp>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ): ReactElement => <ComponentToWrap {...props} params={useParams()} />;
};

