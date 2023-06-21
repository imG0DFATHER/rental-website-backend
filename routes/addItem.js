import express from "express";
// import { authenticate } from "../middleware/auth.js";
import {
  readItemsByUser,
  createItemDetails,
  updateItemDetails,
  deleteItemDetails,
} from "../controllers/itemDetails.js";

const router = express.Router();

// router.get("/fetchId", authenticate, (req, res) => {
//   console.log("fetching id");
//   res.send(req.userID);
// });

// router.get("/readitem", readItemsByUser);
router.post("/readitem", readItemsByUser);
router.post("/additem", createItemDetails);
router.patch("/additem", updateItemDetails);
router.delete("/additem", deleteItemDetails);

export default router;
