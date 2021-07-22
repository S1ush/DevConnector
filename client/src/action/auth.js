import axios from "axios";
import {
	REGISTER_SUCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERRORL,
	LOGIN_SUCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuth";

// load user
export const loaduser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("/api/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});

		// dispatch(loaduser);
	} catch (error) {
		dispatch({
			type: AUTH_ERRORL,
		});
	}
};

// register user
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ name, email, password });

		try {
			const res = await axios.post("/api/user", body, config);

			dispatch({
				type: REGISTER_SUCESS,
				payload: res.data,
			});
			dispatch(loaduser());
		} catch (err) {
			const errors = err.response.data.error;

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

// login User
export const login =
	({ email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ email, password });

		try {
			const res = await axios.post("/api/auth", body, config);

			dispatch({
				type: LOGIN_SUCESS,
				payload: res.data,
			});

			dispatch(loaduser());
		} catch (err) {
			const errors = err.response.data.errors;
			console.log(errors);

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({
				type: LOGIN_FAIL,
			});
		}
	};

// logout /Clear Profile

export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};
