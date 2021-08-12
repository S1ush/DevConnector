import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../action/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import post from "../../reducers/post";
import Postform from "./Postform";

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'> Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome to the Community
			</p>
			<Postform />

			<div className='posts'>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
	post: state.post,
});

export default connect(mapStatetoProps, { getPosts })(Posts);
