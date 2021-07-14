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

// @route   DELETE api/profile
// @desc    Delete profile,user & post
// @access  private

router.delete("/", auth, async (req, res) => {
	try {
		await Profile.findOneAndRemove({ user: req.user.id });
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: "User Removed" });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// @route   PUT api/profile
// @desc    Add profile experience
// @access  private

router.put(
	"/experience",
	[
		auth,
		check("title", "Title is required").not().isEmpty(),
		check("company", "Company is required").not().isEmpty(),
		check("from", "form is required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = await validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });
		const { title, company, location, from, to, current, description } =
			req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			// we can use push here but it will push the data at the end of the object
			// we use unshift to add data begining to th object
			profile.experience.unshift(newExp);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route   DELETE api/profile
// @desc    remove experience from profile
// @access  private
router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		//  get remove index
		// using map(Iterate) to get id in experience array
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);

		await profile.save();
		res.send(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
});
module.exports = router;

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
	"/education",
	[
		auth,
		[
			check("school", "School is required").not().isEmpty(),
			check("degree", "Degree is required").not().isEmpty(),
			check("fieldofstudy", "Field of study is required").not().isEmpty(),
			check("from", "From date is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldofstudy, from, to, current, description } =
			req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.education.unshift(newEdu);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);
