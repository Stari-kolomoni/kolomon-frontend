/**
 * A set of Higher order components that wrap a React Component with an additional
 * prop for React Router navigation, parameters, etc.
 */
import React, { ComponentType, ReactElement } from "react";
import {
    NavigateFunction, Params, useNavigate, useParams,
} from "react-router-dom";

export interface WithNavigationProp {
    navigate: NavigateFunction
}

export const withNavigation = <T extends WithNavigationProp>(
    WrappedComponent: ComponentType<T>,
): (props: T) => ReactElement => (
    props: T,
): ReactElement => <WrappedComponent {...props} navigate={useNavigate()} />;


export interface WithParamsProp {
    params?: Readonly<Params>
}

export const withParams = <T extends WithParamsProp>(
    WrappedComponent: ComponentType<T>,
): (props: T) => ReactElement => (
    props: T,
): ReactElement => <WrappedComponent {...props} params={useParams()} />;
