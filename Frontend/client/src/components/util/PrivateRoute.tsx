import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isUserLoggedIn} from "../../helpers/utils";


export const PrivateRoute = ({ component: Component, ...rest } : {component: any}) => (
    <Route {...rest} render={props => (
        isUserLoggedIn()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)