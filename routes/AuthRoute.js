import express from "express";
const router = express.Router();

import {
  Login,
  register,
  sendOtp,
  changePassword,
  getUserData,
  createPayment,
  getPayment,
  makePayment,
} from "../controllers/AuthController.js";

router.route("/login").post(Login);
router.route("/register").post(register);
router.route("/reset").post(sendOtp).put(changePassword);
router.route("/getuserdata/:id").post(getUserData);
router.route("/createpayment/:app_id").post(createPayment);
router.route("/getpayment/:app_id/:payment_id").get(getPayment);
router.route("/makepayment/:app_id/:payment_id").post(makePayment);

export default router;
