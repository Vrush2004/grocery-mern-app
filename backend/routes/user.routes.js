import express from "express";
import {
  checkAuth,
  loginUser,
  logout,
  registerUser,
} from "../controller/user.controller.js";
import authUser from "../middlewares/authUser.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/is-auth", authUser, checkAuth);
userRouter.get("/logout", authUser, logout);

export default userRouter;
