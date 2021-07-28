import axios from "axios";
import { setAlert } from "./alert";
import {
	CLEAR_PROFILE,
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	ACCOUNT_DELETED,
	GET_REPOS,
} from "./types";

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

// Get all profiles
export const getProfiles = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	try {
		const res = await axios.get("/api/profile");
		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Get all profile by ID
export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);
		console.log("look");
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

// Get github repos
export const getGithubRepos = (username) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`);
		dispatch({
			type: GET_REPOS,
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
			history.push("/dashboard");
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
		// console.log(errors);
		// console.log(err.response);

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}
		dispatch({
			type: PROFILE_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Experience
export const deleteExperience = (id, history) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Experience Deleted "));
		history.push("/dashboard");
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Education Deleted "));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Account And Profile
export const deleteAccount = () => async (dispatch) => {
	if (window.confirm("Are you Sure ? This can NOT be Undone!!")) {
		try {
			const res = await axios.delete(`/api/profile`);

			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });

			dispatch(setAlert("Your Account has been permanantly Deleted "));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				error: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};
