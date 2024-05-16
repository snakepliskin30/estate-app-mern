import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error-handler.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { username, email, password } = req.body;
  console.log(username, email, password);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { email, password } = req.body;

  try {
    // query db for the email, result is the whole user object (and then some additional)
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // compare passwords
    const passwordMatch = bcryptjs.compareSync(password, validUser.password);
    if (!passwordMatch) {
      return next(errorHandler(401, 'Invalid credentials'));
    }

    const { password: pass, ...restOfUserObject } = validUser._doc;

    const token = jwt.sign(
      { id: restOfUserObject._id },
      process.env.JWT_SECRET,
    );

    res
      .cookie('access-token', token, { httpOnly: true })
      .status(200)
      .json(restOfUserObject);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    let userObject;
    const { username, email, photoUrl } = req.body;
    console.log(username, email, photoUrl);

    // check if email exist already
    const validUser = await User.findOne({ email });
    console.log('validUser', validUser);

    if (!validUser) {
      const password =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = new User({
        username:
          username.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password,
        avatar: photoUrl,
      });
      const newUserObject = await newUser.save();
      const { password: pass, ...rest } = newUserObject._doc;
      userObject = rest;
    } else {
      const { password, ...rest } = validUser._doc;
      userObject = rest;
    }

    console.log('user_object', userObject);

    const token = jwt.sign({ id: userObject._id }, process.env.JWT_SECRET);
    res.cookie('access-token', token).status(200).json(userObject);
  } catch (err) {
    next(err);
  }
};

export const signout = (req, res, next) => {
  res
    .clearCookie('access-token')
    .status(200)
    .json({ message: 'User signed out successfully' });
};
