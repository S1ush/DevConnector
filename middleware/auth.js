const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (res, req, next) => {
	// header
	const token = req.header("x-auth-header");
	// check header
	if (!token) {
		return res
			.status(401)
			.json({ msg: "Token not found , Authorization denied" });
	}
	// verify
	try {
		const decoded = jwt.verify(token, config.get("jwtSecretkey"));
	} catch (err) {
		res.send(err.message);
	}
};
