import axios from "axios";
import { setAlert } from "./alert";
// import alert from "../reducers/alert";
import {
	ADD_POST,
	DELETE_POST,
	GET_POST,
	GET_SINGLE_POST,
	POST_ERROR,
	UPDATE_LIKES,
} from "./types";

// Get posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/posts");
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// get post page
export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${id}`);
		dispatch({
			type: GET_SINGLE_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// add like
export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${id}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Remove Like
export const removeLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/unlike/${id}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//  delete post
export const deletePost = (id) => async (dispatch) => {
	try {
		// const headers = {
		// 	"access-control-allow-origin": *,
		// };
		console.log("above delete");
		await axios.delete(`/api/posts/${id}`);
		console.log("below delete");
		dispatch({
			type: DELETE_POST,
			payload: id,
		});
		dispatch(setAlert("Post Removed", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add post
export const addPost = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post(`/api/posts`, formData, config);
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});
		dispatch(setAlert("Post Created", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			error: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
