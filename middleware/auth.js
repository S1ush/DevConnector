const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	// header
	const token = req.header("x-auth-token");
	// check header
	if (!token) {
		return res
			.status(401)
			.json({ msg: "Token not found , Authorization denied" });
	}
	// verify
	try {
		const decoded = jwt.verify(token, config.get("jwtSecretkey"));
		req.user = decoded.user;
        next()
	} catch (err) {
		res.status(401).json({msg:"Token is not valid"})
	}
};
