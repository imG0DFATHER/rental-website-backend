import express from "express";

const router = express.Router();

router.get("/logout", (req, res) => {
  console.log("Logging Out");
  res.clearCookie("jwt_token", { path: "/" });
  res.status(200).send("User Logout");
});

export default router;
