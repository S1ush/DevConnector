const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   POSt api/user
// @desc    Register
// @access  public
router.post(
	"/",
	[
		check("name", "Please Enter a name ").not().isEmpty(),
		check("email", "Enter a valid email ").isEmail(),
		check("password", "Enter a password of length 6 ").isLength({ min: 6 }),
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() });
		}

		const { name, email, password } = req.body;

		try {
			//  1) if the user already exists
			// User is the json model

			let user = await User.findOne({ email });
			if (user) {
				return res.status(500).send("User already exist");
			}

			// 2) gravatar
			// profile picture associated with the email
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});
			// data object to be saved
			user = new User({
				name,
				email,
				avatar,
				password,
			});

			console.log(user);

			// 3) Encrpt password
			// salt is a pool
			const salt = await bcrypt.genSalt(10);
			// encrption of password
			// We encrpyt after we have passed the value from req and assigned to object which is to be saved
			user.password = await bcrypt.hash(password, salt);
			// save it to database
			await user.save();

			// 4) Return web token
			const payload = {
				user: {
					id: user.id,
				},
			};
			console.log(payload);

			 let token =  jwt.sign(
				payload,
				config.get("jwtSecretkey"),
				{ expiresIn: 36000 });
			res.json({token});
		} catch (err) {
			console.error(err.message);
			return res.status(500).send("Server Error");
		}

		console.log(req.body);
		return res.send("User Registered");
	}
);
module.exports = router;
