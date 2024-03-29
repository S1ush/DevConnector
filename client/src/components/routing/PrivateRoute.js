import React from "react";
import { Route, Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!isAuthenticated && !loading ? (
				<Redirect to='/login' />
			) : (
				<Component {...props} />
			)
		}
	/>
);
PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStatetoProp = (state) => ({
	auth: state.auth,
});

export default connect(mapStatetoProp, {})(PrivateRoute);
