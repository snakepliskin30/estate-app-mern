import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verify-user.js';

const router = express.Router();

router.get('/test', test);
router.post('/userupdate/:id', verifyUser, updateUser);

export default router;
