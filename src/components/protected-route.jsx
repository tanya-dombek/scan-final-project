import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/utils';

const ProtectedRouteElement = ({onlyUnAuth = false, component}) => {

    if (onlyUnAuth && getUser()) {
        return <Navigate to="/"/>
    }

    if (!onlyUnAuth && !getUser()) {
        return <Navigate to="/login"  replace/>;
    }

    return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = (props) => <ProtectedRouteElement onlyUnAuth={true} {...props}/>;