const express = require('express');
const { register, login, logout } = require('../controllers/auth');
const { authentication, isUser } = require('../middlewares/auth');


const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.get("/logout", authentication, isUser, logout);


module.exports = router