import { errorHandler } from './error-handler.js';
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const token = req.cookies['access-token'];

  if (!token) return next(errorHandler(401, 'User not logged in'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(402, 'Forbidden'));

    req.user = user;

    next();
  });
};
