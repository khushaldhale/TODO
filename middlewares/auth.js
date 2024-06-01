const jwt = require("jsonwebtoken")
require('dotenv').config()


exports.authentication = async (req, res, next) => {
	try {

		const token = req.cookies.token;

		if (!token) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly login first"
				})
		}

		const decode = jwt.verify(token, process.env.JWT_SECRET);

		req.decode = decode;

		if (!decode) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly log in again, token is Invalid"
				})
		}

		next();


	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}

exports.isUser = async (req, res, next) => {
	if (req.decode.accountType !== "user") {
		return res.status(404)
			.json({
				success: false,
				message: "This is a protected route for users only"
			})
	}

	next()
}


exports.isAdmin = async (req, res, next) => {
	if (req.decode.accountType !== "admin") {
		return res.status(404)
			.json({
				success: false,
				message: "This is a protected route for admin only"
			})
	}

	next()
}