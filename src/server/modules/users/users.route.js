const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const verifyToken = require("../../middlewares/verifyToken");
const cors = require("cors");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/', verifyToken,userController.getUsers);

router.get('/:id',verifyToken, userController.getUserById);

router.put('/:id',verifyToken, userController.updateUser);

router.delete('/:id', verifyToken,userController.deleteUser);

module.exports = router;

