// app.js

// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

// internal imports
const { errorHandler } = require('./middlewares/errorHandler');
const { checkLogin, requirePermission } = require('./middlewares/checkLogin');
const { loginValidator, loginValidationHandler } = require('./middlewares/authValidator');

// app initialization
const app = express();
const authRouter = require('./routers/authRouter');
const projectRouter = require('./routers/projectRouter');
const taskRouter = require('./routers/taskRouter');
const commentRouter = require('./routers/commentRouter');
const profileRouter = require('./routers/profileRouter');

// dotenv configuration
dotenv.config();

mongoose.connect('mongodb://localhost/ProjectPulse')
.then(() => {
    console.log('database connected. You are ready to work.');
}).catch((error) => {
    console.log('error: ', error);
});

// request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('top_secret_code'));

// set static folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("https://localhost:")
    ) {
      callback(null, true); // Allow requests from any localhost origin
    } else {
      callback(new Error("Not allowed by CORS")); // Block requests that don't match
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

// routes
app.use('/auth', authRouter);
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter);
app.use('/comments', commentRouter);
app.use('/profile', profileRouter);


// error handler
app.use(errorHandler);
app.options('*', cors());

// listen to the port
app.listen(5000, () => {
  console.log(`Backend server is running on port 5000`);
  console.log('Frontend: http://localhost:5173/');
  console.log('wait for database connection...');
});