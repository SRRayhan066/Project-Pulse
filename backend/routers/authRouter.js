const express = require('express');

// internal imports
const { login, register, logout } = require('../controllers/authController');

// middlewares
const { checkLogin, requirePermission } = require('../middlewares/checkLogin');
const { loginValidator, loginValidationHandler } = require('../middlewares/authValidator');

const authRouter = express.Router();

// login route
authRouter.post('/login', loginValidator, loginValidationHandler, login);

// register route
authRouter.post('/register', register);

// logout route
authRouter.delete('/logout', checkLogin, logout);

module.exports = authRouter;
