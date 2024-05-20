import express from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getAllListing,
} from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verify-user.js';

const router = express.Router();

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.post('/update/:id', verifyUser, updateListing);
router.get('/get/:id', getListing);
router.get('/search', getAllListing);

export default router;
