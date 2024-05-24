const UserController = require("../../feature/user/controller/controller");
const UserService = require("../../feature/user/service/service");
const UserRepository = require("../../feature/user/repository/repository");

const db = require("../database/mysql")
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const express = require('express');

const router = express.Router();

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService); 

router.post('/register', userController.createUser.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/users', jwtMiddleware, userController.getAllUsers.bind(userController));
router.get('/users/:id', jwtMiddleware, userController.getUserById.bind(userController));
router.put('/users/:id', jwtMiddleware, userController.updateUserById.bind(userController));
router.delete('/users/:id', jwtMiddleware, userController.deleteUserById.bind(userController));
router.patch('/users/:id', jwtMiddleware, userController.updatePassword.bind(userController));

module.exports = router;