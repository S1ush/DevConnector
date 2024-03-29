import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../action/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setformData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setformData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		login({ email, password });
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Login In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Login Into Your Account
			</p>
			<form
				className='form'
				action='create-profile.html'
				onSubmit={(e) => onSubmit(e)}
			>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>

				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Dont have an account? <Link to='/register'> Register </Link>
			</p>
		</Fragment>
	);
};
Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStatetoProp = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProp, { login })(Login);
