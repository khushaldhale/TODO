const express = require("express")
const app = express();
require("dotenv").config();

require("./schedulers/checkStatus")


app.use(express.json())
const cookies = require("cookie-parser");
app.use(cookies())



app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			messsage: "server is up and running"
		})
})


const dbConnect = require("./config/database");
dbConnect()


const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);

const taskRoutes = require("./models/user");
app.use("/api/v1/task", taskRoutes)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log("app is listening at : ", PORT)
})