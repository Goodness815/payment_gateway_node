import mongoose from "mongoose";
import bcrypt from "bcryptjs";

function generateRandom6DigitNumber() {
  const min = 100000; // Minimum 6-digit number (100000)
  const max = 999999; // Maximum 6-digit number (999999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAppId() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let appId = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    appId += characters.charAt(randomIndex);
  }

  return appId;
}

const AuthSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    set: (email) => email.toLowerCase(),
  },
  password: {
    type: String,
    required: true,
  },
  app_id: {
    type: String,
    required: false,
    default: generateAppId(),
  },
  sms: {
    type: Number,
    required: false,
    default: generateRandom6DigitNumber(),
  },
  regDate: {
    type: String,
    required: false,
    default: new Date().getTime(),
  },
  account_balance: {
    type: Number,
    required: false,
    default: 0,
  },
  payment_links: {
    type: Array,
    required: false,
    default: [],
  },
  transaction_history: {
    type: Array,
    required: false,
    default: [],
  },
});

AuthSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AuthSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Auth", AuthSchema);
