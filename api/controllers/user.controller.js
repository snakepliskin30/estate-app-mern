import User from '../models/user.model.js';
import { errorHandler } from '../utils/error-handler.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'Hello World!!',
  });
};

export const updateUser = async (req, res, next) => {
  // check if parameter matches the token id
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (req.params.id !== req.user.id)
    return next(errorHandler(401, 'Please log in'));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true },
    );

    const { password, ...restOfUserObj } = updatedUser._doc;
    res.status(200).json(restOfUserObj);
  } catch (err) {
    next(err);
  }
};
