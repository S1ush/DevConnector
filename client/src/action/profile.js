import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// GET current user profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
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

			dispatch(
				setAlert(edit ? "Profile updated " : "Profile Created", "success")
			);

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

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.put("/api/profile/experience", formData, config);

		dispatch({
			type: GET_PROFILE,
			paylaod: res.data,
		});

		history.push("/dashboard");
		dispatch(setAlert("Experience Added ", "success"));
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

// add Education
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.put("/api/profile/education", formData, config);

		dispatch({
			type: GET_PROFILE,
			paylaod: res.data,
		});

		history.push("/dashboard");
		dispatch(setAlert("Education Added ", "success"));
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
