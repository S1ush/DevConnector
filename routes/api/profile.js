const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
// @route   GET api/profile/me
// @desc    Get user profile
// @access  private

router.get("/me", auth, async (req, res) => {
	// get user from user.id as per header
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			["name", "gravatar"]
		);

		if (!profile) {
			res.status(400).json({ msg: "No Profile found for this user " });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ msg: "Server Error " });
	}
});

// @route   GET api/profile/CreateProfile
// @desc    Create Profile
// @access  private

router.post(
	"/createprofile",
	[
		auth,
		[
			check("status", "Status is Required").not().isEmpty(),
			check("skills", "Skills is Required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		// res.send(errors);
		if (!errors.isEmpty()) {
			return res.status(500).json({ errors: errors.array() });
		}
		// destructure the request
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook,
		} = req.body;

		// build profilefields
		let profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills)
			profileFields.skills = skills.split(",").map((skills) => skills.trim());
		// console.log(profileFields.skills);
		// build socialfields
		profileFields.social = {};
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (twitter) profileFields.social.twitter = twitter;
		if (youtube) profileFields.social.youtube = youtube;
		if (instagram) profileFields.social.instagram = instagram;
		if (facebook) profileFields.social.facebook = facebook;
		// console.log(profileFields);
		try {
			let profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true, upsert: true }
			);
			// res.json(profile);
			// update
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.body.id },
					{ $set: profileFields },
					{ new: true, upsert: true, setDefaultsOnInsert: true }
				);
				return res.json(profile);
			}
			//  else {
			// 	// Create
			// 	profile = new Profile(profileFields);
			// 	await profile.save();
			// 	return res.json(profile);
			// }
		} catch (err) {
			console.error(err.message);
			return res.status(400).json("Server Error");
		}
	}
);

// @route   GET api/profile
// @desc    get all profiles
// @access  publci

router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", ["name", "avatar"]);
		res.send(profiles);
	} catch (error) {
		console.error(error.message);
		res.status(500).json("Server Error");
	}
});

// @route   GET api/user/:user_id
// @desc    get profile by user id
// @access  publci

router.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate("user", ["name", "avatar"]);
		if (!profile)
			return res.status(400).json({ msg: "There is no profile for this user" });
		res.send(profile);
	} catch (error) {
		console.error(error.message);
		if (error.kind == "ObjectId") {
			return res.status(400).json({ msg: "Profile not found" });
		}
		res.status(500).json("Server Error");
	}
});

module.exports = router;
