const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// @route  GET api/auth
// @desc   Test route
// @access public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.log(err.message);
	}
});

// @route   POST api/Auth
// @desc    Authenticate user & generate token
// @access  public
router.post(
	"/",
	[
		check("email", "Enter a valid email ").isEmail(),
		check("password", "Password Required ").exists(),
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() });
		}

		const { email, password } = req.body;
		console.log(req.body);

		try {
			//  1) if the user exists

			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ errors: { msg: "Invalid Credentials" } });
			}

			// 2) check password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: { msg: "Invalid Credentials" } });
			}

			// 4) Return web token
			const payload = {
				user: {
					id: user.id,
				},
			};
			// console.log(payload);

			let token = jwt.sign(payload, config.get("jwtSecretkey"), {
				expiresIn: 36000,
			});
			res.json({ token });
		} catch (err) {
			console.error(err.message);
			return res.status(500).send("Server Error");
		}

		console.log(req.body);
	}
);

module.exports = router;
