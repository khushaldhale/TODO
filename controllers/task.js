const taskSchema = require("../models/task");
const userSchema = require("../models/user");


exports.createTask = async (req, res) => {
	try {


		const { taskName, taskDesc, start_time, end_time } = req.body;

		if (!taskName || !taskDesc || !start_time || end_time) {
			return res.status(404)
				.json({
					success: false,
					message: "please provide all details"
				})
		}

		const is_existing = await taskSchema.findOne({ taskName, start_time });

		if (is_existing) {
			return res.status(404)
				.json({
					success: false,
					message: "you have another task assigned at that time"
				})
		}

		const response1 = await taskSchema.create({ taskName, taskDesc, start_time, end_time, })
		const response2 = await userSchema.findByIdAndUpdate({ _id: req.decode._id }, { $push: { tasks: response1._id } }, { new: true }).populate("tasks")

		return res.status(200)
			.json({
				success: true,
				message: "Task is created succesfully",
				data: response2
			})

	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "internal error occured"
			})
	}
}


exports.updatetask = async (req, res) => {
	try {

		const task_id = req.params.id;

		const { taskName, taskDesc, start_time, end_time } = req.body;

		if (!task_id) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide an ID"
				})
		}

		if (!taskName || !taskDesc || !start_time || end_time) {
			return res.status(404)
				.json({
					success: false,
					message: "please provide all details"
				})
		}

		const response = await taskSchema.findByIdAndUpdate({ _id: task_id }, { taskName, taskDesc, start_time, end_time }, { new: true })

		return res.status(200)
			.json({
				success: true,
				message: "Task is updated succesfully",
				data: response
			})



	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "internal error occured"
			})

	}
}



exports.deleteTask = async (req, res) => {
	try {
		const task_id = req.params.id;

		if (!task_id) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide an ID"
				})
		}

		const response1 = await taskSchema.findByIdAndDelete({ _id: task_id });

		const response2 = await userSchema.findByIdAndUpdate({ _id: req.decode._id }, { $pull: { tasks: task_id } }, { new: true }).populate("tasks")

		return res.status(200)
			.json({
				success: true,
				message: "Task is deleted succesfully",
				data: response2
			})

	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "internal error occured"
			})

	}
}



exports.markCompleted = async (req, res) => {
	try {
		const task_id = req.params.id;

		if (!task_id) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide an ID"
				})
		}

		const response = await taskSchema.findByIdAndUpdate({ _id: task_id }, { status: "completed" }, { new: true });

		return res.status(200)
			.json({
				success: true,
				message: "Task is marked as complete",
				data: response
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "internal error occured"
			})

	}
}