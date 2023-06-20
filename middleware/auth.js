import jwt from "jsonwebtoken";
import UserDetails from "../models/userSchema.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    // const token = req.headers.authorization.split(" ")[1];

    console.log(token);
    console.log("auth token");
    // debugger;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await UserDetails.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    // console.log(rootUser);

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized:No token provided");
    console.log(error);
  }
};
