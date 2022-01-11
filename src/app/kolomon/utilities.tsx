import React, { ComponentType, ReactElement } from "react";
import {
    NavigateFunction, Params, useNavigate, useParams,
} from "react-router-dom";

interface WithNavigationProp {
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
