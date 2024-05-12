import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const signup = async (req, res, next) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
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
