import express from "express";
import UserDetails from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

export const getUserData = async (req, res) => {
  // const { email, password } = req.body;
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in the data" });
    }

    const userCheck = await UserDetails.findOne({ email: email });

    // console.log(userCheck);

    if (userCheck) {
      const isCorrect = await bcrypt.compare(password, userCheck.password);

      const token = await userCheck.generateAuthToken();
      //   console.log(token);
      res.cookie("jwt_token", token, {
        expires: new Date(Date.now() + 2592000),
        httpOnly: true,
        secure: false,
      });

      //here or after password matching, and why can't we use localstorage for storing tokens

      if (!isCorrect) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({
          message: "User Signed In Successfully",
          //   jwt_Token: token,
          ok: true,
        });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }

    // if (userCheck) {
    //     if (password != userCheck.password) res.send('Invalid Credentials');
    //     // else res.status(200).json({ message: 'Authentication Successful' }); galat
    //     else res.send('Auth Successful');
    // }
    // else {
    //     res.send('Invalid Credentials');
    // }

    // res.status(200).json(userCheck);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
