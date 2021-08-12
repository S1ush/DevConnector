import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../action/post";

const Postform = ({ addPost }) => {
	const [text, settext] = useState("");
	return (
		<div class='post-form'>
			<div class='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form
				class='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text });
					settext("");
				}}
			>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Create a post'
					required
					value={text}
					onChange={(e) => settext(e.target.value)}
				></textarea>
				<input type='submit' class='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

Postform.propTypes = {
	addPost: PropTypes.func.isRequired,
};

// const mapStatetoProp = (state) => {
// 	posts: state.posts;
// };

export default connect(null, { addPost })(Postform);
