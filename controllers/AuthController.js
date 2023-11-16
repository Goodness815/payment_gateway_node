import Auth from "../models/Auth.js";
import bcrypt from "bcryptjs";
import createTokenUser from "../utils/createTokenUser.js";
import { StatusCodes } from "http-status-codes";
import { createJWT } from "../utils/jwt.js";
import { sendEmail } from "../utils/config.js";
import { sendResetMail, sendWithdrawlMail } from "../utils/emailTemplates.js";

function generateRandom6DigitNumber() {
  const min = 100000; // Minimum 6-digit number (100000)
  const max = 999999; // Maximum 6-digit number (999999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePaymentId() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let appId = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    appId += characters.charAt(randomIndex);
  }

  return appId;
}

async function getUserById(userId) {
  // Your logic to fetch user data from MongoDB using userId
  const user = await Auth.findById(userId);
  // Replace this with your actual code to fetch user data
  return user;
}

// function removePasswordsFromArray(arr) {
//   return arr.map((obj) => {
//     const { _id, fullName, email, status, activeCourses } = obj;
//     return {
//       id: _id,
//       fullName,
//       email,
//       accountType: status === 5 ? "admin" : "user",
//       accountStatus: activeCourses.length != 0 ? "active" : "inactive",
//     };
//   });
// }

function filterObject(obj) {
  const { app_id, account_balance, transaction_history, payment_links } = obj;
  return {
    app_id,
    account_balance,
    transaction_history,
    payment_links,
  };
}

function findObjectById(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].payment_id === id) {
      return array[i];
    }
  }

  // Return null if no matching object is found
  return null;
}
function updatePaymentsArray(array, id) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].payment_id != id) {
      arr.push(array[i]);
    }
  }
  return arr;
}
// Controller that handles register functionality
const register = async (req, res) => {
  const { email } = req.body;

  const emailAlreadyExists = await Auth.findOne({ email });
  if (emailAlreadyExists) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Email already exists" });
  }

  const user = await Auth.create(req.body);

  const tokenUser = createTokenUser(user);
  const generatedToken = createJWT({ payload: tokenUser });

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Registered Sucessfully",
    data: { ...tokenUser, token: generatedToken },
  });
};

// controller that handles login function
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.OK).json({
      success: false,
      message: "please provide both email and password",
    });
  }

  const user = await Auth.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Invalid email" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Invalid password" });
  }
  const tokenUser = createTokenUser(user);
  const generatedToken = createJWT({ payload: tokenUser });
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Login Succesful",
    data: { ...tokenUser, token: generatedToken },
  });
};

// controller that handles password change
const changePassword = async (req, res) => {
  const { code, password, password1 } = req.body;

  const findUser = await Auth.findOne({ sms: parseInt(code) });
  if (password !== password1) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Passwords do not match!" });
  }

  if (!findUser) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Link Expired!" });
  }

  if (parseInt(code) !== findUser.sms) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Link Expired!" });
  }

  const salt = await bcrypt.genSalt(10);
  const newPass = await bcrypt.hash(password, salt);

  await Auth.findOneAndUpdate(
    { email: findUser.email },
    { $set: { password: newPass, sms: generateRandom6DigitNumber() } },
    { new: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Password reset successfully!" });
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Invalid input!" });
  }
  const emailAlreadyExists = await Auth.findOne({ email });

  if (!emailAlreadyExists) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Invalid user!" });
  }

  await sendEmail(
    "Reset Password!",
    email,
    sendResetMail(emailAlreadyExists.sms)
  );

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Check mail to proceed!" });
};

// Controller that handles getting user data
const getUserData = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Invalid User Id" });
  }
  const accountExists = await Auth.findOne({ _id: userId });
  if (!accountExists) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Account dose not exist!" });
  }
  const tokenUser = filterObject(accountExists);

  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: tokenUser });
};

const createPayment = async (req, res) => {
  const app_id = req.params.app_id;
  const { paymentTitle, recipientName, recipientEmail, amount } = req.body;
  if (!paymentTitle || !recipientName || !recipientEmail || !amount) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Insufficient parameters" });
  }

  const app = await Auth.findOne({ app_id });
  if (!app) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Invalid app ID!" });
  }
  const paymentId = generatePaymentId();

  const paymentLink = `${process.env.BASE_URL}/payment?app=${app_id}&key=${paymentId}/`;

  const previousPayments = app.payment_links;
  const newPayment = {
    paymentTitle,
    recipientName,
    recipientEmail,
    amount,
    payment_id: paymentId,
    payment_link: paymentLink,
    payment_status: "pending",
    date: new Date().getTime(),
  };

  previousPayments.push(newPayment);

  app.payment_links = previousPayments;

  await app.save();

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Payment Created Successfully",
    data: newPayment,
  });
};

const getPayment = async (req, res) => {
  const { app_id, payment_id } = req.params;
  if (!app_id || !payment_id) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Reached Broken Link! try again." });
  }

  const app = await Auth.findOne({ app_id });

  if (!app) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Reached Broken Link! try again." });
  }

  const payment = findObjectById(app.payment_links, payment_id);

  if (!payment) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Reached Broken Link! try again." });
  }

  return res.status(StatusCodes.CREATED).json({
    success: true,
    data: payment,
  });
};

const makePayment = async (req, res) => {
  const { app_id, payment_id } = req.params;
  const { status } = req.body;

  if (!app_id || !payment_id) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Reached Broken Link! try again." });
  }

  const app = await Auth.findOne({ app_id });

  if (!app) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Reached Broken Link! try again." });
  }

  let payment = findObjectById(app.payment_links, payment_id);

  if (!payment) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: "Reached Broken Link! try again." });
  }

  payment.payment_status =
    status === 1 ? "success" : status === 2 ? "pending" : "failed";

  app.transaction_history.push(payment);

  app.payment_links = updatePaymentsArray(
    app.payment_links,
    payment.payment_id
  );

  if (status === 1) {
    app.account_balance =
      parseInt(app.account_balance) + parseInt(payment.amount);
  }

  await app.save();

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Payment Successfull",
  });
};

export {
  Login,
  register,
  sendOtp,
  changePassword,
  getUserData,
  createPayment,
  getPayment,
  makePayment,
};
