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

router.get("/readitem", readItemsByUser);
router.post("/additem", createItemDetails);
router.patch("/updateitem", updateItemDetails);
router.delete("/deleteitem", deleteItemDetails);

export default router;
