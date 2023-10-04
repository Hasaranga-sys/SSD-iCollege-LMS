const express = require('express');
const userRouter = express.Router();
const UserContoller = require('../Controller/UserController');
const rateLimit = require('express-rate-limit');

// Define rate limiting for the login route
const loginLimiter = rateLimit({
    windowMs: 15 * 1000, // 15 sec
    max: 3, // 3 requests per 15 sec
    message: "Too many login attempts. Please try again later.",
  });

  
  
  // Apply the rate limiter to the login route
userRouter.post("/login", loginLimiter, UserContoller.login);

userRouter.get("/", UserContoller.getAllusers);
userRouter.post("/", UserContoller.addUser);
userRouter.get("/:id", UserContoller.getUserById);
userRouter.put("/:id",UserContoller.updateUser);
userRouter.delete("/:id", UserContoller.deleteUserById);
// userRouter.post("/login", UserContoller.login);

module.exports=userRouter;