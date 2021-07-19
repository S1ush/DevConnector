import axios from "axios";
import {
	REGISTER_SUCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERRORL,
} from "./types";
import { setAlert } from "./alert";

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
