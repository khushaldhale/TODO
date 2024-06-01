const mongoose = require("mongoose");



const taskSchema = new mongoose.Schema(
	{
		taskName: {
			type: String,
			required: true
		},
		taskDesc: {
			type: String,
			required: true
		},
		start_time: {
			type: Date,
			required: true
		},
		end_time: {
			type: Date,
			required: true
		},
		status: {
			type: String,
			enum: ["pending", "completed"],
			default: "pending"
		}
	}
)

module.exports = mongoose.model("TASK", taskSchema)