// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/User");

// login controller
// user login
const login = async (req, res, next) => {
    // console.log("hello")
    try {
      // check if user exists
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        const isValidPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (isValidPassword) {
          const userObject = {
            name: user.name,
            email: user.email,
            role: user.role,
          };

          // generate token
          const token = jwt.sign(userObject, 'top_secret_code', {
            expiresIn: "72h",
          });

          // set cookie
          res.cookie('project_pulse', token, {
            maxAge: 72 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            signed: true,
          });

          // send response
          res.status(200).json({
            message: "Login successful.",
            user: userObject,
          });
        } else {
          next(createError(400, "Invalid credentials."));
        }
      } else {
        next(createError(404, "User not found."));
      }
    } catch (error) {
      next(createError(500, "Internal server error."));
    }
  };

// create new user
const register = async (req, res, next) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });

      //console.log(newUser); //!

      await newUser.save();

      res.status(201).json({
        message: "User created successfully.",
      });
    } catch (error) {
      next(createError(500, "Internal server error.."));
    }
  };

  // logout
  const logout = (req, res) => {
    res.clearCookie('project_pulse');

    res.status(200).json({
      message: "Logout successful.",
    });
  };

  module.exports = {
    login,
    register,
    logout,
  };