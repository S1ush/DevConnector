import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authlinks = (
		<ul>
			<li>
				<Link to='/profiles'>
					<i class='fab fa-dev'></i>
					{"  "}
					<span className='hide-sm'>Developers </span>
				</Link>
			</li>
			<li>
				<Link to='/posts'>
					<i class='far fa-id-badge'></i>
					{"  "}
					<span className='hide-sm'>Posts</span>
				</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user'></i>
					{"  "}
					<span className='hide-sm'>Dashboard </span>
				</Link>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					<i className='fas fa-sign-out-alt'></i>
					{"  "}
					<span className='hide-sm'>Logout </span>
				</a>
			</li>
		</ul>
	);

	const guestlinks = (
		<ul>
			<li>
				<Link to='/profiles'>
					<i class='fab fa-dev'></i>
					{"  "}
					<span className='hide-sm'>Developers </span>
				</Link>
			</li>

			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			{!loading && (
				<Fragment>{isAuthenticated ? authlinks : guestlinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStatetoProp = (state) => ({
	auth: state.auth,
});

export default connect(mapStatetoProp, { logout })(Navbar);
