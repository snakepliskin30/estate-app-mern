import express from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  searchListing,
} from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verify-user.js';

const router = express.Router();

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.post('/update/:id', verifyUser, updateListing);
router.get('/get/:id', getListing);
router.get('/search', searchListing);

export default router;
