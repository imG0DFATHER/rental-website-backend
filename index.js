import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cookies from "cookie-parser";
const app = express();
dotenv.config();

//Importing Routes

import postSignup from "./routes/userSignup.js";
import postSignin from "./routes/userSignin.js";
import getAbout from "./routes/userAuth.js";
import addItem from "./routes/addItem.js";
import logout from "./routes/userSignout.js";

//Connecting to Database

const DB = process.env.DATABASE;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.log(`${error} did not connect`));

const PORT = process.env.PORT || 7000;

//Middleware

app.use(cookies());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Routes Middleware

app.use("/", postSignup);
app.use("/", postSignin);
app.use("/", getAbout);
app.use("/", addItem);
app.use("/", logout);

app.get("/", (req, res) => {
  res.send("Hello World! yoyoyo");
});

app.get("/test", (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  console.log(jwt_token);
  res.send("token testing");
  res.json({ jwt_token });
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
