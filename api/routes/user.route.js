import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verify-user.js';

const router = express.Router();

router.get('/test', test);
router.post('/userupdate/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);

export default router;
