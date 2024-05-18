import Listing from '../models/listing.model.js';
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

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(errorHandler(401, 'Please log in'));

  try {
    await User.findByIdAndDelete(req.params.id);

    res
      .clearCookie('access-token')
      .status(200)
      .json({ message: 'Deleted account successfully' });
  } catch (err) {
    next(err);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only view your own listings.'));

  try {
    const listings = await Listing.find({ userRef: req.params.id });

    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};
