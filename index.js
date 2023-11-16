import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
// database
import connectDB from "./db/connect.js";
import fileUpload from "express-fileupload";
// // product router
import AuthRouter from "./routes/AuthRoute.js";

import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json({ limit: "30mb" }));
app.use(cors());
// Enable file upload middleware
app.use(fileUpload());

app.use("/api/v1/auth", AuthRouter);

app.get("/", (req, res) => {
  res.send("paymentgateway backend");
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
