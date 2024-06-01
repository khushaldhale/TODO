const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
	try {
		const { fname, lname, email, password } = req.body;

		if (!fname || !lname || !email || !password) {
			return res.status(404)
				.json({
					success: false,
					message: "please provide all details"
				})
		}

		const isRegistered = await userSchema.findOne({ email });

		if (isRegistered) {
			res.status(404)
				.json({
					success: false,
					message: "you are already registered, kindly login"
				})
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const response = await userSchema.create({ fname, lname, email, password: hashedPassword });

		return res.status(200)
			.json({
				success: true,
				message: "user is registered succesfully"
			})


	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured",
				data: response
			})
	}
}


exports.login = async (req, res) => {
	try {

		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(404)
				.json({
					success: false,
					message: "please provide all details"
				})
		}

		const isRegistered = await userSchema.findOne({ email });

		if (!isRegistered) {
			return res.status(404)
				.json({
					success: false,
					message: "you are not registered, indly register ypurself"
				})
		}

		if (!await bcrypt.compare(password, isRegistered.password)) {
			return res.status(404)
				.json({
					success: false,
					message: "password is incorrect"
				})
		}

		const token = jwt.sign({
			email,
			accountType: isRegistered.accountType,
			_id: isRegistered._id
		},
			process.env.JWT_SECRET,
			{
				expiresIn: "24h"
			})


		return res.cookie("token", token, {
			httpOnly: true,
			expire: "24h"
		})
			.status(200)
			.json({
				success: true,
				message: "user is logged in",
				data: isRegistered
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}



exports.logout = async (req, res) => {
	try {

		return res.cookie("token", null, {
			httpOnly: true,
			expires: new Date(Date.now())
		})
			.status(200)
			.json({
				success: true,
				message: "user is logged out"
			})
	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})

	}
}