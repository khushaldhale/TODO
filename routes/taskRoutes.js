const express = require("express");
const { authentication, isUser } = require("../middlewares/auth");
const { createTask, updatetask, deleteTask, markCompleted } = require("../controllers/task");


const router = express.Router();


router.post("/", authentication, isUser, createTask);
router.put("/:id", authentication, isUser, updatetask);
router.delete("/:id", authentication, isUser, deleteTask);
router.put("/:id/complete", authentication, isUser, markCompleted);


module.exports = router;