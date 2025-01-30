import express from "express";

import {
  loginUser,
  paymentStripe,
  registerUser,
  updateUserCredits,
  userCredits,
} from "../controllers/UserController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredits);
userRouter.post("/pay", userAuth, paymentStripe);
userRouter.post("/update-credits", userAuth, updateUserCredits);

export default userRouter;
