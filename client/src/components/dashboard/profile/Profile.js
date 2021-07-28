import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { getProfileById } from "../../../action/profile";

const Profile = ({
	getProfileById,
	profile: { profile, loading },
	auth,
	match,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);
	return (
		<Fragment>
			{profile == null && profile == undefined && loading == false ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back to Developers
					</Link>

					{auth.isAuthenticated &&
						auth.loading === false &&
						profile !== undefined &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								{" "}
								Edit profile
							</Link>
						)}
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStatetoProps, { getProfileById })(Profile);
