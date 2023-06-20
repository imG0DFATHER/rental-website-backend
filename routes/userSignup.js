import express from 'express';
import { createUserDetails } from '../controllers/userDetails.js';
// import { getUserDetails, createUserDetails } from '../controllers/userDetails.js';

const router = express.Router();

// router.get('/', getUserDetails);
router.post('/signup', createUserDetails);

export default router;