import React, { FunctionComponent, ReactNode } from "react";
import {
 useNavigate, useParams, NavigateFunction, Params,
} from "react-router-dom";

interface WithNavigationProp {
    navigate: NavigateFunction
}

export const withNavigation = (
    WrappedComponent: FunctionComponent<WithNavigationProp>,
) => (
    props: Map<string, never>,
): ReactNode => <WrappedComponent {...props} navigate={useNavigate()} />;


interface WithParamsProp {
    params: Readonly<Params>
}

export const withParams = (
    WrappedComponent: FunctionComponent<WithParamsProp>,
) => (
    props: Map<string, never>,
): ReactNode => <WrappedComponent {...props} params={useParams()} />;
