import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
  getUserListings,
  getUserData,
} from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verify-user.js';

const router = express.Router();

router.get('/test', test);
router.post('/userupdate/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);
router.get('/listings/:id', verifyUser, getUserListings);
router.get('/:id', verifyUser, getUserData);

export default router;
