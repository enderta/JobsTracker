const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const verifyToken = require("../../middlewares/verifyToken");

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/users', verifyToken,userController.getUsers);

router.get('/users/:id',verifyToken, userController.getUserById);

router.put('/users/:id',verifyToken, userController.updateUser);

router.delete('/users/:id', verifyToken,userController.deleteUser);

module.exports = router;

