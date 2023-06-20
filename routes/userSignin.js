import express from "express";
import { getUserData } from "../controllers/userData.js";

const router = express.Router();

router.post("/signin", getUserData);

export default router;
