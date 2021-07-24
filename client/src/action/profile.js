import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// GET current user profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");
		dispatch({
			type: GET_PROFILE,
			paylaod: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Create or update
export const createProfile =
	(formdata, history, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const res = await axios.post(
				"/api/profile/createprofile",
				formdata,
				config
			);

			dispatch({
				type: GET_PROFILE,
				paylaod: res.data,
			});

			dispatch(setAlert(edit ? "Profile updated " : "Profile Created"));

			if (!edit) {
				history.push("/dashboard");
			}
		} catch (err) {
			const errors = err.response.data.errors;
			console.log(errors);
			console.log(err.response);

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}
			dispatch({
				type: PROFILE_ERROR,
				error: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};
