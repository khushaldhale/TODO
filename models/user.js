const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: true
		},
		lname: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		accountType: {
			type: String,
			enum: ["user", "admin"],
			required: true,
			default: "user"
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "TASK"
			}
		]
	}
)


module.exports = mongoose.model("USER", userSchema)