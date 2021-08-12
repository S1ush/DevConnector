import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import formatDate from "../../utils/formatDate";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../action/post";
import post from "../../reducers/post";
const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
	return (
		<div class='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img class='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p class='my-1'>{text}</p>
				<p className='post-date'>
					Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>

				<button
					type='button'
					onClick={(e) => addLike(_id)}
					class='btn btn-light'
				>
					<i class='fas fa-thumbs-up '></i>
					{"	"}
					{likes == undefined ? (
						<span>{}</span>
					) : (
						<span>{likes.length > 0 && likes.length}</span>
					)}
				</button>
				<button
					type='button'
					onClick={(e) => removeLike(_id)}
					class='btn btn-light'
				>
					<i class='fas fa-thumbs-down'></i>
				</button>
				<Link to={`/post/${_id}`} class='btn btn-primary'>
					Discussion{" "}
					{comments.length > 0 && (
						<span class='comment-count'>{comments.length}</span>
					)}
				</Link>
				{!auth.loading && user === auth.user._id && (
					<button
						type='button'
						onClick={(e) => deletePost(_id)}
						class='btn btn-danger'
					>
						<i class='fas fa-times'></i>
					</button>
				)}
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStatetoProp = (state) => ({
	auth: state.auth,
});

export default connect(mapStatetoProp, { addLike, removeLike, deletePost })(
	PostItem
);
