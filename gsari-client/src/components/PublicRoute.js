import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		sessionStorage.getItem('user')
			? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
			: <Component {...props} />
	)} />
)