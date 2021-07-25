import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../action/profile";
import { Link } from "react-router-dom";
import Experience from "./Experience";
import DashboardAction from "./DashboardAction";
import Education from "./Education";

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className=' large text-primary'> Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'>Welcome {user && user.name}</i>
			</p>
			{profile !== undefined ? (
				<Fragment>
					{console.log(profile)}
					<DashboardAction />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
				</Fragment>
			) : (
				<Fragment>
					<p> You have not yet setup a profile , Please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStatetoProp = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStatetoProp, { getCurrentProfile })(Dashboard);
