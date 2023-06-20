import express from "express";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/about", authenticate, (req, res) => {
  console.log("about the user");
  console.log(req.rootUser);
  res.send(req.rootUser);
});

export default router;
